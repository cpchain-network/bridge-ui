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
    const approvalAmount = useExactApproval ? amount : maxUint256
    
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
    
    if (error.message && error.message.includes('User rejected')) {
      throw new Error('User cancelled the authorization operation')
    }
    throw new Error('Failed to approve token: ' + (error.message || error))
  }
}

/**
 * 优化的 ETH 桥接函数 - 修复了参数缺失问题
 */
export async function bridgeEthOptimized({
  amount,
  userAddress,
  bridgeContractAddress,
  fromChainId,
  targetChainId,
  destTokenAddress, // 修复：添加缺失的参数
  setTxHash
}) {
  try {
    console.log('🌉 Starting ETH bridge:', {
      amount: amount.toString(),
      fromChainId,
      targetChainId,
      destTokenAddress,
      userAddress
    })
    
    // 修复：使用正确的 ABI 函数名和参数：BridgeInitiateETH
    const gasEstimate = await computedGas(
      bridgeABI,
      'BridgeInitiateETH',
      [fromChainId, targetChainId, destTokenAddress, userAddress], // 修复：添加 destTokenAddress 参数
      bridgeContractAddress,
      userAddress,
      amount
    )
    
    const hash = await writeContract(config, {
      abi: bridgeABI,
      address: bridgeContractAddress,
      functionName: 'BridgeInitiateETH',
      args: [fromChainId, targetChainId, destTokenAddress, userAddress], // 修复：添加 destTokenAddress 参数
      value: amount,
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
    
    if (error.info?.error?.code === 4001) {
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
 * 优化的 ERC20 桥接函数 - 参数正确
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
    console.log('🌉 Starting ERC20 bridge:', {
      tokenAddress,
      destTokenAddress,
      amount: amount.toString(),
      fromChainId,
      targetChainId,
      tokenName,
      userAddress
    })
    
    // 1. 检查授权
    console.log('🔍 Checking allowance...')
    const allowance = await checkAllowance(tokenAddress, userAddress, bridgeContractAddress)
    const amountBigInt = BigInt(amount)
    
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
    
    // 3. 执行桥接交易 - 使用正确的 ABI 函数名：BridgeInitiateERC20
    console.log('🌉 Submitting bridge transaction...')
    
    const args = [
      fromChainId,
      targetChainId,
      userAddress,
      tokenAddress,
      destTokenAddress || tokenAddress, // 目标链代币地址，如果没有提供则使用源代币地址
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
    
    if (error.info?.error?.code === 4001) {
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
 * 统一的桥接方法 - 修复了参数传递问题
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
        destTokenAddress, // 修复：传递 destTokenAddress 参数
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
 * 获取桥接费用
 */
export async function getBridgeFee({
  bridgeContractAddress,
  amount,
  fromChainId,
  targetChainId
}) {
  try {
    const fee = await readContract(config, {
      address: bridgeContractAddress,
      abi: bridgeABI,
      functionName: 'getBridgeFee',
      args: [amount, fromChainId, targetChainId]
    })
    
    return BigInt(fee || 0)
  } catch (error) {
    console.error('Failed to get bridge fee:', error)
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
      functionName: 'isSupportedChain',
      args: [chainId]
    })
    
    return Boolean(isSupported)
  } catch (error) {
    console.error('Failed to check supported chain:', error)
    return false
  }
}

