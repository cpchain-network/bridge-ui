<template>
    <div class="bridge">
        <div class="swap-container">
            <h1>随随时随地
                <br>
                轻轻松松跨链
            </h1>
            <div class="content">
                <div class="item">
                    <div class="chain-card left" @click="showChain(1)">
                        <div>
                            <img :src="require(`@/assets/imgs/chain/${fromChain.img}`)" alt="">
                        </div>
                        <div>
                            <div class="label" style="text-align: left;">From</div>
                            <div class="name">{{ fromChain.name }}</div>
                        </div>
                    </div>
                    <div class="arrow-wrap" @click="switchChain()">
                        <span class="arrow">→</span>
                    </div>
                    <div class="chain-card right" @click="showChain(2)">

                        <div>
                            <div class="label" style="text-align: right;">To</div>
                            <div class="name">{{ toChain.name }}</div>
                        </div>
                        <div>
                            <img :src="require(`@/assets/imgs/chain/${toChain.img}`)" alt="">
                        </div>
                    </div>
                </div>

                <div class="amount-card">
                    <!-- 左侧 -->
                    <div class="amount-main">
                        <div class="amount-value">0.01</div>
                        <div class="amount-usd">$25.26</div>
                    </div>
                    <!-- 右侧 -->
                    <div class="amount-side">
                        <div class="token-selector">
                            <img src="@/assets/imgs/coin/eth.svg" class="token-icon" />
                            <span>CP</span>
                            <svg class="arrow" width="16" height="16" viewBox="0 0 20 20">
                                <path d="M6 8l4 4 4-4" stroke="#aaa" stroke-width="2" fill="none" stroke-linecap="round" />
                            </svg>
                        </div>
                        <div class="amount-avail">可用 <span>0.02741 ETH</span></div>
                    </div>
                </div>

                <div class="summary-card">
                    <div class="summary-main">
                        <img class="summary-icon" src="@/assets/imgs/coin/eth.svg" alt="ETH" />
                        <div class="summary-info">
                            <div class="summary-amt">0.01ETH</div>
                            <div class="summary-usd">$25.26</div>
                        </div>
                    </div>
                    <div class="summary-bottom">
                        <div class="summary-fee">手续费 $0.9(0.0005ETH)</div>
                        <div class="summary-time">
                            ~3 mins
                            <svg width="15" height="15" class="clock" viewBox="0 0 20 20">
                                <circle cx="10" cy="10" r="8" stroke="#a0a0a0" stroke-width="1.5" fill="none" />
                                <line x1="10" y1="10" x2="10" y2="6" stroke="#a0a0a0" stroke-width="1.2"
                                    stroke-linecap="round" />
                                <line x1="10" y1="10" x2="13.3" y2="12.1" stroke="#a0a0a0" stroke-width="1.2"
                                    stroke-linecap="round" />
                            </svg>
                        </div>
                    </div>

                </div>

                <button class="submit-btn">跨链</button>
            </div>
        </div>
        <div class="confirm-modal" v-if="false">
            <!-- 顶部标题与关闭 -->
            <div class="modal-header">
                <span class="modal-title">确认信息</span>
                <span class="close-btn" @click="$emit('close')">×</span>
            </div>
            <!-- 资产1 -->
            <div class="modal-block">
                <div class="block-row">
                    <div class="block-chain">
                        <img src="@/assets/imgs/coin/eth.svg" class="block-icon" alt="">
                        <span class="block-label">从Ethereum跨链</span>
                    </div>
                    <span class="block-addr">0Xb3...4795</span>
                </div>
                <div class="block-amount">
                    <img src="@/assets/imgs/coin/eth.svg" class="amount-icon" alt="">
                    <span class="amount-value">0.01 ETH</span>
                </div>
            </div>
            <!-- 资产2 -->
            <div class="modal-block">
                <div class="block-row">
                    <div class="block-chain">
                        <img src="@/assets/imgs/coin/eth.svg" class="block-icon" alt="">
                        <span class="block-label">Cp Chain获得</span>
                    </div>
                    <span class="block-addr">0Xb3...4795</span>
                </div>
                <div class="block-amount">
                    <img src="@/assets/imgs/coin/eth.svg" class="amount-icon" alt="">
                    <span class="amount-value">0.01 CP</span>
                </div>
            </div>
            <!-- 信息明细 -->
            <div class="modal-info">
                <div class="info-row">
                    <span class="info-label">通过</span>
                    <span class="info-value">原生跨链</span>
                </div>
                <div class="info-row">
                    <span class="info-label">转账时间</span>
                    <span class="info-value">~3mins</span>
                </div>
                <div class="info-row">
                    <span class="info-label">费用</span>
                    <span class="info-value">$0.9(0.0005ETH)</span>
                </div>
            </div>
            <!-- 底部按钮 -->
            <button class="modal-btn">继续</button>
        </div>
        <div class="record">
            <div class="container">

                <div class="cross-records">
                    <div class="records-title">跨链记录</div>
                    <div class="records-table">
                        <div class="records-thead">
                            <div class="th">时间</div>
                            <div class="th">代币</div>
                            <div class="th">发出方</div>
                            <div class="th">接收方</div>
                            <div class="th">状态</div>
                            <div class="th">操作</div>
                        </div>
                        <div class="records-tr" v-for="(row, idx) in records" :key="idx" :class="{ 'alt': idx % 2 === 0 }">
                            <div class="td">{{ row.time }}</div>
                            <div class="td">{{ row.token }}</div>
                            <div class="td">{{ row.from }}</div>
                            <div class="td">{{ row.to }}</div>
                            <div class="td">
                                <span
                                    :class="['status', row.status === '成功' ? 'success' : row.status === '失败' ? 'fail' : '']">
                                    {{ row.status }}
                                </span>
                            </div>
                            <div class="td">
                                <span v-if="row.status === '失败'" class="retry-btn">重试</span>
                                <span v-else class="detail-link">查看详情</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--  选择链弹窗 -->
        <div class="chain-select-modal" v-if="showModal">
            <div class="chain-select-content">
                <div class="header">
                    <span>Select  Chain</span>
                    <span class="close-btn" @click="handleClose">✕</span>
                </div>
                <div class="search-box">
                    <input v-model="search" type="text" placeholder="搜索" />
                </div>

                <div class="chain-list">
                    <div v-for="chain in chains" :key="chain.id" class="chain-item"
                        :class="{ active: chain.name === selected }" @click="select(chain)">
                        <img :src="require(`@/assets/imgs/chain/${chain.img}`)" class="chain-icon" alt="" />

                        <span class="chain-name">{{ chain.name }}</span>
                        <span v-if="chain.chainId === selected.chainId" class="check-mark">✔</span>
                    </div>
                </div>
            </div>
        </div>

        <!--  选择币 -->
    </div>
</template>

<script>
import {
    ethers, Network, JsonRpcProvider
} from 'ethers';

import erc20ABI from "@/assets/abi/erc20ABI"
import bridgeABI from "@/assets/abi/bridgeABI"
import { getPriceToken } from '@/api/tokenPrice'
import networks from "../../assets/json/active-networks.json"
console.log(networks)
import { useWeb3ModalAccount, useSwitchNetwork } from '@web3modal/ethers/vue'
import {
    mapActions,
    mapMutations,
    mapState
} from "vuex";
export default {
    name: 'CrossRecords',
    data() {
        return {
            records: [{
                time: "2025/05/02 21:23",
                token: "ETH",
                from: "50x5AbC...d23E",
                to: "50x5AbC...d23E",
                status: "成功",
            },
            {
                time: "2025/05/02 21:23",
                token: "ETH",
                from: "50x5AbC...d23E",
                to: "50x5AbC...d23E",
                status: "失败",
            },
            {
                time: "2025/05/02 21:23",
                token: "ETH",
                from: "50x5AbC...d23E",
                to: "50x5AbC...d23E",
                status: "成功",
            },
            {
                time: "2025/05/02 21:23",
                token: "ETH",
                from: "50x5AbC...d23E",
                to: "50x5AbC...d23E",
                status: "成功",
            },
            {
                time: "2025/05/02 21:23",
                token: "ETH",
                from: "50x5AbC...d23E",
                to: "50x5AbC...d23E",
                status: "成功",
            },
            ],

            showModal: false,
            selected: "cp",
            search: "",
            // chains:[
            //     { label: "CP CHAIN", value: "cp", icon: "/assets/imgs/coin/eth.svg" },
            //     { label: "Ethereum", value: "eth", icon: "/assets/imgs/coin/eth.svg" },
            //     { label: "BNB CHAIN", value: "bnb", icon: "/assets/imgs/coin/eth.svg" }
            // ] ,
            chains: networks,
            fromBalance: 0,
            toBalance: 0,
            fromChain: networks[0],
            toChain: networks[1],
            state: "",

            allCoinList: [{
                img: "eth.svg",
                name: "ETH",
                minBridgeAmount: 0.001
            }, {
                img: "usdt.svg",
                name: "USDT",
                minBridgeAmount: 0.001
            }, {
                img: "usdc.svg",
                name: "USDC",
                minBridgeAmount: 0.001
            }, {
                img: "dai.png",
                name: "DAI",
                minBridgeAmount: 0.001
            }, {
                img: "eth.svg",
                name: "WETH",
                minBridgeAmount: 0.1
            },
            {
                img: "okb.png",
                name: "OKB",
                minBridgeAmount: 0.001
            }],
        };
    },
    computed: {
        filteredChains() {
            return this.chains.filter(
                c =>
                    c.name.toLowerCase().includes(this.search.toLowerCase())

            );
        },
        selectedLabel() {
            const sel = this.chains.find(c => c.value === this.selected);
            return sel ? sel.label : "";
        }
    },
    methods: {
        select(val) {

            this.selected = val;
            let fromChain = this.fromChain
            let toChain = this.toChain
            this.handleClose();

            if (val.chainId == this.fromChain.chainId || val.chainId == this.toChain.chainId) {
                this.switchChain()
                return
            }
            if (this.state == 1 && val.chainId != this.fromChain.chainId) {
                this.fromChain = this.selected
            }

            if (this.state == 2 && val.chainId != this.toChain.chainId) {
                this.toChain = this.selected
            }



            //from  且


            // this.chains=networks

        },
        switchChain() {
            console.log()
            let a = this.fromChain
            let b = this.toChain
            let temp = { ...a }
            Object.assign(a, b)
            Object.assign(b, temp)


        },
        handleClose() {
            this.showModal = false;
            this.search = "";
        },
        showChain(state) {
            this.showModal = true
            this.state = state
            // if (this.state == 1 ) {
            //   var arr=  this.chains.filter(c => c.chainId !==this.fromChain.chainId&&c.chainId !==this.toChain.chainId)
            //  this.chains =arr
            // }
            // if (this.state == 2 ) {
            //     var arr=  this.chains.filter(c => c.chainId !==this.fromChain.chainId&&c.chainId !==this.toChain.chainId)
            //  this.chains =arr
            // }
            // console.log(   this.selected)


        }
    }
};
</script>

<style lang="scss" scoped>
.bridge {
    background: #121212;
    min-height: 100vh;
    width: 100%;
    padding: 100px;

    .swap-container {
        width: 480px;
        height: 550px;
        margin: 0 auto;

        h1 {
            color: #FFF;
            text-align: center;

            font-size: 40px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            margin-bottom: 32px;
        }

        .content {
            padding: 16px;
            width: 448px;
            height: 420px;
            border-radius: 24px;
            background: #1E1E1E;

            .item {
                position: relative;
                margin-bottom: 16px;

                .arrow-wrap {
                    cursor: pointer;
                    width: 32px;
                    height: 32px;
                    background: #1E1E1E;
                    border: 1.6px solid #2E2F32;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    // margin: 0 -19px; // 向两侧溢出半径
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-50%);
                    //    transform: translateY(-50%);
                    z-index: 2;
                    box-shadow: 0 1px 8px #0002 inset;

                }

                .arrow {
                    color: #00CE7A;
                    font-size: 14px;
                    font-weight: 700;
                    display: inline-block;
                    transform: translateY(-1px);
                }

                display: flex;
                justify-content: space-around;

                .chain-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: none;
                    padding: 0;
                    margin: 0;
                    width: 100%;
                    position: relative;
                    z-index: 1;
                    margin-bottom: 8px;
                }

                .chain-card {
                    cursor: pointer;
                    // flex: 1 1 0%;
                    background: #1E1E1E;
                    border-radius: 20px;
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    gap: 13px;
                    height: 72px;
                    border: 1px solid #2E2F32;
                    box-sizing: border-box;
                    min-width: 0;
                    transition: box-shadow 0.2s;

                    img {
                        width: 40px;
                        display: block;
                    }

                    &.left {
                        width: 200px;
                        // margin-right: 34px;
                        justify-content: flex-start;
                    }

                    &.right {
                        width: 200px;
                        // margin-left: 34px;
                        justify-content: flex-end;
                    }

                    .icon {
                        width: 38px;
                        height: 38px;
                        border-radius: 50%;
                        object-fit: contain;
                        background: #191b20;
                        box-shadow: 0 1px 6px #15151522 inset;
                    }

                    .label {
                        color: #8E8E92;
                        // text-align: center;

                        font-size: 14px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: normal;
                    }

                    .name {
                        color: var(---, #FFF);

                        font-size: 14px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: normal;
                    }
                }
            }

            .amount-card {
                background: #1E1E1E;
                border: 1px solid #2E2F32;
                border-radius: 20px;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                padding: 16px;
                margin-bottom: 16px;
                width: 100%;
                box-sizing: border-box;
                height: 99px;
                position: relative;

                .amount-main {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    flex: 1;

                    .amount-value {
                        color: #FFF;

                        font-size: 32px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: normal;
                    }

                    .amount-usd {
                        color: #FFF;

                        font-size: 12px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;
                        // margin-top: 5px;
                    }
                }

                .amount-side {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    justify-content: space-between;
                    height: 100%;
                    min-width: 180px;

                    .token-selector {
                        display: flex;
                        align-items: center;

                        border-radius: 100px;
                        border: 1px solid #2E2F32;

                        background: #151517;
                        border-radius: 24px;
                        padding: 8px 12px;
                        min-width: 72px;
                        height: 44px;
                        font-size: 1.12rem;
                        color: #fff;
                        font-weight: 600;
                        // margin-bottom: 30px;
                        gap: 7px;

                        .token-icon {
                            width: 27px;
                            height: 27px;
                            border-radius: 50%;
                            background: #11df72;
                            margin-right: 6px;
                        }

                        span {
                            color: #FFF;
                            text-align: center;

                            font-size: 12px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: normal;
                        }

                        .arrow {
                            margin-left: 8px;
                            margin-top: 2px;
                            width: 16px;
                            height: 16px;
                            display: inline-block;
                        }
                    }

                    .amount-avail {

                        color: #8E8E92;

                        font-size: 12px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;

                        span {
                            color: #FFF;

                            font-size: 12px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: normal;
                        }
                    }
                }
            }

            .summary-card {
                background: #1E1E1E;
                border: 1px solid #2E2F32;
                border-radius: 20px;
                padding: 16px;
                width: 100%;
                box-sizing: border-box;
                height: 107px;
                margin-bottom: 20px;
                display: flex;
                flex-direction: column;
                gap: 12px;

                .summary-main {
                    display: flex;
                    align-items: center;
                    gap: 15px;

                    .summary-icon {
                        width: 48px;
                        height: 48px;
                        border-radius: 50%;

                        object-fit: cover;
                    }

                    .summary-info {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;

                        .summary-amt {
                            color: #FFF;

                            font-size: 24px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: normal;
                        }

                        .summary-usd {
                            color: #FFF;

                            font-size: 12px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: normal;
                        }
                    }
                }

                .summary-bottom {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    // margin-top: 10px;

                    .summary-fee {
                        color: #8E8E92;

                        font-size: 12px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;
                    }

                    .summary-time {
                        color: #8E8E92;

                        font-size: 12px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;

                        .clock {
                            vertical-align: middle;
                            margin-top: 1px;
                            font-size: 10px;
                        }
                    }
                }
            }

            .submit-btn {
                width: 100%;
                // padding: 20px  0;
                display: block;
                height: 48px;
                border: none;
                outline: none;
                background: #00CE7A;
                border-radius: 999px;
                // font-size: 16px;
                font-style: normal;
                font-weight: 500;

                cursor: pointer;
                margin-top: 16px;
                transition: background 0.18s, filter 0.18s;

                &:hover,
                &:active {
                    background: #00c864;
                    filter: brightness(0.98);
                }
            }

        }
    }

    .record {
        width: 100%;
        min-height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;

        .container {
            max-width: 1200px;
            min-height: 200px;

            .cross-records {
                margin-top: 48px;
                width: 100%;

                .records-title {
                    font-size: 1.3rem;
                    font-weight: 600;
                    color: #fff;
                    margin-bottom: 20px;
                }

                .records-table {
                    border-radius: 12px;
                    overflow: hidden;
                    background: none;
                    border: none;
                    width: 100%;
                    min-width: 900px;
                    box-sizing: border-box;
                    font-size: 1.07rem;

                    .records-thead,
                    .records-tr {
                        display: flex;
                        align-items: center;
                        width: 100%;
                    }

                    .records-thead {
                        // background: #242424;
                        color: #eee;
                        font-weight: 500;
                        height: 46px;

                        .th {
                            flex: 1;
                            padding: 0 10px;
                            color: #8E8E92;

                            font-size: 12px;
                            font-style: normal;
                            font-weight: 400;
                            line-height: normal;
                        }
                    }

                    .records-tr {
                        min-height: 48px;
                        height: 48px;
                        // background: #191b1e;
                        color: #f2f2f2;
                        transition: background 0.15s;

                        .td {
                            flex: 1;
                            padding: 0 10px;
                            color: #FFF;

                            font-size: 14px;
                            font-style: normal;
                            font-weight: 500;
                            line-height: normal;
                        }

                        &.alt {
                            background: #1E1E1E;
                        }

                        &:hover {
                            background: #1E1E1E;
                        }
                    }

                    .status {
                        font-weight: 500;

                        &.success {
                            color: #00CE7A;
                        }

                        &.fail {
                            color: #f4575e;
                        }
                    }

                    .retry-btn,
                    .detail-link {
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 500;
                        border: none;
                        background: none;
                        padding: 0;
                        color: #fff;
                        transition: text-decoration 0.15s;

                        &:hover {
                            color: #00CE7A;
                        }
                    }

                    .retry-btn {
                        color: #fff;
                    }

                }

                // 响应式
                @media (max-width: 900px) {
                    .records-table {
                        min-width: 100vw;
                        font-size: 0.99rem;

                        .th,
                        .td {
                            padding: 0 6px;
                        }
                    }
                }
            }
        }
    }

    $modal-bg: #181A1B;
    $modal-radius: 20px;
    $modal-padding: 32px 28px 24px 28px;

    $block-bg: #121212;
    $block-border: #232427;
    $block-radius: 16px;

    $text-main: #fff;
    $text-secondary: #8E8E92;
    $primary: #00CE7A;
    $primary-hover: #00c864;

    .confirm-modal {
        width: 410px;
        margin: 100px auto 0;
        background: #151517;
        border-radius: $modal-radius;
        box-shadow: 0 12px 32px #000a;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 18px;
        color: $text-main;
        position: relative;

        .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 5px;

            .modal-title {
                font-size: 20px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
                color: #fff;
            }

            .close-btn {
                font-size: 22px;
                color: #fff;

                cursor: pointer;
                transition: color .18s;

                &:hover {
                    color: $primary;
                }
            }
        }

        .modal-block {
            background: #151517;
            border: 1px solid $block-border;
            border-radius: $block-radius;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-bottom: 0;

            .block-row {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .block-chain {
                    display: flex;
                    align-items: center;
                    gap: 7px;

                    .block-icon {
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background: #222;
                    }

                    .block-label {
                        color: #FFF;

                        font-size: 12px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;
                    }
                }

                .block-addr {
                    color: #FFF;
                    text-align: center;

                    font-size: 12px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                    border-radius: 100px;

                    background: #000;
                    display: inline-block;
                    padding: 2px 10px;
                }
            }

            .block-amount {
                margin-top: 4px;
                display: flex;
                align-items: center;
                gap: 9px;

                .amount-icon {
                    width: 32px;
                    height: 32px;
                }

                .amount-value {
                    color: #FFF;
                    text-align: center;

                    font-size: 24px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: normal;
                }
            }
        }

        .modal-info {
            margin-top: 4px;
            background: none;
            border-radius: $block-radius;
            border: 1px solid #232427;
            padding: 0 2px;
            display: flex;
            flex-direction: column;
            gap: 0;

            .info-row {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 42px;
                font-size: 15px;
                padding: 0 16px;
                border-bottom: 1px solid #232427;

                &:last-child {
                    border-bottom: none;
                }

                .info-label {
                    color: #FFF;

                    font-size: 12px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                }

                .info-value {
                    color: #FFF;

                    font-size: 12px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;
                }
            }
        }

        .modal-btn {
            margin-top: 16px;
            width: 100%;
            height: 48px;
            background: $primary;
            border-radius: 999px;
            border: none;
            color: #000;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 2px;
            cursor: pointer;
            transition: background .18s;

            &:hover {
                background: $primary-hover;
            }
        }
    }


    .open-btn {
        margin: 40px;
        padding: 8px 24px;
        border-radius: 8px;
        border: none;
        background: #23242b;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
    }

    .selected-info {
        margin: 30px 0 0 40px;
        font-size: 16px;
        color: #fff;
    }

    .chain-select-modal {
        position: fixed;
        inset: 0;
        z-index: 2000;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .chain-select-content {
        width: 390px;
        background: #151517;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.35);
        animation: showModal .2s;

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 22px;
            font-weight: bold;
            color: #fff;
            margin-bottom: 24px;

            span {
                color: #fff;

                font-size: 20px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
            }

            // padding: 0 32px 8px 32px;

            .close-btn {
                font-size: 20px;
                cursor: pointer;
                user-select: none;
                transition: color 0.15s;

                &:hover {
                    color: #ccc;
                }
            }
        }

        .search-box {
            // margin: 0 32px 16px 32px;

            input {
                width: 100%;
                border: none;
                outline: none;
                background: #252629;
                border-radius: 100px;
                height: 38px;
                padding: 0 14px;
                font-size: 15px;

                color: #666868;

                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;

                &::placeholder {
                    color: #666868;
                    ;
                }
            }
        }

        .chain-list {
            display: flex;
            flex-direction: column;
            gap: 4px;
            // margin: 0 24px;

            .chain-item {
                display: flex;
                align-items: center;
                gap: 16px;
                height: 64px;
                cursor: pointer;
                border-radius: 14px;
                padding: 0 16px;
                transition: background .13s;
                color: #fff;
                color: var(---, #FFF);



                .chain-icon {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    // background: #23242b;
                    object-fit: contain;
                }

                .chain-name {
                    flex: 1;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 500;
                    color: #fff;
                    line-height: normal;

                }

                .check-mark {
                    color: #00e782;
                    font-size: 22px;
                    font-weight: bold;
                }

                &:hover,
                &.active {
                    // background: #23242b;
                }
            }
        }
    }

    @keyframes showModal {
        from {
            transform: scale(0.92);
            opacity: 0;
        }

        to {
            transform: scale(1);
            opacity: 1;
        }
    }
}
</style>
