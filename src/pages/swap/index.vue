<template>
    <div class="swap-wrap">
        <div class="swap-card">
            <!-- 出售 -->
            <div class="swap-row">
                <div class="swap-label">出售</div>
                <div class="swap-amount-row">
                    <input type="number" v-model="sellAmount" :max="sellBalance" min="0" step="any"
                        class="swap-amount-input" />
                    <div class="swap-token-btn">
                        <img src="@/assets/imgs/chain/cp.png" alt="cp" class="token-img" />
                        <span>CP</span>
                        <svg class="down-arrow" width="14" height="14" viewBox="0 0 14 14">
                            <path d="M4 6l3 3 3-3" stroke="#fff" stroke-width="1.3" fill="none" stroke-linecap="round" />
                        </svg>
                    </div>
                </div>
                <div class="swap-balance">余额 {{ sellBalance }}</div>
            </div>
            <!-- 换向按钮 -->
            <div class="swap-switch-row">
                <div class="swap-switch-btn" @click="reverseToken">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                        <path d="M10 3v14M10 3l-3 3m3-3l3 3M10 17l-3-3m3 3l3-3" stroke="#38E899" stroke-width="1.3"
                            fill="none" stroke-linecap="round" />
                    </svg>
                </div>
            </div>
            <!-- 购买 -->
            <div class="swap-row">
                <div class="swap-label">购买</div>
                <div class="swap-amount-row">
                    <input type="number" v-model="buyAmount" :max="buyBalance" min="0" step="any" class="swap-amount-input"
                        :class="{ placeholder: !buyAmount }" placeholder="0.00" />
                    <div class="swap-token-btn select" @click="openTokenSelect">
                        <span>{{ buyToken || 'Select Token' }}</span>
                        <svg class="down-arrow" width="14" height="14" viewBox="0 0 14 14">
                            <path d="M4 6l3 3 3-3" stroke="#1EDC80" stroke-width="1.3" fill="none" stroke-linecap="round" />
                        </svg>
                    </div>
                </div>
                <div class="swap-balance">余额 {{ buyBalance }}</div>
            </div>
            <!-- 滑点设置 -->
            <div class="swap-setting-row">
                <span class="setting-label">滑点设置</span>
                <button class="slip-btn" @click="openSlipSet">
                    {{ slippage }}%
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3.5L10.5 8.00002L6 12.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <!-- 兑换按钮 -->
            <button class="swap-main-btn" :disabled="!canSwap">兑换</button>
        </div>
    </div>
</template>
  
<script>
import {
    ethers, Network, JsonRpcProvider, formatUnits,
    parseEther,
} from 'ethers';
import BigNumber from 'bignumber.js';
import axios from 'axios';
import erc20ABI from "@/assets/abi/erc20ABI"
import { Token, CurrencyAmount, TradeType, Percent } from '@uniswap/sdk-core'
import { Pair, Route, Trade } from '@uniswap/v2-sdk'
export default {
    name: "SwapCard",
    data() {
        return {
            sellAmount: '0.01',
            buyAmount: '0.01',
            sellBalance: 200,
            buyBalance: 200,
            buyToken: '',
            slippage: '0.015'
        }
    },
    computed: {
        canSwap() {
            return (
                Number(this.sellAmount) > 0 &&
                Number(this.buyAmount) > 0 &&
                this.buyToken
            )
        },
       
    },
    methods: {
        reverseToken() {
            // 真实场景下要同步swap币种与余额
            const tmp = this.sellAmount
            this.sellAmount = this.buyAmount
            this.buyAmount = tmp
        },
        openTokenSelect() {
            // 这里可以弹窗/下拉选择token
            this.buyToken = 'USDT' // 示例
        },
        openSlipSet() {
            // 这里可以弹窗/下拉选择滑点
            this.slippage = '0.5' // 示例
            console.log(this.activeChian)
        },


    }
}
</script>
  
<style lang="scss" scoped>
.swap-wrap {
    min-height: 100vh;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
}

.swap-card {
    width: 448px;
    border-radius: 24px;
    background: var(---, #1E1E1E);
    border: 1.5px solid #222326;
    padding: 16px;
    position: relative;

    .swap-row {

        border-radius: 20px;
        border: 1px solid #2E2F32;
        ;
        margin-bottom: 16px;
        border: 1px solid #23262f;
        padding: 16px;

        .swap-label {
            color: #FFF;


            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            margin-bottom: 10px;
        }

        .swap-amount-row {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .swap-amount-input {
                background: transparent;
                border: none;
                color: #fff;
                outline: none;


                font-size: 32px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                width: 140px;
                padding: 0 0 0 2px;

                &::placeholder {
                    color: #fff;
                    opacity: 1;
                    font-weight: 500;
                }
            }

            .swap-token-btn {
                display: flex;
                align-items: center;
                border-radius: 100px;
                border: 1px solid #2E2F32;
                background: #151517;
                padding: 8px 12px;

                cursor: pointer;

                span {
                    color: #fff;
                    font-size: 12px;
                }

                .token-img {
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    margin-right: 6px;
                }

                .down-arrow {
                    margin-left: 4px;
                }
            }

            .swap-token-btn.select {
                background: #15e784;
                color: #fff;

                .down-arrow path {
                    stroke: #fff;
                }
            }
        }

        .swap-balance {
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            margin-top: 5px;
            text-align: left;
            color: #fff;
            letter-spacing: 0.5px;
        }
    }

    .swap-switch-row {
        display: flex;
        justify-content: center;
        margin-top: -12px;
        margin-bottom: -6px;
        position: absolute;
        top: 148px;
        left: 50%;
        z-index: 1000;
        transform: translateX(-50%);

        .swap-switch-btn {
            background: #18191d;
            border: 3px solid #23262f;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px 0 rgba(36, 232, 151, 0.06);
            cursor: pointer;
            transition: border-color 0.18s;

            &:hover {
                border-color: #19dc80;
            }

            svg {
                display: block;
            }
        }
    }

    .swap-setting-row {
        display: flex;
        height: 48px;
        padding: 0px 16px;
        justify-content: space-between;
        ;
        border-radius: 100px;
        border: 1px solid #2E2F32;
        align-items: center;
        margin-bottom: 16px;

        .setting-label {
            color: #fff;
            font-size: 15px;
            font-weight: 500;
        }

        .slip-btn {
            background: none;
            color: #fff;
            border: none;
            // border-radius: 18px;
            font-size: 14px;
            font-weight: 600;
            padding: 4px 18px 4px 12px;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: filter 0.15s;

            svg {
                margin-left: 4px;
                margin-top: 2px;
            }

            &:hover {
                filter: brightness(1.08);
            }
        }
    }

    .swap-main-btn {
        width: 100%;
        height: 48px;
        border: none;
        border-radius: 100px;
        background: var(---, #2E2F32);
        color: #8E8E92;
        font-size: 16px;
        font-weight: 700;
        cursor: not-allowed;
        opacity: 0.75;
        letter-spacing: 1px;
        margin-top: 4px;
        transition: background 0.2s;

        &:active {
            opacity: 0.92;
        }

        &:not([disabled]) {
            background: #00CE7A;
            ;
            color: #1A1E1D;
            cursor: pointer;
            opacity: 1;

        }
    }
}
</style>
  