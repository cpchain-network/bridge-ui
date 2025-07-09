<template>
    <div class="main-box">
        <div class="main-content">
            <div class="bridge-box" v-if="bridgeStep === 1">
                <div class="tab-wrapper">
                    <div class="tab-content">
                        <div :class="['tab-item', pageIndex === 1 ? 'selected' : '']" @click="pageIndex = 1">
                            <span>Bridge</span>
                        </div>
                        <div :class="['tab-item', pageIndex === 2 ? 'selected' : '']" @click="pageIndex = 2">
                            <span>Staking</span>
                        </div>
                        <!-- <div :class="['tab-item', pageIndex === 3 ? 'selected' : ''] "  @click="pageIndex = 3">
                            <span>WithDraw</span>
                        </div> -->
                    </div>
               
                </div>
                <div class="bridge-wrapper" v-if="pageIndex === 1">
                    <div class="token-wrapper">
                        <div class="title">
                            <span>Token</span>
                        </div>
                        <div class="coin-selector-wrapper">
                            <div class="coin-selector" ref="coinSelector" @click="handleCoinSelectorClick">
                                <img :src="require(`@/assets/imgs/coin/${coinChoose.img}`)" alt="" />
                                <span>{{ coinChoose.name }}</span>
                                <i class="iconfont arrow">&#xe652;</i>
                            </div>
                            <div class="coin-selector-dialog" v-if="coinChooseVisible" ref="coinSelectorDialog"
                                @click.stop="handleDialogClick">
                                <div :class="['select-item', item.name === coinChoose.name ? 'selected' : '']"
                                    v-for="(item, index) in coinList" :key="index" @click="chooseCoin(item)">
                                    <img style="border-radius: 100%;" :src="require(`@/assets/imgs/coin/${item.img}`)"
                                        alt="" />
                                    <span>{{ item.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="from-wrapper">
                        <div class="top-wrapper">
                            <div>From</div>
                            <div class="balance-wrapper">
                                <span>
                                    Balance:
                                </span>
                                <img src="@/assets/imgs/bridge/loading-gray.svg" v-if="isLoadingBalance" alt="">
                                <span v-else>
                                    &nbsp;{{ formattedFromBalance }}
                                </span>
                            </div>
                        </div>
                        <div class="bottom-wrapper">
                            <div class="left-wrapper" @click="openDialog('from')">
                                <img :src="require(`@/assets/imgs/chain/${fromChain.img}`)" alt="" />
                                <span>{{ fromChain.name }}</span>
                                <i class="iconfont arrow">&#xe652;</i>
                            </div>
                            <div class="right-wrapper">
                                <input type="number" :placeholder="fromPlaceHolder" v-model="amount" />
                                <div class="max-btn" @click="setMax">Max</div>
                            </div>
                        </div>
                    </div>
                    <div class="swap-icon-wrapper">
                        <i class="iconfont swap-icon" @click="changePosition">&#xe8c6;</i>
                    </div>
                    <div class="to-wrapper">
                        <div class="top-wrapper">
                            <div>To</div>
                            <div class="balance-wrapper">
                                <span>
                                    Balance:
                                </span>
                                <img src="@/assets/imgs/bridge/loading-gray.svg" v-if="isLoadingBalance" alt="">
                                <span v-else>
                                    &nbsp;{{ formattedToBalance }}
                                </span>
                            </div>
                        </div>
                        <div class="bottom-wrapper">
                            <div class="left-wrapper" @click="openDialog('to')">
                                <img :src="require(`@/assets/imgs/chain/${toChain.img}`)" alt="" />
                                <span>{{ toChain.name }}</span>
                                <i class="iconfont arrow">&#xe652;</i>
                            </div>
                            <div class="right-wrapper">
                                <div class="swap-number">{{ bridgeAmount }}</div>
                                <el-tooltip class="tooltip-style" popper-class="testtooltip" effect="light"
                                    :content="feeDesc" placement="left">
                                    <i class="iconfont problem">&#xe600;</i>
                                </el-tooltip>

                            </div>
                        </div>
                    </div>
                    <div :class="['swap-btn-wrapper', !isInsufficient || !isCanConfirm ? 'disabled' : '']"
                        @click="stepMove(2)">
                        <span v-if="!isInsufficient"> INSUFFICIENT FUNDS </span>
                        <span v-else>SEND</span>
                    </div>
                </div>
                <div class="stake-wrapper" v-if="pageIndex === 2">
                    <div class="token-wrapper">
                        <div class="title">
                            <span>Token</span>
                        </div>
                        <div class="coin-selector-wrapper">
                            <div class="coin-selector" ref="coinSelector" @click="handleCoinSelectorClick">
                                <img :src="require(`@/assets/imgs/coin/${coinChoose.img}`)" alt="" />
                                <span>{{ coinChoose.name }}</span>
                                <i class="iconfont arrow">&#xe652;</i>
                            </div>
                            <div class="coin-selector-dialog" v-if="coinChooseVisible" ref="coinSelectorDialog"
                                @click.stop="handleDialogClick">
                                <div :class="['select-item', item.name === coinChoose.name ? 'selected' : '']"
                                    v-for="(item, index) in coinList" :key="index" @click="chooseCoin(item)">
                                    <img :src="require(`@/assets/imgs/coin/${item.img}`)" alt="" />
                                    <span>{{ item.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="from-wrapper">
                        <div class="top-wrapper">
                            <div>From</div>
                            <div class="balance-wrapper">
                                <span>
                                    Balance:
                                </span>
                                <img src="@/assets/imgs/bridge/loading.svg" v-if="isLoadingBalance" alt="">
                                <span v-else>
                                    &nbsp;{{ formattedFromBalance }}
                                </span>
                            </div>
                        </div>
                        <div class="bottom-wrapper">
                            <div class="left-wrapper">
                                <img :src="require(`@/assets/imgs/chain/${stakeChain.img}`)" alt="" />
                                <span>{{ stakeChain.name }}</span>
                            </div>
                            <div class="right-wrapper">
                                <input type="number" :placeholder="fromPlaceHolder" v-model="stakeAmount" />
                                <div class="max-btn" @click="setStakeMax">Max</div>
                            </div>
                        </div>
                    </div>
                    <div class="cal-wrapper">
                        Estimated Earnings ≈ TotolFee / StakeAmount * 0.98
                    </div>
                    <div :class="['stake-btn', !isStakeInsufficient || !isCanStake ? 'disabled' : '']"
                        @click="stakeMethod">
                        <div v-if="!isStakeInsufficient">
                            <span v-if="!isStakeInsufficient"> INSUFFICIENT FUNDS </span>
                        </div>
                        <div v-else class="rotate-loading">
                            <img src="@/assets/imgs/bridge/loading.svg" v-if="isProcessing">
                            <span v-else>STAKE</span>
                        </div>
                    </div>
                </div>
                   <div class="stake-wrapper" v-if="pageIndex === 3">
                <div class="from-wrapper">
                        <div class="top-wrapper">
                            <div>From</div>
                            <div class="balance-wrapper">
                                <span>
                                    Liquidity:&nbsp;$
                                </span>
                                <div style="min-width: 80; min-height: 18;">
                                    <img src="@/assets/imgs/bridge/loading.svg" v-if="isLoadingBalance" alt="">
                                    <span v-else>
                                        {{ this.formatCurrency(Number(stakingPrincipal)) }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="bottom-wrapper">
                            <div class="left-wrapper" >
                                <img :src="require(`@/assets/imgs/chain/${stakeChain.img}`)" alt="" />
                                <span>{{stakeChain.name}}</span>
                            </div>
                            <div class="right-wrapper">
                                Reward: $
                                <div style="min-width: 80; min-height: 18;">
                                    <img src="@/assets/imgs/bridge/loading.svg" v-if="isLoadingBalance" alt="">
                                    <span v-else>
                                        {{ this.formatCurrency(Number(stakingReward)) }}
                                    </span>
                                </div>
                            </div>
                        </div>
                </div>   
                <div class="switch-contain">
                    <el-switch v-model="rewardType"></el-switch>
                    <span class="switch-text">{{ rewardType ? 'Withdraw Total Balance' : 'Withdraw Rewards' }}</span>
                </div>
                <div v-if="this.stakingPrincipal === 0" :class="['stake-btn disabled']" @click="withDraw()">
                    <img src="@/assets/imgs/bridge/loading.svg" v-if="isProcessing">
                    <span v-else>NO STAKING RECORD</span>
                </div> 
                <div v-else-if="this.stakingReward === 0" :class="['stake-btn disabled']" @click="withDraw()">
                    <img src="@/assets/imgs/bridge/loading.svg" v-if="isProcessing">
                    <span v-else>NO REWARDS</span>
                </div> 
                <div v-else-if="this.remainingSeconds" :class="['stake-btn disabled']"><span>WITHDRAW IN:<span>{{ days }}D</span><span>{{ hours }}H</span><span>{{ minutes }}M</span><span>{{ seconds }}S</span></span></div>
                <div v-else :class="['stake-btn']" @click="withDraw()">
                    <img src="@/assets/imgs/bridge/loading.svg" v-if="isProcessing">
                    <span v-else>
                        {{ rewardType ? 'WITHDRAW TOTAL BALANCE' : 'WITHDRAW REWARDS' }}
                    </span>
                </div>
                <!-- <div @click="getReward()">
                    <span>get getReward</span>
                </div>
                <div @click="getPrincipal()">
                    <span>get getPrincipal</span>
                </div>
                <div @click="completePoolAndNew()">
                    <span>completePoolAndNew</span>
                </div> -->
            </div>    
            </div>
            <div class="confirm-box" v-else-if="bridgeStep === 2">
            <div class="comm-box-header" style="margin-bottom: 30px;">
                <img src="@/assets/imgs/bridge/back.svg" alt="" @click="stepMove(1)">
                Confirm
            </div>
            <div class="confirm-item" style="margin-bottom: 22px;">
                <div class="confirm-item-top-group">
                    <div class="item-left">
                        <span class="left-txt">Total Send</span>
                    </div>
                    <div class="item-right">
                        <span class="">{{amount}} {{coinChoose.name}}</span>
                    </div>
                </div>
            </div>
            <div class="confirm-item" style="margin-bottom: 22px;">
                <div class="confirm-item-top-group">
                    <div class="item-left">
                        <span class="left-txt">Received</span><span class=""></span></div>
                    <div class="item-right">
                        <span class="">{{bridgeAmount}} {{coinChoose.name}}</span>
                    </div>
                </div>
            </div>
            <div class="confirm-item" style="margin-bottom: 22px;">
                <div class="confirm-item-top-group">
                    <div class="item-left">
                        <span class="left-txt">Transaction Info</span>
                    </div>
                    <div class="item-right">
                        <!---->
                        &nbsp;
                    </div>
                </div>
                <div class="descBottom">
                    <div style="margin-bottom: 1rem;">
                        <span style="width: 40px; display: inline-block;">
                            Send
                        </span>
                        <span style="margin-left: 0.7rem; margin-right: 0.7rem; color: rgb(223, 46, 45); width: 90px; display: inline-block; text-align: center;">
                            {{amount}} {{coinChoose.name}}
                        </span>
                        To
                        <span class="" style="margin-left: 0.7rem; color: rgb(223, 46, 45); width: 90px; display: inline-block; text-align: center;">
                            {{fromChain.bridgeContract | ellipsisFilter}}
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <div style="margin-bottom: 1rem;"><span style="width: 40px; display: inline-block;"> </span>
                        <span class="" style="margin-left: 0.7rem; margin-right: 0.7rem; color: rgb(223, 46, 45); width: 90px; display: inline-block; text-align: center;">
                            {{fromChain.bridgeContract | ellipsisFilter}}
                        </span>
                        To
                        <span class="" style="margin-left: 0.7rem; color: rgb(223, 46, 45); width: 90px; display: inline-block; text-align: center;">
                            {{userInfo.address | ellipsisFilter}}
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                </div>
                <div :class="['confirm-btn']" @click="bridgeMethod">
                    <div class="confirm-loading">
                        <img src="@/assets/imgs/bridge/loading.svg" v-if="isProcessing" alt="">
                        <span v-else>CONFIRM AND SEND</span>
                    </div>
                </div>
            </div>
        </div>
         
        </div>
   
        <ChainDialog :dialogVisible="dialogVisible" :fromChain="fromChain" :toChain="toChain" :position="position"
            @option-selected="handleOptionSelected" @close-dialog="closeDialog"></ChainDialog>
    </div>
</template>

<script>
import {
    ethers, Network, JsonRpcProvider
} from 'ethers';
import ChainDialog from "@/components/ChainDialog";
import erc20ABI from "@/assets/abi/erc20ABI"
import bridgeABI from "@/assets/abi/bridgeABI"
import {getPriceToken} from '@/api/tokenPrice'

import {
    mapActions,
    mapMutations,
    mapState
} from "vuex";
import { useWeb3ModalAccount, useSwitchNetwork } from '@web3modal/ethers/vue'
export default {
    components: {
        ChainDialog,
    },
    data() {
        return {
            feeDesc: `Sender pays a 0.001% \n\n trading fee for each transfer`,
            bridgeFee: 0.0001,
            amount: null,
            stakeAmount: null,
            bridgeAmount: 0, //bridge after amount
            fromBalance: 0,
            toBalance: 0,
            dialogVisible: false,
            coinChooseVisible: false,
            selectedOption: null,
            isLoadingBalance: false,
            position: '',
            bridgeStep: 1,
            pageIndex: 1,
            stakeChain: this.$activeNetworks[0],
            fromChain: this.$activeNetworks[0],
            toChain: this.$activeNetworks[1],
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
                minBridgeAmount: 0.001
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
    // 存放方法事件 - 会在数据变化时被调用
    methods: {
        async stakeMethod() {
            console.log(this.currentNetwork, this.stakeChain)
            if (!this.currentNetwork || this.currentNetwork.chainId !== this.stakeChain.chainId) {
                const { chainId } = useWeb3ModalAccount()
                if (chainId && chainId?.value !== this.fromChain?.chainId) {
                    await this.switchNet(this.fromChain)
                    return
                }
            }
            if (this.isProcessing) {
                return;
            }
            if (this.coinChoose.name === 'ETH') {
                await this.stakeEth()
            } else {
                await this.stakeErc20()
            }
        },
        async stakeEth() {
            this.isProcessing = true;
            try {
                const valueInWei = ethers.parseEther(this.stakeAmount.toString());
                // console.log("valueInWei-----------", valueInWei)
                let signer = await this.provider.getSigner()
                console.log(357, signer);
                let bridgeContract = new ethers.Contract(this.stakeChain.bridgeContract, bridgeABI, signer)
                // console.log('bridgeContract.BridgeInitiateETH------', bridgeContract.BridgeInitiateETH)
                let tx = await bridgeContract.DepositAndStakingETH.send({
                    value: valueInWei // 添加这一行，指定发送的以太币数量
                })
                console.log(329, tx);
                let receipt = await tx.wait()
                // console.log(receipt)
                if (receipt.status === 1) {
                    this.$router.push({ path: "history", query: { type: 2 } })
                } else {
                    this.$toast.error("Bridge failed")
                }
            } catch (error) {
                this.isProcessing = false;
                console.log("stakeEth ---- error -- ", error)
                if (error.info?.error?.code === 4001) {
                    this.$toast.error("User rejected the request.")
                    return;
                }
            }
            this.isProcessing = false;
        },
        async stakeErc20() {
            this.isProcessing = true;
            try {
                const valueInWei = ethers.parseEther(this.stakeAmount.toString());
                // console.log("valueInWei-----------", valueInWei)
                let signer = await this.provider.getSigner()
                let bridgeContract = new ethers.Contract(this.stakeChain.bridgeContract, bridgeABI, signer)
                let contractName = this.coinChoose.name.toLowerCase() + "Contract";
                let tokenContract = new ethers.Contract(this.stakeChain[contractName], erc20ABI, signer)
                let approveAmount = await tokenContract.allowance(this.userInfo.address, this.stakeChain.bridgeContract)
                if (approveAmount <= this.stakeAmount) {
                    let approveTx = await tokenContract.approve(this.stakeChain.bridgeContract, valueInWei)
                    let receipt = await approveTx.wait()
                    if (receipt.status === 0) {
                        this.$toast.error("Approve failed.")
                        this.isProcessing = false;
                        return;
                    }
                }
                let tx = null;
                // console.log(this.stakeChain.chainId, this.toChain.chainId, this.userInfo.address, this.stakeChain[contractName], valueInWei)
                if (this.coinChoose.name === "WETH") {
                    tx = await bridgeContract.DepositAndStakingWETH.send(valueInWei)
                } else {
                    tx = await bridgeContract.DepositAndStakingERC20.send(this.stakeChain[contractName], valueInWei)
                }
                let receipt = await tx.wait()
                console.log(receipt)
                if (receipt.status === 1) {
                    this.$router.push({ path: "history", query: { type: 2 } })
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
                    this.$router.push({ path: "history", query: { type: 1 } })
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
                    this.$router.push({ path: "history", query: { type: 1 } })
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
        async isCanWithdraw(bridgeContract, users) {
            let canWithdraw = false;  // 创建一个标记，初始状态设置为false
            this.remainingSeconds = 0;
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                // 质押记录如果已经提现（isWithdrawed=true），跳过
                if (user.isWithdrawed) {
                    canWithdraw = false;
                    continue;
                } 
                canWithdraw = true;  // 将标记设置为true，如果有用户满足提取条件
                // 获取用户质押的奖池
                const pool = await bridgeContract.getPool(user.token, user.StartPoolId);
                // 检查提取时间是否已到(当前时间大于池子的endTimestamp)
                const currentTime = Math.floor(Date.now() / 1000);
                console.log('currentTime', currentTime, pool, user.StartPoolId, pool);
                if (currentTime > pool.endTimestamp) {
                    break;  // 提前终止循环，因为你只需要一个用户满足提取条件
                } else {
                    this.remainingSeconds = Number(pool.endTimestamp) - currentTime;  // 计算剩余的秒数
                    break;  // 提前终止循环，因为你只需要一个用户满足提取条件
                }
            }
            return canWithdraw
        },
        async withDraw() {
            this.isProcessing = true;
            let signer = await this.provider.getSigner()
            let bridgeContract = new ethers.Contract(this.stakeChain.bridgeContract, bridgeABI, signer)
            const users = await bridgeContract.getUser(signer.address)
            const canWithdraw = await this.isCanWithdraw(bridgeContract, users);
            if(canWithdraw && this.remainingSeconds) {
                // this.$toast.error(`未到达提取时间`)
                this.startCountdown(this.remainingSeconds);
            }
            else if (!canWithdraw) {
                // this.$toast.error(`没有可以提取的质押`)
                this.isProcessing = false;
                return
            }
            try {
                let tx
                if (this.rewardType) {
                    tx = await bridgeContract.WithdrawAll().catch(err => {
                        console.log("withDraw ---- error -- ", err.message)
                        if (err) {
                            this.$toast.error(err.message)
                            return;
                        }
                    })
                } else {
                    tx = await bridgeContract.ClaimAllReward().catch(err => {
                        console.log("withDraw ---- error -- ", err.message)
                        if (err) {
                            this.$toast.error(err.message)
                            return;
                        }
                    })
                }
           
                let receipt = await tx.wait()
                if(receipt.status === 1){
                    this.$router.push({path:"history",query:{type:3}})
                }else{
                    this.$toast.error("Withdraw failed")
                }
                console.log(receipt)
            } catch (error) {
                console.log("withDraw ---- error -- ", error)
                this.isProcessing = false;
                if (error) {
                    this.$toast.error(error)
                    return;
                }
            }    
        },
        async completePoolAndNew () {
            let signer = await this.provider.getSigner()
            let bridgeContract = new ethers.Contract(this.stakeChain.bridgeContract, bridgeABI, signer)
            const users = await bridgeContract.getUser(signer.address)
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                const poolLength = await bridgeContract.getPoolLength(user.token)
                const pool = await bridgeContract.getPool(user.token, Number(poolLength)-1);
                for (let index = Number(poolLength) -4; index < poolLength; index++) {
                    const pool = await bridgeContract.getPool(user.token, index);
                    // console.log(627,index, this.$moment(Number(pool.startTimestamp) * 1000).format("YYYY/MM/DD HH:mm:ss"), pool);
                }
                const pools = [
                   {
                     startTimestamp: pool.startTimestamp,
                     endTimestamp: pool.endTimestamp,
                     token: pool.token,
                     TotalAmount: BigInt(1100000000000000000),
                     TotalFee: BigInt(10000000000000000),
                     TotalFeeClaimed: BigInt(9999999999999999),
                     IsCompleted: true
                   },
                ];
                await bridgeContract.CompletePoolAndNew(pools)
                console.log(617,Number(poolLength)-1, this.$moment(Number(pool.startTimestamp) * 1000).format("YYYY/MM/DD HH:mm:ss"));
            } 
        },
        async getReward() {
            this.isLoadingBalance = true
            let signer = await this.provider.getSigner()
            let bridgeContract = new ethers.Contract(this.stakeChain.bridgeContract, bridgeABI, signer)
            const rewardAmount = await bridgeContract.getReward()
            const stakingRewardAmount = await this.getTokenAmountFromRes(this.stakeChain.nativeTokenContract, rewardAmount)
            this.stakingReward = parseFloat(ethers.formatEther(stakingRewardAmount)).toFixed(6)
            this.isLoadingBalance = false
        },
        async getPrincipal() {
            this.isLoadingBalance = true
            let signer = await this.provider.getSigner()
            let bridgeContract = new ethers.Contract(this.stakeChain.bridgeContract, bridgeABI, signer)
            const stakingAmount = await bridgeContract.getPrincipal()
            const stakingRewardAmount = await this.getTokenAmountFromRes(this.stakeChain.nativeTokenContract, stakingAmount)
            this.stakingPrincipal = parseFloat(ethers.formatEther(stakingRewardAmount)).toFixed(6)
            this.isLoadingBalance = false
        },
        async getTokenAmountFromRes(tokenAddress, stakingAmount) {
            const entry = stakingAmount.find(subArray =>
              subArray.some(element =>
                typeof element === 'string' && element.toLowerCase() === tokenAddress.toLowerCase()
              )
            );

            if (entry && entry.length > 1) {
              return entry[1]; // 返回找到的子数组中的第二个元素
            } else {
              console.log('没有找到对应的地址。');
              return null; // 如果没有找到或者子数组长度不足，返回 null
            }
        },
        async getTokenPrice() {
            const wethAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
            const priceType = 'usd';
            return getPriceToken(wethAddress, priceType).then(res => {
                if (res.data) {
                    return res.data[wethAddress][priceType];
                }
                return 0
            }).catch(err => {
                console.error(err);
                return 0
            })
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
            } else {
                this.initStakeBalance();
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
                if(this.coinChoose.name === this.toChain.currency){
                    let balance = await providerTo.getBalance(this.userInfo.address);
                    this.toBalance = parseFloat(ethers.formatEther(balance)).toFixed(6);
                }else {
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
        async initStakeBalance() {
            if (!this.userInfo.address) {
                return;
            }
            this.fromBalance = 0;
            this.isLoadingBalance = true;
            try {
                let providerFrom = await this.initEthers(this.stakeChain.rpcUrl, this.stakeChain.chainId);
                if (this.coinChoose.name === "ETH") {
                    let balance = await providerFrom.getBalance(this.userInfo.address);
                    this.fromBalance = parseFloat(ethers.formatEther(balance)).toFixed(6);
                    console.log("this.fromBalance------------", this.fromBalance)
                } else {
                    let contractName = this.coinChoose.name.toLowerCase() + "Contract";
                    console.log("contractName----------", contractName)
                    let erc20ContractAddressFrom = this.stakeChain[contractName];
                    console.log("erc20ContractAddressFrom----------", erc20ContractAddressFrom)
                    let contractFrom = new ethers.Contract(erc20ContractAddressFrom, erc20ABI, providerFrom)
                    let balance = await contractFrom.balanceOf(this.userInfo.address);
                    console.log("erc20------balance- from-----------", balance)
                    this.fromBalance = parseFloat(ethers.formatEther(balance)).toFixed(6);
                }
            } catch (e) {
                console.error("initStakeBalance---error ---", e)
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
        startCountdown: function(remainingSeconds) {
          this.timer = setInterval(() => {
            if (remainingSeconds > 0) {
              remainingSeconds--;
            
              let tempSeconds = remainingSeconds;  // 创建一个新的临时变量来执行减法
            
              this.days = Math.floor(tempSeconds / (3600*24));
              tempSeconds -= this.days * 3600 * 24;
            
              this.hours = Math.floor(tempSeconds / 3600);
              tempSeconds -= this.hours * 3600;
            
              this.minutes = Math.floor(tempSeconds / 60);
              tempSeconds -= this.minutes * 60;
            
              this.seconds = tempSeconds;
            } else {
              // 时间一到，清除定时器，并可以在这里加入提示信息的代码
              clearInterval(this.timer);
            }
          }, 1000);
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
                this.getPrincipal()
                this.getReward()
                if (this.pageIndex === 1) {
                    this.initBridgeBalance();
                } else {
                    this.initStakeBalance();
                }
            },
            deep: true
        },
        pageIndex(newValue) {
            if (newValue === 1) {
                this.initBridgeBalance();
            } else {
                this.initStakeBalance();
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
    computed: {
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
    beforeDestroy() {
        document.removeEventListener('click', this.handleDocumentClick);
        clearInterval(this.timer);
    },
    // 生命周期 - 创建完成（访问当前this实例）
    created() { },
    // 生命周期 - 挂载完成（访问DOM元素）
    mounted() {
        document.addEventListener('click', this.handleDocumentClick);
        if (this.pageIndex === 1) {
            this.initBridgeBalance();
            this.getPrincipal()
            this.getReward()
        }else{
            this.filterCoinList(this.fromChain, this.toChain);
            this.initStakeBalance();
        }
    },
}
</script>

<style lang="scss" scoped>
.main-box {
    width: 100%;
    min-height: 100%;
    min-width: 375px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    // padding: 0 20px;
    margin-top: 80px;

    .main-content {
        height: 100%;
        margin: 0 20px;
        padding-top: 24px;

        .bridge-box {

            .tab-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 24px;
                margin-top: 0;

                .tab-content {
                    display: flex;
                    background: #fff;
                    width: 229px;
                    height: 40px;
                    border-radius: 40px;

                    .tab-item {
                        display: inline-block;
                        width: 50%;
                        text-align: center;
                        font-weight: 700;
                        font-size: 16px;
                        height: 100%;
                        line-height: 40px;
                        border-radius: 40px;
                        cursor: pointer;
                    }

                    .selected {
                        background: $global-color;
                        box-shadow: inset 0 -6px 0 rgba(0, 0, 0, 0.16);

                        span {
                            color: #fff;
                        }
                    }
                }
            }

            .bridge-wrapper {
                box-sizing: border-box;
                width: 480px;
                background-color: #fff;
                border-radius: 20px;
                padding: 24px 20px;

                .token-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .title {
                        font-weight: 700;
                        font-size: 20px;
                        line-height: 20px;
                        margin-right: 10px;
                    }

                    .coin-selector-wrapper {
                        position: relative;

                        .coin-selector {
                            border-radius: 12px;
                            width: 101px;
                            height: 40px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            position: relative;
                            background: #f5f5f5;
                            color: #333;

                            img {
                                width: 24px;
                                height: 24px;
                            }

                            span {
                                margin: 0 4px;
                                font-weight: 700;
                                font-size: 16px;
                                line-height: 24px;
                            }

                            .arrow {
                                font-size: 20px;
                                color: rgba(51, 51, 51, 0.4);
                            }
                        }

                        .coin-selector-dialog {
                            position: absolute;
                            right: 0;
                            top: 40px;
                            border-radius: 12px;
                            min-width: 200px;
                            padding: 10px 0;
                            z-index: 100;
                            background: #fff;
                            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.16);
                        }

                        .select-item {
                            height: 40px;
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                            padding-left: 18px;
                            font-weight: 700;
                            font-size: 16px;
                            line-height: 24px;

                            img {
                                width: 20px;
                                height: 20px;
                                margin-right: 4px;
                            }

                            &:hover {
                                background-color: #f5f5f5;
                            }
                        }

                        .selected {
                            background-color: #f5f5f5;
                        }
                    }
                }

                .from-wrapper,
                .to-wrapper {
                    margin-top: 20px;
                    height: 96px;
                    border-radius: 20px;
                    position: relative;
                    padding: 20px;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 20px;
                    background: #f5f5f5;
                    color: rgba(51, 51, 51, 0.8);
                    box-sizing: border-box;

                    .top-wrapper {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-family: Inter Regular;
                        color: rgba(51, 51, 51, .8);

                        .balance-wrapper {
                            display: flex;
                            align-items: center;

                            img {
                                width: 20px;
                                animation: rotate 5s linear infinite;
                            }
                        }
                    }

                    .bottom-wrapper {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 12px;
                        align-items: center;

                        .left-wrapper {
                            border-radius: 12px;
                            // width: 101px;
                            height: 40px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            position: relative;

                            img {
                                width: 24px;
                                height: 24px;
                            }

                            span {
                                margin: 0 4px;
                                font-weight: 700;
                                font-size: 16px;
                                line-height: 24px;
                                color: rgba(51, 51, 51, 0.8);
                                white-space: nowrap;
                            }

                            .arrow {
                                font-size: 20px;
                                color: rgba(51, 51, 51, 0.4);
                            }
                        }

                        .right-wrapper {
                            display: flex;
                            align-items: center;

                            input {
                                width: 100%;
                                text-align: right;
                                border: 0;
                                outline: 0;
                                -webkit-appearance: none;
                                -moz-appearance: none;
                                appearance: none;
                                background-color: transparent;
                                transition: all 0.2s ease 0s;
                                color: rgba(51, 51, 51, 0.8);
                                font-weight: 700;
                                font-size: 16px;
                                line-height: 24px;
                            }

                            .max-btn {
                                font-weight: 400;
                                font-size: 14px;
                                line-height: 20px;
                                cursor: pointer;
                                border: none;
                                background: transparent;
                                text-align: right;
                                padding: 0;
                                margin-left: 8px;
                                font-family: Inter Regular;
                            }

                            // .item {
                            //     margin: 20px;
                            // }
                        }
                    }
                }

                .swap-icon-wrapper {
                    display: flex;
                    justify-content: center;
                    margin-top: 10px;

                    .swap-icon {
                        font-size: 36px;
                        color: $global-color;
                        cursor: pointer;
                    }
                }
            }

            .stake-wrapper {
                box-sizing: border-box;
                width: 480px;
                background-color: #fff;
                border-radius: 20px;
                padding: 24px 20px;

                .token-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .title {
                        font-weight: 700;
                        font-size: 20px;
                        line-height: 20px;
                        margin-right: 10px;
                    }

                    .coin-selector-wrapper {
                        position: relative;

                        .coin-selector {
                            border-radius: 12px;
                            width: 101px;
                            height: 40px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            position: relative;
                            background: #f5f5f5;
                            color: #333;

                            img {
                                width: 24px;
                                height: 24px;
                            }

                            span {
                                margin: 0 4px;
                                font-weight: 700;
                                font-size: 16px;
                                line-height: 24px;
                            }

                            .arrow {
                                font-size: 20px;
                                color: rgba(51, 51, 51, 0.4);
                            }
                        }

                        .coin-selector-dialog {
                            position: absolute;
                            right: 0;
                            top: 40px;
                            border-radius: 12px;
                            min-width: 200px;
                            padding: 10px 0;
                            z-index: 100;
                            background: #fff;
                            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.16);
                        }

                        .select-item {
                            height: 40px;
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                            padding-left: 18px;
                            font-weight: 700;
                            font-size: 16px;
                            line-height: 24px;

                            img {
                                width: 20px;
                                height: 20px;
                                margin-right: 4px;
                            }

                            &:hover {
                                background-color: #f5f5f5;
                            }
                        }

                        .selected {
                            background-color: #f5f5f5;
                        }
                    }
                }

                .from-wrapper,
                .to-wrapper {
                    margin-top: 20px;
                    height: 96px;
                    border-radius: 20px;
                    position: relative;
                    padding: 20px;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 20px;
                    background: #f5f5f5;
                    color: rgba(51, 51, 51, 0.8);
                    box-sizing: border-box;

                    .top-wrapper {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-family: Inter Regular;
                        color: rgba(51, 51, 51, .8);

                        .balance-wrapper {
                            display: flex;
                            align-items: center;

                            img {
                                width: 20px;
                                animation: rotate 5s linear infinite;
                            }
                        }
                    }

                    .bottom-wrapper {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 12px;
                        align-items: center;

                        .left-wrapper {
                            border-radius: 12px;
                            // width: 101px;
                            height: 40px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;
                            position: relative;

                            img {
                                width: 24px;
                                height: 24px;
                            }

                            span {
                                margin: 0 4px;
                                font-weight: 700;
                                font-size: 16px;
                                line-height: 24px;
                                color: rgba(51, 51, 51, 0.8);
                                white-space: nowrap;
                            }

                            .arrow {
                                font-size: 20px;
                                color: rgba(51, 51, 51, 0.4);
                            }
                        }

                        .right-wrapper {
                            display: flex;
                            align-items: center;

                            input {
                                width: 100%;
                                text-align: right;
                                border: 0;
                                outline: 0;
                                -webkit-appearance: none;
                                -moz-appearance: none;
                                appearance: none;
                                background-color: transparent;
                                transition: all 0.2s ease 0s;
                                color: rgba(51, 51, 51, 0.8);
                                font-weight: 700;
                                font-size: 16px;
                                line-height: 24px;
                            }

                            .max-btn {
                                font-weight: 400;
                                font-size: 14px;
                                line-height: 20px;
                                cursor: pointer;
                                border: none;
                                background: transparent;
                                text-align: right;
                                padding: 0;
                                margin-left: 8px;
                                font-family: Inter Regular;
                            }

                            // .item {
                            //     margin: 20px;
                            // }
                        }
                    }
                }

                .cal-wrapper {
                    font-family: Inter Regular;
                    border-radius: 20px;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 20px;
                    margin-top: 10px;
                    color: rgba(51, 51, 51, 0.8);
                    // margin: 20px 0;
                }

                .stake-btn {
                    width: 100%;
                    border-radius: 40px;
                    margin-top: 32px;
                    display: inline-block;
                    line-height: 34px;
                    margin-bottom: 20px;
                    background-color: $global-color;
                    box-shadow: inset 0 -6px 0 rgba(0, 0, 0, 0.16);
                    border-radius: 20px;
                    padding: 8px 24px;
                    text-align: center;
                    box-sizing: border-box;
                    cursor: pointer;

                    span {
                        letter-spacing: 0.15rem;
                        font-weight: 700;
                        // font-size: 1.6rem;
                        color: #fff;
                        font-weight: 700;
                        font-size: 16px;
                    }

                    &:active {
                        box-shadow: inset 0 -8px 0 rgba(0, 0, 0, 0.16);
                    }

                    &:hover {
                        background: $global-bg-color;
                    }

                    .rotate-loading {
                        height: 100%;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        img {
                            animation: rotate 5s linear infinite;
                        }
                    }
                }
                .switch-contain {
                    padding-top: 16px;
                    padding-bottom: 16px;
                    padding-left: 2px;
                }
                .switch-text {
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 20px;
                    margin-top: 10px;
                    color: rgba(51, 51, 51, 0.8);
                    margin-left: 12px;
                }
            }

            .to-wrapper {
                margin-top: 10px !important;

                .bottom-wrapper {
                    .right-wrapper {
                        .swap-number {
                            font-weight: 700;
                            font-size: 16px;
                            line-height: 24px;
                            color: rgba(51, 51, 51, 0.8);
                            margin-right: 5px;
                        }

                        .problem {
                            color: rgba(51, 51, 51, 0.8);
                            cursor: default;
                        }

                    }
                }
            }

            .swap-btn-wrapper {
                width: 100%;
                border-radius: 40px;
                margin-top: 32px;
                height: 50px;
                display: inline-block;
                line-height: 34px;
                margin-bottom: 20px;
                background-color: $global-color;
                box-shadow: inset 0 -6px 0 rgba(0, 0, 0, 0.16);
                border-radius: 20px;
                padding: 8px 24px;
                text-align: center;
                box-sizing: border-box;
                cursor: pointer;

                span {
                    letter-spacing: 0.15rem;
                    font-weight: 700;
                    // font-size: 1.6rem;
                    color: #fff;
                    font-weight: 700;
                    font-size: 16px;
                }

                &:active {
                    box-shadow: inset 0 -8px 0 rgba(0, 0, 0, 0.16);
                }

                &:hover {
                    background: $global-bg-color;
                }
            }
        }

        .confirm-box {
            box-sizing: border-box;
            width: 480px;
            background-color: #fff;
            font-family: Inter Regular;
            border-radius: 20px;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;

            .comm-box-header {
                img {
                    width: 20px;
                    height: 20px;
                    float: left;
                    cursor: pointer;
                    margin-top: 20px;
                }

                height: 60px;
                line-height: 60px;
                padding: 0 25px;
                text-align: center;
                overflow: hidden;
                font-weight: 700;
                font-size: 16px;
                font-family: Inter Bold;
                color: #333;
            }

            .confirm-item {
                margin: 22px 0 0;
                padding: 0 30px;

                .confirm-item-top-group {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .item-left {
                        display: flex;
                        align-items: center;

                        .left-txt {
                            margin: 0 10px 0 8px;
                            font-family: Inter Regular;
                            border-radius: 20px;
                            font-weight: 400;
                            font-size: 14px;
                            line-height: 20px;
                        }
                    }

                    .item-right {
                        flex: 1;
                        display: flex;
                        justify-content: flex-end;
                        align-content: center;
                        line-height: 24px;
                        text-align: right;

                        span {
                            font-weight: 400;
                            font-size: 14px;
                            color: rgba(51, 51, 51, .4);
                        }
                    }
                }

                .descBottom {
                    max-height: 9.2rem;
                    text-align: center;
                    clear: both;
                    padding-top: 20px;
                }
            }

            .confirm-btn {
                width: 100%;
                border-radius: 40px;
                margin-top: 32px;
                height: 50px;
                display: inline-block;
                line-height: 34px;
                margin-bottom: 20px;
                background-color: $global-color;
                box-shadow: inset 0 -6px 0 rgba(0, 0, 0, 0.16);
                border-radius: 20px;
                padding: 8px 24px;
                text-align: center;
                box-sizing: border-box;
                cursor: pointer;

                span {
                    letter-spacing: 0.15rem;
                    font-weight: 700;
                    // font-size: 1.6rem;
                    color: #fff;
                    font-weight: 700;
                    font-size: 16px;
                }

                &:active {
                    box-shadow: inset 0 -8px 0 rgba(0, 0, 0, 0.16);
                }

                &:hover {
                    background: $global-bg-color;
                }

                .confirm-loading {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        animation: rotate 5s linear infinite;
                    }
                }
            }
        }


    }

    @media only screen and (max-width: 520px) {
        .main-content {
            .bridge-box {

                .bridge-wrapper,
                .stake-wrapper {
                    width: 100%;
                    max-width: 350px;

                    .to-wrapper {
                        .bottom-wrapper {
                            .right-wrapper {
                                .swap-number {
                                    width: 65px;
                                    overflow: hidden;
                                    text-align: right;
                                }
                            }
                        }
                    }
                }
            }

            .confirm-box {
                width: 100%;
            }

            // padding: 0 20px;
        }
    }

}
</style>
