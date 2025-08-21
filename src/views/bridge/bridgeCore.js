import { parseGwei, parseUnits, encodeFunctionData } from 'viem'
import { ElMessage } from 'element-plus'
import { readContract, estimateFeesPerGas, estimateGas, writeContract, waitForTransactionReceipt } from '@wagmi/core'
import { config } from '../../wagmi.ts'
import erc20ABI from "@/assets/abi/erc20ABI"
import bridge from "@/assets/abi/bridgeABI"
const bridgeABI = bridge.abi

// 手动定义 maxUint256
const maxUint256 = BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

/**
 * 安全的 BigInt 转换函数
 */
function safeBigInt(value) {
  if (typeof value === 'bigint') return value
  if (typeof value === 'string' || typeof value === 'number') {
    try {
      return BigInt(value)
    } catch (error) {
      throw new Error(`Invalid amount format: ${value}`)
    }
  }
  throw new Error(`Unsupported amount type: ${typeof value}`)
}

/**
 * 检查是否为用户拒绝错误
 */
function isUserRejectedError(error) {
  return (
    error.info?.error?.code === 4001 ||
    error.code === 4001 ||
    error.message?.includes('User rejected') ||
    error.message?.includes('user rejected') ||
    error.message?.includes('User denied') ||
    error.message?.includes('cancelled')
  )
}

/**
 * 精确的 gas 预估函数
 */
export async function computedGas(abi, functionName, args, to, account, value = undefined) {
  try {
    const feesPerGas = await estimateFeesPerGas(config)
    const gas = await estimateGas(config, {
      data: encodeFunctionData({
        abi,
        functionName,
        args,
      }),
      to: to,
      account: account,
      maxFeePerGas: feesPerGas.maxFeePerGas,
      maxPriorityFeePerGas: feesPerGas.maxPriorityFeePerGas,
      ...(value && { value })
    })

    return {
      gas,
      maxFeePerGas: feesPerGas.maxFeePerGas,
      maxPriorityFeePerGas: feesPerGas.maxPriorityFeePerGas
    }
  } catch (error) {
    console.error('Gas estimation failed:', error)
    return {
      gas: BigInt(2000000),
      maxFeePerGas: parseGwei('20'),
      maxPriorityFeePerGas: parseGwei('2')
    }
  }
}

/**
 * 检查 ERC20 代币授权额度
 */
export async function checkAllowance(tokenAddress, ownerAddress, spenderAddress) {
  try {
    const allowanceResult = await readContract(config, {
      address: tokenAddress,
      abi: erc20ABI,
      functionName: 'allowance',
      args: [ownerAddress, spenderAddress]
    })
    
    return BigInt(allowanceResult || 0)
  } catch (error) {
    console.error('Failed to check allowance:', error)
    return BigInt(0)
  }
}

/**
 * 执行 ERC20 代币授权
 */
export async function approveToken({
  tokenAddress,
  spenderAddress,
  amount,
  userAddress,
  useExactApproval = true
}) {
  try {
    const amountBigInt = safeBigInt(amount)
    const approvalAmount = useExactApproval ? amountBigInt : maxUint256
    
    console.log('📝 Submitting approval for:', approvalAmount.toString())
    
    const gasEstimate = await computedGas(
      erc20ABI,
      'approve',
      [spenderAddress, approvalAmount],
      tokenAddress,
      userAddress
    )
    
    const hash = await writeContract(config, {
      abi: erc20ABI,
      address: tokenAddress,
      functionName: 'approve',
      args: [spenderAddress, approvalAmount],
      gas: gasEstimate.gas,
      maxFeePerGas: gasEstimate.maxFeePerGas,
      maxPriorityFeePerGas: gasEstimate.maxPriorityFeePerGas
    })
    
    console.log('✅ Approval submitted:', hash)
    
    const receipt = await waitForTransactionReceipt(config, {
      hash: hash
    })
    
    if (receipt.status === 'reverted') {
      throw new Error('Approve failed.')
    }
    
    ElMessage({
      message: 'Approval confirmed successfully!',
      type: 'success',
      duration: 3000,
      showClose: true
    })
    
    return hash
  } catch (error) {
    console.error('❌ Approval error:', error)
    
    if (isUserRejectedError(error)) {
      throw new Error('User cancelled the authorization operation')
    }
    throw new Error('Failed to approve token: ' + (error.message || error))
  }
}

/**
 * 优化的 ETH 桥接函数
 */
export async function bridgeEthOptimized({
  amount,
  userAddress,
  bridgeContractAddress,
  fromChainId,
  targetChainId,
  destTokenAddress,
  setTxHash
}) {
  try {
    const amountBigInt = safeBigInt(amount)
    
    console.log('🌉 Starting ETH bridge:', {
      amount: amountBigInt.toString(),
      fromChainId,
      targetChainId,
      destTokenAddress,
      userAddress
    })
    
    const gasEstimate = await computedGas(
      bridgeABI,
      'BridgeInitiateETH',
      [fromChainId, targetChainId, destTokenAddress, userAddress],
      bridgeContractAddress,
      userAddress,
      amountBigInt
    )
    
    const hash = await writeContract(config, {
      abi: bridgeABI,
      address: bridgeContractAddress,
      functionName: 'BridgeInitiateETH',
      args: [fromChainId, targetChainId, destTokenAddress, userAddress],
      value: amountBigInt,
      gas: gasEstimate.gas,
      maxFeePerGas: gasEstimate.maxFeePerGas,
      maxPriorityFeePerGas: gasEstimate.maxPriorityFeePerGas
    })
    
    setTxHash && setTxHash(hash)
    console.log('✅ ETH bridge submitted:', hash)
    
    const receipt = await waitForTransactionReceipt(config, {
      hash: hash
    })
    
    if (receipt.status === 'success') {
      ElMessage({
        message: 'Bridge Transaction Succeeded.',
        type: 'success',
        duration: 3000,
        showClose: true
      })
      
      return {
        success: true,
        txHash: hash,
        receipt: receipt,
        message: 'Bridge Transaction Succeeded.'
      }
    } else {
      throw new Error('Bridge failed')
    }
    
  } catch (error) {
    console.error('❌ ETH bridge error:', error)
    
    if (isUserRejectedError(error)) {
      ElMessage({
        message: 'User rejected the request.',
        type: 'warning',
        duration: 2000,
        showClose: true
      })
      throw new Error('User rejected the request.')
    }
    
    ElMessage({
      message: 'Bridge failed',
      type: 'error',
      duration: 2000,
      showClose: true
    })
    
    throw error
  }
}

/**
 * 优化的 ERC20 桥接函数
 */
export async function bridgeErc20Optimized({
  tokenAddress,
  destTokenAddress,
  amount,
  userAddress,
  bridgeContractAddress,
  fromChainId,
  targetChainId,
  tokenName,
  setTxHash,
  setApprovalHash
}) {
  try {
    const amountBigInt = safeBigInt(amount)
    
    console.log('🌉 Starting ERC20 bridge:', {
      tokenAddress,
      destTokenAddress,
      amount: amountBigInt.toString(),
      fromChainId,
      targetChainId,
      tokenName,
      userAddress
    })
    
    // 1. 检查授权
    console.log('🔍 Checking allowance...')
    const allowance = await checkAllowance(tokenAddress, userAddress, bridgeContractAddress)
    
    console.log('💰 Allowance check:', {
      current: allowance.toString(),
      required: amountBigInt.toString(),
      needsApproval: allowance < amountBigInt
    })
    
    // 2. 如果需要授权
    if (allowance < amountBigInt) {
      const approvalHash = await approveToken({
        tokenAddress,
        spenderAddress: bridgeContractAddress,
        amount: amountBigInt,
        userAddress,
        useExactApproval: true
      })
      
      setApprovalHash && setApprovalHash(approvalHash)
    }
    
    // 3. 执行桥接交易
    console.log('🌉 Submitting bridge transaction...')
    
    const args = [
      fromChainId,
      targetChainId,
      userAddress,
      tokenAddress,
      destTokenAddress || tokenAddress,
      amountBigInt
    ]
    
    const gasEstimate = await computedGas(
      bridgeABI,
      'BridgeInitiateERC20',
      args,
      bridgeContractAddress,
      userAddress
    )
    
    const hash = await writeContract(config, {
      abi: bridgeABI,
      address: bridgeContractAddress,
      functionName: 'BridgeInitiateERC20',
      args: args,
      gas: gasEstimate.gas,
      maxFeePerGas: gasEstimate.maxFeePerGas,
      maxPriorityFeePerGas: gasEstimate.maxPriorityFeePerGas
    })
    
    setTxHash && setTxHash(hash)
    console.log('✅ ERC20 bridge submitted:', hash)
    
    const receipt = await waitForTransactionReceipt(config, {
      hash: hash
    })
    
    if (receipt.status === 'success') {
      ElMessage({
        message: 'Bridge Transaction Succeeded.',
        type: 'success',
        duration: 3000,
        showClose: true
      })
      
      return {
        success: true,
        txHash: hash,
        receipt: receipt,
        message: 'Bridge Transaction Succeeded.'
      }
    } else {
      throw new Error('Bridge failed')
    }
    
  } catch (error) {
    console.error('❌ ERC20 bridge error:', error)
    
    if (isUserRejectedError(error)) {
      ElMessage({
        message: 'User rejected the request.',
        type: 'warning',
        duration: 2000,
        showClose: true
      })
      throw new Error('User rejected the request.')
    }
    
    ElMessage({
      message: 'Bridge failed',
      type: 'error',
      duration: 2000,
      showClose: true
    })
    
    throw error
  }
}

/**
 * 统一的桥接方法
 */
export async function bridgeMethodOptimized({
  tokenName,
  tokenAddress,
  destTokenAddress,
  amount,
  userAddress,
  bridgeContractAddress,
  fromChainId,
  targetChainId,
  setTxHash,
  setApprovalHash
}) {
  try {
    const isNativeToken = tokenName === "ETH" || tokenName === "CP"
    
    if (isNativeToken) {
      return await bridgeEthOptimized({
        amount,
        userAddress,
        bridgeContractAddress,
        fromChainId,
        targetChainId,
        destTokenAddress,
        setTxHash
      })
    } else {
      return await bridgeErc20Optimized({
        tokenAddress,
        destTokenAddress,
        amount,
        userAddress,
        bridgeContractAddress,
        fromChainId,
        targetChainId,
        tokenName,
        setTxHash,
        setApprovalHash
      })
    }
  } catch (error) {
    console.error('❌ Bridge method error:', error)
    throw error
  }
}

/**
 * 获取桥接费率
 */
export async function getBridgeFeeRate({
  bridgeContractAddress,
  amount,
  fromChainId,
  targetChainId
}) {
  try {
    const amountBigInt = safeBigInt(amount)
    const fee = await readContract(config, {
      address: bridgeContractAddress,
      abi: bridgeABI,
      functionName: 'PerFee',
      args: [amountBigInt, fromChainId, targetChainId]
    })
    
    return BigInt(fee || 0)
  } catch (error) {
    console.error('Failed to get bridge fee rate:', error)
    return BigInt(0)
  }
}

/**
 * 计算桥接费用
 */
export async function calculateBridgeFee({
  bridgeContractAddress,
  amount,
  fromChainId,
  targetChainId
}) {
  try {
    const amountBigInt = safeBigInt(amount)
    const feeRate = await getBridgeFeeRate({
      bridgeContractAddress,
      amount: amountBigInt,
      fromChainId,
      targetChainId
    })
    
    // 计算实际费用 (amount * feeRate / 10000)
    const fee = (amountBigInt * feeRate) / BigInt(10000)
    return fee
  } catch (error) {
    console.error('Failed to calculate bridge fee:', error)
    return BigInt(0)
  }
}

/**
 * 检查链是否支持
 */
export async function isSupportedChain(bridgeContractAddress, chainId) {
  try {
    const isSupported = await readContract(config, {
      address: bridgeContractAddress,
      abi: bridgeABI,
      functionName: 'IsSupportedChainId',
      args: [chainId]
    })
    
    return Boolean(isSupported)
  } catch (error) {
    console.error('Failed to check supported chain:', error)
    return false
  }
}

/**
 * 检查代币是否支持
 */
export async function isSupportedToken(bridgeContractAddress, tokenAddress, chainId) {
  try {
    const isSupported = await readContract(config, {
      address: bridgeContractAddress,
      abi: bridgeABI,
      functionName: 'IsSupportedToken',
      args: [tokenAddress, chainId]
    })
    
    return Boolean(isSupported)
  } catch (error) {
    console.error('Failed to check supported token:', error)
    return false
  }
}

/**
 * 获取最小转账金额
 */
export async function getMinTransferAmount(bridgeContractAddress, tokenAddress, chainId) {
  try {
    const minAmount = await readContract(config, {
      address: bridgeContractAddress,
      abi: bridgeABI,
      functionName: 'MinTransferAmount',
      args: [tokenAddress, chainId]
    })
    
    return BigInt(minAmount || 0)
  } catch (error) {
    console.error('Failed to get min transfer amount:', error)
    return BigInt(0)
  }
}

/**
 * 获取资金池余额
 */
export async function getFundingPoolBalance(bridgeContractAddress, tokenAddress, chainId) {
  try {
    const balance = await readContract(config, {
      address: bridgeContractAddress,
      abi: bridgeABI,
      functionName: 'FundingPoolBalance',
      args: [tokenAddress, chainId]
    })
    
    return BigInt(balance || 0)
  } catch (error) {
    console.error('Failed to get funding pool balance:', error)
    return BigInt(0)
  }
}

// 向后兼容的别名函数
