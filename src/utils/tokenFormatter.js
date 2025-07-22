import { formatUnits } from "ethers";

// 常见币种及其 decimals 定义（KEY 一律大写）
const TOKEN_DECIMALS = {
  ETH: 18,
  USDT: 6,
  USDC: 6,
  DAI: 18,
  WBTC: 8,
  // 需要支持更多币种可在这里加
};

/**
 * 根据币种 symbol 和 wei 数值，格式化成可读金额
 * @param {bigint | string | number} amountWei - 数值（单位: wei）
 * @param {string} symbol - 币种 symbol，不区分大小写
 * @returns {string} 格式化结果字符串
 */
export function formatTokenAmount(amountWei, symbol) {
  const upperSymbol = symbol.trim().toUpperCase();
  const decimals = TOKEN_DECIMALS[upperSymbol];

  if (decimals === undefined) {
    throw new Error(`Unknown token symbol: ${upperSymbol}`);
  }

  return formatUnits(BigInt(amountWei), decimals);
}
