<template>
    <div class="bridge">
        <div class="swap-container" v-if="bridgeStep === 1">
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
                        <div class="amount-value">
                            <input type="number" :placeholder="fromPlaceHolder" v-model="amount" />
                            <!-- <div class="max-btn" @click="setMax">Max</div> -->
                        </div>
                        <!-- <div class="amount-usd">$25.26</div> -->
                    </div>
                    <!-- 右侧 -->
                    <div class="amount-side">
                        <div class="token-selector" @click="showCoin()">
                            <img :src="require(`@/assets/imgs/coin/${coinChoose.img}`)" class="token-icon" />
                            <span>{{ coinChoose.name }}</span>
                            <svg class="arrow" width="16" height="16" viewBox="0 0 20 20">
                                <path d="M6 8l4 4 4-4" stroke="#aaa" stroke-width="2" fill="none" stroke-linecap="round" />
                            </svg>
                        </div>
                        <div class="amount-avail">可用
                            <img src="@/assets/imgs/bridge/loading-gray.svg" v-if="isLoadingBalance" alt="">
                            <span v-else>
                                &nbsp;{{ formattedFromBalance }}{{ coinChoose.name }}
                            </span>

                        </div>
                    </div>
                </div>

                <div class="summary-card">
                    <div class="summary-main">
                        <img class="summary-icon" src="@/assets/imgs/coin/eth.svg" alt="ETH" />
                        <div class="summary-info">
                            <div class="summary-amt">{{ bridgeAmount }}{{ coinChoose.name }}</div>
                            <!-- <div class="summary-usd">$25.26</div> -->
                        </div>
                    </div>
                    <div class="summary-bottom">
                        <div class="summary-fee">手续费 $0.9(0.0005ETH)</div>
                        <div class="summary-time">
                            3~10 mins
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

                <button class="submit-btn" :disabled="!isInsufficient" @click="tab(2)">
                    <span v-if="!isInsufficient"> INSUFFICIENT FUNDS </span>
                    <span v-else>跨链</span>
                </button>
            </div>
        </div>
        <div class="confirm-modal" v-if="bridgeStep === 2">
            <!-- 顶部标题与关闭 -->
            <div class="modal-header">
                <i class="el-icon-back" style="color: #fff;cursor: pointer;" @click="tab(1)"></i>
                <span class="modal-title">确认信息</span>
                <span class="close-btn" @click="$emit('close')">×</span>
            </div>
            <!-- 资产1 -->
            <div class="modal-block">
                <div class="block-row">
                    <div class="block-chain">
                        <img :src="require(`@/assets/imgs/chain/${fromChain.img}`)" class="block-icon" alt="">
                        <span class="block-label">从{{ fromChain.name }}跨链</span>
                    </div>
                    <span class="block-addr"> {{ userInfo.address | ellipsisFilter }}</span>
                </div>
                <div class="block-amount">
                    <img :src="require(`@/assets/imgs/chain/${coinChoose.img}`)" class="amount-icon" alt="">
                    <span class="amount-value">{{ amount }} {{ coinChoose.name }}</span>
                </div>
            </div>
            <!-- 资产2 -->
            <div class="modal-block">
                <div class="block-row">
                    <div class="block-chain">
                        <img :src="require(`@/assets/imgs/chain/${toChain.img}`)" class="block-icon" alt="">
                        <span class="block-label">{{ toChain.name }}获得</span>
                    </div>
                    <span class="block-addr"> {{ userInfo.address | ellipsisFilter }}</span>
                </div>
                <div class="block-amount">
                    <img src="@/assets/imgs/coin/eth.svg" class="amount-icon" alt="">
                    <span class="amount-value">{{ bridgeAmount }} {{ coinChoose.name }}</span>
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
                    <span class="info-value">3~10mins</span>
                </div>
                <div class="info-row">
                    <span class="info-label">费用</span>
                    <span class="info-value">$0.9(0.0005ETH)</span>
                </div>
            </div>
            <!-- 底部按钮 -->
            <button class="modal-btn" :disabled="isProcessing" @click="bridgeMethod">
                <img src="@/assets/imgs/bridge/loading.svg" v-if="isProcessing" alt="">
                 <span v-else>继续</span>
            </button>
        </div>
        <div class="record" v-if="false">
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
                    <input v-model="search" type="text" placeholder="搜索" @input="fliterChain()" />
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


        <div class="chain-select-modal" v-if="showModal2">
            <div class="chain-select-content">
                <div class="header">
                    <span>Select  Coin</span>
                    <span class="close-btn" @click="showModal2 = false">✕</span>
                </div>
                <div class="search-box">
                    <input v-model="search2" type="text" placeholder="搜索" @input="fliterCoin()" />
                </div>

                <div class="chain-list">
                    <div v-for="coin in allCoinList" :key="coin.name" class="chain-item"
                        :class="{ active: coin.name === coinChoose.name }" @click="select2(coin)">
                        <img :src="require(`@/assets/imgs/coin/${coin.img}`)" class="chain-icon" alt="" />

                        <span class="chain-name">{{ coin.name }}</span>
                        <span v-if="coin.name === coinChoose.name" class="check-mark">✔</span>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import {
    ethers, Network, JsonRpcProvider
} from 'ethers';
import  axios  from 'axios';
import erc20ABI from "@/assets/abi/erc20ABI"
import bridge from "@/assets/abi/bridgeABI"
const bridgeABI = bridge.abi
import { getPriceToken } from '@/api/tokenPrice'
import networks from "../../assets/json/active-networks.json"
console.log(networks)
import { useWeb3ModalAccount, useSwitchNetwork } from '@web3modal/ethers/vue'
import {
    mapActions,
    mapMutations,
    mapState
} from "vuex";
const coinList = [{
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
}]
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
            showModal2: false,
            selected: "cp",
            search: "",
            search2: "",
            chains: networks,
            fromBalance: 0,
            toBalance: 0,
            fromChain: networks[0],
            toChain: networks[1],

            state: "",

            feeDesc: `Sender pays a 0.001% \n\n trading fee for each transfer`,
            bridgeFee: 0.0001,
            amount: null,
            stakeAmount: null,
            bridgeAmount: 0, //bridge after amount

            dialogVisible: false,
            coinChooseVisible: false,
            selectedOption: null,
            isLoadingBalance: false,
            position: '',
            bridgeStep: 1,
            pageIndex: 1,

            isProcessing: false,
            coinChoose: {
                img: "eth.svg",
                name: "ETH",
                minBridgeAmount: 0.001
            },
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
            coinList: [{
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
            }
            ],
            userHasStaking: true,
            remainingSeconds: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            timer: null,
            stakingReward: 0,
            stakingPrincipal: 0,
            rewardType: false,
            rewardTypeText: 'Withdraw Rewards',
            minBridgeAmount: 0.001

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
        },
        ...mapState("ethersWallet", ["provider", "signer", "userInfo", "currentNetwork"]),
        formattedFromBalance() {
            console.log(typeof this.fromBalance)
            this.fromBalance = Number(this.fromBalance)
            // 使用 toFixed 方法设置小数点后6位，并使用 Number 转换为数字类型
            return this.fromBalance.toFixed(6)
        },
        formattedToBalance() {
            this.toBalance = Number(this.toBalance)
            // 使用 toFixed 方法设置小数点后6位，并使用 Number 转换为数字类型
            return this.toBalance.toFixed(6)
        },
        fromPlaceHolder() {
            return `at least ${this.coinChoose.minBridgeAmount}`;
        },
        isInsufficient() {
            // console.log(this.fromBalance, this.coinChoose.minBridgeAmount)

            // console.log(typeof this.fromBalance, typeof this.coinChoose.minBridgeAmount, this.fromBalance >= this.coinChoose.minBridgeAmount)
            return this.fromBalance >= this.coinChoose.minBridgeAmount &&
                this.fromBalance >= this.amount
        },
        isStakeInsufficient() {
            // console.log(this.fromBalance, this.coinChoose.minBridgeAmount)

            // console.log(typeof this.fromBalance, typeof this.coinChoose.minBridgeAmount, this.fromBalance >= this.coinChoose.minBridgeAmount)
            return this.fromBalance >= this.coinChoose.minBridgeAmount &&
                this.fromBalance >= this.stakeAmount
        },
        isCanConfirm() {
            return this.amount != null && this.amount >= this.coinChoose.minBridgeAmount
        },
        isCanStake() {
            return this.stakeAmount != null && this.stakeAmount >= this.coinChoose.minBridgeAmount
        }
    },
    created(){
    //    this.getGas()
    },
    methods: {

    //  获取gas  费用
  async   getGas(){
      var  result  = await  axios.get("https://bridge-api.testnet.cpchain.com/api/v1/bridge-gas-fee?chain_id=11155420")
      console.log(result)

    },
       async tab(item) {
            const { chainId } = useWeb3ModalAccount()
            if (chainId && chainId?.value !== this.fromChain?.chainId) {
                
                await this.switchNet(this.fromChain)
                return
            }
            this.bridgeStep = item
        },
        fliterChain() {
            var arr = this.chains.filter(
                c =>
                    c.name.toLowerCase().includes(this.search.toLowerCase().trim())

            );


            this.chains = arr

            if (this.search.toLowerCase().trim() === "") {
                this.chains = networks
            }

        },

        fliterCoin() {
            var arr = this.allCoinList.filter(
                c =>
                    c.name.toLowerCase().includes(this.search2.toLowerCase().trim())

            );


            this.allCoinList = arr

            if (this.search2.toLowerCase().trim() === "") {
                this.allCoinList = coinList
            }
        },
        showCoin() {
            console.log(this.coinList)
            this.allCoinList = coinList
            this.showModal2 = true
            this.search2 = ""
        },
        select(val) {

            this.selected = val;
            let fromChain = this.fromChain
            let toChain = this.toChain
            this.handleClose();

            if (val.chainId == this.fromChain.chainId || val.chainId == this.toChain.chainId) {
                this.switchChain()
                this.initBridgeBalance()
                return
            }
            if (this.state == 1 && val.chainId != this.fromChain.chainId) {
                this.fromChain = this.selected
                this.initBridgeBalance()
            }

            if (this.state == 2 && val.chainId != this.toChain.chainId) {
                this.toChain = this.selected
                this.initBridgeBalance()
            }



            //from  且


            // this.chains=networks

        },
        select2(val) {
            console.log(val)
            this.coinChoose = val
            this.showModal2 = false
            this.initBridgeBalance()
        },
        switchChain() {

            let a = this.fromChain
            let b = this.toChain
            let temp = { ...a }
            Object.assign(a, b)
            Object.assign(b, temp)

            this.initBridgeBalance()
        },
        handleClose() {
            this.showModal = false;
            this.search = "";
        },
        showChain(state) {
            this.showModal = true
            this.state = state
            this.chains = networks
            this.search = ""
            // if (this.state == 1 ) {
            //   var arr=  this.chains.filter(c => c.chainId !==this.fromChain.chainId&&c.chainId !==this.toChain.chainId)
            //  this.chains =arr
            // }
            // if (this.state == 2 ) {
            //     var arr=  this.chains.filter(c => c.chainId !==this.fromChain.chainId&&c.chainId !==this.toChain.chainId)
            //  this.chains =arr
            // }
            // console.log(   this.selected)


        },

        setMax() {
            this.amount = this.fromBalance
        },
        setStakeMax() {
            this.stakeAmount = this.fromBalance
        },
        async bridgeMethod() {
            if (this.isProcessing) {
                return;
            }
            if (this.coinChoose.name === this.fromChain.currency) {
                await this.bridgeEth()
            } else {
                await this.bridgeErc20()
            }
        },
        //eth桥接
        async bridgeEth() {
            this.isProcessing = true;
            try {
                console.log("this.amount-----------", this.amount);
                const valueInWei = ethers.parseEther(this.amount.toString());
                console.log("valueInWei-----------", valueInWei)
                let signer = await this.provider.getSigner()
                let bridgeContract = new ethers.Contract(this.fromChain.bridgeContract, bridgeABI, signer)
                // console.log('bridgeContract.BridgeInitiateETH------', bridgeContract.BridgeInitiateETH)
                console.log(445, this.fromChain.chainId, this.toChain.chainId);
                let tx = await bridgeContract.BridgeInitiateETH.send(this.fromChain.chainId, this.toChain.chainId, this.userInfo.address, {
                    value: valueInWei // 添加这一行，指定发送的以太币数量
                })
                let receipt = await tx.wait()
                // console.log(receipt)
                if (receipt.status === 1) {
                    this.bridgeStep = 1
                    this.initBridgeBalance()
                    this.$toast.success("Bridge Transaction Succeeded.")
                    // this.$router.push({ path: "history", query: { type: 1 } })
                } else {
                    this.$toast.error("Bridge failed")
                }
            } catch (error) {
                this.isProcessing = false;
                console.log("bridgeEth ---- error -- ", error)
                if (error.info?.error?.code === 4001) {
                    this.$toast.error("User rejected the request.")
                    return;
                }
            }
            this.isProcessing = false;
        },
        //erc20桥接
        async bridgeErc20() {
            this.isProcessing = true;
            try {
                const valueInWei = ethers.parseEther(this.amount.toString());
                console.log("this.fromChain.bridgeContract-----------", this.fromChain.bridgeContract)
                let signer = await this.provider.getSigner()
                let bridgeContract = new ethers.Contract(this.fromChain.bridgeContract, bridgeABI, signer)
                let contractName = this.coinChoose.name.toLowerCase() + "Contract";
                let tokenContract = new ethers.Contract(this.fromChain[contractName], erc20ABI, signer)
                let approveAmount = await tokenContract.allowance(this.userInfo.address, this.fromChain.bridgeContract)
                console.log('approveAmount-------', approveAmount, "-------valueInWei---------", valueInWei)
                if (approveAmount < valueInWei) {
                    let approveTx = await tokenContract.approve(this.fromChain.bridgeContract, valueInWei)
                    let receipt = await approveTx.wait()
                    if (receipt.status === 0) {
                        this.$toast.error("Approve failed.")
                        this.isProcessing = false;
                        return;
                    }
                }
                let tx = null;
                console.log(this.fromChain.chainId, this.toChain.chainId, this.userInfo.address, this.fromChain[contractName], valueInWei)
                if (this.coinChoose.name === "WETH" && this.fromChain.name !== "X1 TestNet") {
                    tx = await bridgeContract.BridgeInitiateWETH.send(this.fromChain.chainId, this.toChain.chainId, this.userInfo.address, valueInWei)
                } else {
                    console.log("BridgeInitiateERC20-------send")
                    tx = await bridgeContract.BridgeInitiateERC20.send(this.fromChain.chainId, this.toChain.chainId, this.userInfo.address, this.fromChain[contractName], valueInWei)
                }
                let receipt = await tx.wait()
                console.log(receipt)
                if (receipt.status === 1) {
                    this.bridgeStep = 1
                    this.initBridgeBalance()
                    this.$toast.success("Bridge Transaction Succeeded.")
                    // this.$router.push({ path: "history", query: { type: 1 } })
                } else {
                    this.$toast.error("Bridge failed")
                }
            } catch (error) {
                this.isProcessing = false;
                console.log("bridgeErc20 ---- error -- ", error)
                if (error.info?.error?.code === 4001) {
                    this.$toast.error("User rejected the request.")
                    return;
                }
            }
            this.isProcessing = false;
        },
        async stepMove(step) {
            const { chainId } = useWeb3ModalAccount()
            if (chainId && chainId?.value !== this.fromChain?.chainId) {
                await this.switchNet(this.fromChain)
                return
            }
            this.bridgeStep = step;
        },

        formatCurrency(value, precision) {
            // 确定显示的小数位数，若未指定，我们默认为2位小数
            const decimalPrecision = precision !== undefined ? precision : 2;

            // parseFloat 断言值都是数字类型，并toFixed 四舍五入到指定位数
            const formattedValue = parseFloat(value).toFixed(decimalPrecision);

            // 返回四舍五入后的数值，确保返回的是字符串类型
            return formattedValue;
        },
        chooseCoin(item) {
            this.coinChoose = item;
            this.coinChooseVisible = false;
            if (this.pageIndex === 1) {
                this.initBridgeBalance()
            }
        },
        handleCoinSelectorClick() {
            this.coinChooseVisible = !this.coinChooseVisible;
        },
        // 点击 coin-selector-dialog 外的区域时隐藏 coin-selector-dialog
        handleDocumentClick(event) {
            // console.log("=-----handleDocumentClick")
            const coinSelector = this.$refs.coinSelector;
            const coinSelectorDialog = this.$refs.coinSelectorDialog;
            // console.log("=-----coinSelector-",coinSelector)
            // console.log("=-----coinSelectorDialog-",coinSelectorDialog)
            // 判断点击区域是否在 coin-selector 或 coin-selector-dialog 内
            if (coinSelector && !coinSelector.contains(event.target) && coinSelectorDialog && !coinSelectorDialog.contains(event.target)) {
                // console.log("=-----handleDocumentClickfalsefalsefalsefalse")
                this.coinChooseVisible = false;
            }
        },

        // 处理 coin-selector-dialog 外的点击事件
        handleDialogClick(event) {
            // 阻止点击 coin-selector-dialog 区域时冒泡到 document，防止触发 document 的点击事件
            event.stopPropagation();
        },
        closeCoinSelectorDialog() {
            this.coinChooseVisible = false;
        },
        openDialog(position) {
            this.dialogVisible = true;
            this.position = position;
        },
        closeDialog() {
            this.dialogVisible = false;
        },
        findChain(chainName, fromChainData) {
            for (let i = 0; i < fromChainData.supportedChainsAndTokens.length; i++) {
                if (fromChainData.supportedChainsAndTokens[i].name === chainName) {
                    return fromChainData.supportedChainsAndTokens[i];
                }
            }
            return fromChainData.supportedChainsAndTokens[0];
        },
        getChainInfo(fromChainName, toChainName, chainsData) {
            let fromChainData = chainsData.find(chain => chain.name === fromChainName);
            if (!fromChainData) {
                // fromChainName not found in chainsData
                console.error("fromChainName not found in chainsData");
                return null;
            }
            else {
                let chainInfo = this.findChain(toChainName, fromChainData);
                return this.$activeNetworks.find(chain => chain.name === chainInfo.name);
            }
        },
        handleOptionSelected(position, chainInfo) {
            this.dialogVisible = false;
            console.log(chainInfo, this.fromChain)
            if (position === 'from') {
                if (chainInfo.name === this.toChain.name) {
                    this.toChain = this.fromChain;
                }
                this.fromChain = chainInfo;
                this.toChain = this.getChainInfo(this.fromChain.name, this.toChain.name, this.$activeNetworks);
            } else {
                if (chainInfo.name === this.fromChain.name) {
                    this.fromChain = this.toChain;
                }
                this.toChain = chainInfo;
            }
            // console.log("Selected position:", position, chainInfo);
            this.initBridgeBalance()
        },
        changePosition() {
            let temp = this.fromChain;
            this.fromChain = this.toChain;
            this.toChain = temp;
            this.initBridgeBalance()
        },
        validatePositiveNumber(newVal, oldVal) {
            // 使用正则表达式验证输入是否为正数（包括小数）
            const regex = /^\d*\.?\d*$/;
            if (!regex.test(newVal)) {
                // 如果输入不是正数，将值回滚到旧值
                this.amount = oldVal;
            } else {
                // 如果输入是正数，检查整个长度是否超过18位
                if (newVal.length > 18) {
                    // 如果超过18位，将值回滚到旧值
                    this.amount = oldVal;
                } else {
                    newVal = String(newVal)
                    // 检查小数部分的位数是否超过5位
                    const decimalPart = newVal.split('.')[1];
                    if (decimalPart && decimalPart.length > 5) {
                        // 如果小数位数超过5位，将值回滚到旧值
                        this.amount = oldVal;
                    }
                }
            }
        },
        async initEthers(url, chainId) {
            let provider;
            if (chainId === 43851) {
                provider = new JsonRpcProvider(url, chainId, { staticNetwork: true })
            } else {
                provider = new JsonRpcProvider(url, chainId)
            }
            return provider;
        },
        async initBridgeBalance() {
            if (!this.userInfo.address) {
                return;
            }
            this.fromBalance = 0;
            this.toBalance = 0;
            this.isLoadingBalance = true;
            try {
                let providerFrom = await this.initEthers(this.fromChain.rpcUrl, this.fromChain.chainId);
                let providerTo = await this.initEthers(this.toChain.rpcUrl, this.toChain.chainId);
                if (this.coinChoose.name === this.fromChain.currency) {
                    let balance = await providerFrom.getBalance(this.userInfo.address);
                    this.fromBalance = parseFloat(ethers.formatEther(balance)).toFixed(6);
                } else {
                    let contractName = this.coinChoose.name.toLowerCase() + "Contract";
                    console.log("contractName----------", contractName)
                    let erc20ContractAddressFrom = this.fromChain[contractName];
                    console.log("erc20ContractAddressFrom----------", erc20ContractAddressFrom)
                    let contractFrom = new ethers.Contract(erc20ContractAddressFrom, erc20ABI, providerFrom)
                    let balance = await contractFrom.balanceOf(this.userInfo.address);
                    console.log("erc20------balance- from-----------", balance)
                    this.fromBalance = parseFloat(ethers.formatEther(balance)).toFixed(6);
                }
                if (this.coinChoose.name === this.toChain.currency) {
                    let balance = await providerTo.getBalance(this.userInfo.address);
                    this.toBalance = parseFloat(ethers.formatEther(balance)).toFixed(6);
                } else {
                    let contractName = this.coinChoose.name.toLowerCase() + "Contract";
                    console.log("contractName----------", contractName)
                    let erc20ContractAddressTo = this.toChain[contractName];
                    console.log("erc20ContractAddressTo----------", erc20ContractAddressTo)
                    let contractTo = new ethers.Contract(erc20ContractAddressTo, erc20ABI, providerTo)
                    let balance = await contractTo.balanceOf(this.userInfo.address);
                    console.log("erc20------balance---to---------", balance)
                    this.toBalance = parseFloat(ethers.formatEther(balance)).toFixed(6);
                }
            } catch (e) {
                console.error("initBridgeBalance---error ---", e)
            }
            this.isLoadingBalance = false;
        },
        numberToHex(decimalNumber) {

            // 使用 toString 将数字转换为十六进制字符串
            const hexString = decimalNumber.toString(16);

            // console.log('Decimal Number:', decimalNumber);
            // console.log('Hex String:', hexString);
            return "0x" + hexString;
        },
        async switchNet(item) {
            console.log("-------------,ethers.hexlify(item.chainId)", item.chainId, this.numberToHex(item.chainId))
            const { chainId } = useWeb3ModalAccount()
            const { switchNetwork } = useSwitchNetwork();
            try {
                if (chainId && chainId?.value !== item?.chainId) {
                    await switchNetwork?.(item?.chainId)
                    await ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{
                            chainId: this.numberToHex(item.chainId)
                        }],
                    });
                    return
                }
            } catch (switchError) {
                console.log("switch network error:", switchError);
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                    try {
                        await ethereum.request({
                            method: "wallet_addEthereumChain",
                            params: [{
                                chainId: this.numberToHex(item.chainId),
                                chainName: item.name,
                                rpcUrls: [item.rpcUrl] /* ... */,
                                nativeCurrency: {
                                    name: item.currency,
                                    symbol: item.currency, // 2-6 characters long
                                    decimals: 18,
                                },
                                blockExplorerUrls: [item.explorerUrl],
                            },],
                        });
                    } catch (addError) { }
                }
            }
        },

        filterCoinList(fromChain, toChain) {
            let supportedTokensFrom = this.$activeNetworks.find(chain => chain.name === fromChain.name);
            let supportedTokens = supportedTokensFrom.supportedChainsAndTokens.find(chain => chain.name === toChain.name)
            console.log("supportedTokens--------", supportedTokens);
            if (!supportedTokens) {
                // fromChain not found in coinList
                console.error("fromChain not found in coinList");
                return null;
            } else {
                this.coinList = filterCoins(this.allCoinList, supportedTokens.supportedTokens)
                this.coinChoose = this.coinList[0];
            }
            function filterCoins(allCoins, supportedCoins) {
                return allCoins.filter(coin => supportedCoins.includes(coin.name));
            }

        },
    },
    watch: {
        amount(newValue, oldValue) {
            this.validatePositiveNumber(newValue, oldValue);
            // this.bridgeAmount = (this.amount * (1 - this.bridgeFee)).toFixed(5)
            this.bridgeAmount = (Math.floor(this.amount * (1 - this.bridgeFee) * 100000) / 100000).toFixed(5);

        },
        'userInfo': {
            handler(newValue, oldValue) {
                console.log('userInfo changed:', newValue, oldValue);

                if (this.pageIndex === 1) {
                    this.initBridgeBalance();
                }
            },
            deep: true
        },
        pageIndex(newValue) {
            if (newValue === 1) {
                this.initBridgeBalance();
            }
        },
        "fromChain.name": {
            handler: function (newName, oldName) {
                // 当 `fromChain.name` 发生变化时，将会执行这里的代码
                this.filterCoinList(this.fromChain, this.toChain);
            },
        },
        "toChain.name": {
            handler: function (newName, oldName) {
                // 当 `toChain.name` 发生变化时，将会执行这里的代码
                this.filterCoinList(this.toChain, this.fromChain);
            },
        },

    },
    filters: {
        ellipsisFilter(value) {
            // 如果传入的值不是字符串，直接返回
            if (typeof value !== 'string') {
                return value;
            }

            // 截取前四位、后四位
            const startPart = value.slice(0, 4);
            const endPart = value.slice(-4);

            // 使用...拼接中间部分
            const middlePart = '...';

            // 返回拼接后的结果
            return startPart + middlePart + endPart;
        }
    },
    mounted() {


        this.initBridgeBalance();


    },
};
</script>

<style lang="scss" scoped>
.bridge {
    button:disabled {
        cursor: not-allowed
            /* ... */
    }

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

                        input[type="number"]::-webkit-outer-spin-button,
                        input[type="number"]::-webkit-inner-spin-button {
                            -webkit-appearance: none;
                            margin: 0;
                        }

                        input[type="number"] {
                            -moz-appearance: textfield;
                            /* 可选：再加上自己需要的样式 */
                            /* appearance: textfield; */
                            /* 新标准也支持，但兼容性有限 */
                        }

                        input {
                            border: 0;
                            outline: none;
                            background: transparent;
                            color: #FFF;
                            width: 200px;
                            // text-align: center;
                            // font-family: "TT Hoves Pro Trial";
                            font-size: 32px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: normal;
                        }
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
                        cursor: pointer;
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
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        font-size: 12px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: normal;

                        img {
                            width: 20px;
                            animation: rotate 5s linear infinite;
                        }

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

            .submit-btn:disabled {
                cursor: not-allowed
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

            img {
                width:30px;
                animation: rotate 5s linear infinite;
            }

            &:hover {
                background: $primary-hover;
            }
        }
    }
    .modal-btn:disabled {
        cursor: not-allowed;
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
