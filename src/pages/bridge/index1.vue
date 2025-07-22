<template>
  <div class="main-box">
    <div class="main-content">
      <div class="bridge-box" v-if="bridgeStep === 1">
        <div class="tab-wrapper">
          <div class="tab-content">
            <div :class="['tab-item', 'selected']">
              <span>Bridge</span>
            </div>
          </div>
        </div>
        <div class="bridge-wrapper">
          <div class="token-wrapper">
            <div class="title"><span>Token</span></div>
            <div class="coin-selector-wrapper">
              <div class="coin-selector" ref="coinSelector" @click="handleCoinSelectorClick">
                <img :src="require(`@/assets/imgs/coin/${coinChoose.img}`)" alt="" />
                <span>{{ coinChoose.name }}</span>
                <i class="iconfont arrow">&#xe652;</i>
              </div>
              <div
                  class="coin-selector-dialog"
                  v-if="coinChooseVisible"
                  ref="coinSelectorDialog"
                  @click.stop="handleDialogClick"
              >
                <div
                    :class="['select-item', item.name === coinChoose.name ? 'selected' : '']"
                    v-for="(item, index) in coinList"
                    :key="index"
                    @click="chooseCoin(item)"
                >
                  <img style="border-radius: 100%;" :src="require(`@/assets/imgs/coin/${item.img}`)" alt="" />
                  <span>{{ item.name }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="from-wrapper">
            <div class="top-wrapper">
              <div>From</div>
              <div class="balance-wrapper">
                <span>Balance:</span>
                <img src="@/assets/imgs/bridge/loading-gray.svg" v-if="isLoadingBalance" alt="">
                <span v-else>&nbsp;{{ formattedFromBalance }}</span>
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
                <span>Balance:</span>
                <img src="@/assets/imgs/bridge/loading-gray.svg" v-if="isLoadingBalance" alt="">
                <span v-else>&nbsp;{{ formattedToBalance }}</span>
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
      </div>
      <div class="confirm-box" v-else-if="bridgeStep === 2">
        <div class="comm-box-header" style="margin-bottom: 30px;">
          <img src="@/assets/imgs/bridge/back.svg" alt="" @click="stepMove(1)">
          Confirm
        </div>
        <div class="confirm-item" style="margin-bottom: 22px;">
          <div class="confirm-item-top-group">
            <div class="item-left"><span class="left-txt">Total Send</span></div>
            <div class="item-right"><span class="">{{amount}} {{coinChoose.name}}</span></div>
          </div>
        </div>
        <div class="confirm-item" style="margin-bottom: 22px;">
          <div class="confirm-item-top-group">
            <div class="item-left"><span class="left-txt">Received</span></div>
            <div class="item-right"><span class="">{{bridgeAmount}} {{coinChoose.name}}</span></div>
          </div>
        </div>
        <div class="confirm-item" style="margin-bottom: 22px;">
          <div class="confirm-item-top-group">
            <div class="item-left"><span class="left-txt">Transaction Info</span></div>
            <div class="item-right">&nbsp;</div>
          </div>
          <div class="descBottom">
            <div style="margin-bottom: 1rem;">
              <span style="width: 40px; display: inline-block;">Send</span>
              <span style="margin-left: 0.7rem; margin-right: 0.7rem; color: rgb(223, 46, 45); width: 90px; display: inline-block; text-align: center;">
                  {{amount}} {{coinChoose.name}}
                </span>
              To
              <span class="" style="margin-left: 0.7rem; color: rgb(223, 46, 45); width: 90px; display: inline-block; text-align: center;">
                  {{fromChain.bridgeContract | ellipsisFilter}}
                </span>
            </div>
            <div style="margin-bottom: 1rem;">
              <span style="width: 40px; display: inline-block;"> </span>
              <span class="" style="margin-left: 0.7rem; margin-right: 0.7rem; color: rgb(223, 46, 45); width: 90px; display: inline-block; text-align: center;">
                  {{fromChain.bridgeContract | ellipsisFilter}}
                </span>
              To
              <span class="" style="margin-left: 0.7rem; color: rgb(223, 46, 45); width: 90px; display: inline-block; text-align: center;">
                  {{userInfo.address | ellipsisFilter}}
                </span>
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
      <ChainDialog
          :dialogVisible="dialogVisible"
          :fromChain="fromChain"
          :toChain="toChain"
          :position="position"
          @option-selected="handleOptionSelected"
          @close-dialog="closeDialog"
      />
    </div>
  </div>
</template>

<script>
// ... import 保持原样
import { ethers, JsonRpcProvider } from 'ethers';
import ChainDialog from "@/components/ChainDialog";
import erc20ABI from "@/assets/abi/erc20ABI";
import bridgeABI from "@/assets/abi/bridgeABI";
import { mapState } from "vuex";
import { useWeb3ModalAccount, useSwitchNetwork } from '@web3modal/ethers/vue';

export default {
  components: { ChainDialog },
  data() {
    return {
      feeDesc: `Sender pays a 0.001% \n\n trading fee for each transfer`,
      bridgeFee: 0.0001,
      amount: null,
      bridgeAmount: 0,
      fromBalance: 0,
      toBalance: 0,
      dialogVisible: false,
      coinChooseVisible: false,
      isLoadingBalance: false,
      position: '',
      bridgeStep: 1,
      fromChain: this.$activeNetworks[0],
      toChain: this.$activeNetworks[1],
      isProcessing: false,
      coinChoose: {
        img: "eth.svg",
        name: "ETH",
        minBridgeAmount: 0.001
      },
      allCoinList: [
        { img: "eth.svg", name: "ETH", minBridgeAmount: 0.001 },
        { img: "usdt.svg", name: "USDT", minBridgeAmount: 0.001 },
        { img: "usdc.svg", name: "USDC", minBridgeAmount: 0.001 },
        { img: "dai.png", name: "DAI", minBridgeAmount: 0.001 },
        { img: "eth.svg", name: "WETH", minBridgeAmount: 0.1 },
        { img: "okb.png", name: "OKB", minBridgeAmount: 0.001 }
      ],
      coinList: [
        { img: "eth.svg", name: "ETH", minBridgeAmount: 0.001 },
        { img: "usdt.svg", name: "USDT", minBridgeAmount: 0.001 },
        { img: "usdc.svg", name: "USDC", minBridgeAmount: 0.001 },
        { img: "dai.png", name: "DAI", minBridgeAmount: 0.001 },
        { img: "eth.svg", name: "WETH", minBridgeAmount: 0.001 },
        { img: "okb.png", name: "OKB", minBridgeAmount: 0.001 }
      ],
    };
  },
  methods: {
    handleCoinSelectorClick() {
      this.coinChooseVisible = !this.coinChooseVisible;
    },
    handleDialogClick(event) {
      event.stopPropagation();
    },
    chooseCoin(item) {
      this.coinChoose = item;
      this.coinChooseVisible = false;
      this.initBridgeBalance();
    },
    openDialog(position) {
      this.dialogVisible = true;
      this.position = position;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
    setMax() {
      this.amount = this.fromBalance;
    },
    changePosition() {
      let temp = this.fromChain;
      this.fromChain = this.toChain;
      this.toChain = temp;
      this.initBridgeBalance();
    },
    handleOptionSelected(position, chainInfo) {
      this.dialogVisible = false;
      if (position === 'from') {
        if (chainInfo.name === this.toChain.name) this.toChain = this.fromChain;
        this.fromChain = chainInfo;
        // 这里补充 getChainInfo 逻辑
      } else {
        if (chainInfo.name === this.fromChain.name) this.fromChain = this.toChain;
        this.toChain = chainInfo;
      }
      this.initBridgeBalance();
    },
    async stepMove(step) {
      const { chainId } = useWeb3ModalAccount();
      if (chainId && chainId?.value !== this.fromChain?.chainId) {
        await this.switchNet(this.fromChain);
        return;
      }
      this.bridgeStep = step;
    },
    async bridgeMethod() {
      if (this.isProcessing) return;
      if (this.coinChoose.name === this.fromChain.currency) {
        await this.bridgeEth();
      } else {
        await this.bridgeErc20();
      }
    },
    async bridgeEth() {
      this.isProcessing = true;
      try {
        const valueInWei = ethers.parseEther(this.amount.toString());
        let signer = await this.provider.getSigner();
        let bridgeContract = new ethers.Contract(this.fromChain.bridgeContract, bridgeABI, signer);
        let tx = await bridgeContract.BridgeInitiateETH.send(this.fromChain.chainId, this.toChain.chainId, this.userInfo.address, {
          value: valueInWei
        });
        let receipt = await tx.wait();
        if (receipt.status === 1) {
          this.$router.push({ path: "history", query: { type: 1 } });
        } else {
          this.$toast.error("Bridge failed");
        }
      } catch (error) {
        this.isProcessing = false;
        if (error.info?.error?.code === 4001) {
          this.$toast.error("User rejected the request.");
        }
      }
      this.isProcessing = false;
    },
    async bridgeErc20() {
      this.isProcessing = true;
      try {
        const valueInWei = ethers.parseEther(this.amount.toString());
        let signer = await this.provider.getSigner();
        let bridgeContract = new ethers.Contract(this.fromChain.bridgeContract, bridgeABI, signer);
        let contractName = this.coinChoose.name.toLowerCase() + "Contract";
        let tokenContract = new ethers.Contract(this.fromChain[contractName], erc20ABI, signer);
        let approveAmount = await tokenContract.allowance(this.userInfo.address, this.fromChain.bridgeContract);
        if (approveAmount < valueInWei) {
          let approveTx = await tokenContract.approve(this.fromChain.bridgeContract, valueInWei);
          let receipt = await approveTx.wait();
          if (receipt.status === 0) {
            this.$toast.error("Approve failed.");
            this.isProcessing = false;
            return;
          }
        }
        let tx;
        if (this.coinChoose.name === "WETH" && this.fromChain.name !== "X1 TestNet") {
          tx = await bridgeContract.BridgeInitiateWETH.send(this.fromChain.chainId, this.toChain.chainId, this.userInfo.address, valueInWei);
        } else {
          tx = await bridgeContract.BridgeInitiateERC20.send(this.fromChain.chainId, this.toChain.chainId, this.userInfo.address, this.fromChain[contractName], valueInWei);
        }
        let receipt = await tx.wait();
        if (receipt.status === 1) {
          this.$router.push({ path: "history", query: { type: 1 } });
        } else {
          this.$toast.error("Bridge failed");
        }
      } catch (error) {
        this.isProcessing = false;
        if (error.info?.error?.code === 4001) {
          this.$toast.error("User rejected the request.");
        }
      }
      this.isProcessing = false;
    },
    async initBridgeBalance() {
      if (!this.userInfo.address) return;
      this.fromBalance = 0;
      this.toBalance = 0;
      this.isLoadingBalance = true;

      try {
        let providerFrom = new JsonRpcProvider(this.fromChain.rpcUrl, this.fromChain.chainId);
        let providerTo = new JsonRpcProvider(this.toChain.rpcUrl, this.toChain.chainId);
        if (this.coinChoose.name === this.fromChain.currency) {
          let balance = await providerFrom.getBalance(this.userInfo.address);
          this.fromBalance = parseFloat(ethers.formatEther(balance)).toFixed(6);
        } else {
          let contractName = this.coinChoose.name.toLowerCase() + "Contract";
          let contractFrom = new ethers.Contract(this.fromChain[contractName], erc20ABI, providerFrom);
          let balance = await contractFrom.balanceOf(this.userInfo.address);
          this.fromBalance = parseFloat(ethers.formatEther(balance)).toFixed(6);
        }
        if (this.coinChoose.name === this.toChain.currency) {
          let balance = await providerTo.getBalance(this.userInfo.address);
          this.toBalance = parseFloat(ethers.formatEther(balance)).toFixed(6);
        } else {
          let contractName = this.coinChoose.name.toLowerCase() + "Contract";
          let contractTo = new ethers.Contract(this.toChain[contractName], erc20ABI, providerTo);
          let balance = await contractTo.balanceOf(this.userInfo.address);
          this.toBalance = parseFloat(ethers.formatEther(balance)).toFixed(6);
        }
      } catch (e) {
        console.error("initBridgeBalance---error ---", e);
      }
      this.isLoadingBalance = false;
    }
  },
  watch: {
    amount(newValue, oldValue) {
      // 简单验证，只保留有效数字逻辑
      if (typeof newValue !== 'number' && (!/^\d*\.?\d*$/.test(newValue))) {
        this.amount = oldValue;
      }
      this.bridgeAmount = (Math.floor(this.amount * (1 - this.bridgeFee) * 100000) / 100000).toFixed(5);
    },
    pageIndex() {
      this.initBridgeBalance();
    }
  },
  filters: {
    ellipsisFilter(value) {
      if (typeof value !== 'string') return value;
      return value.slice(0, 4) + '...' + value.slice(-4);
    }
  },
  computed: {
    ...mapState("ethersWallet", ["provider", "signer", "userInfo", "currentNetwork"]),
    formattedFromBalance() {
      this.fromBalance = Number(this.fromBalance);
      return this.fromBalance.toFixed(6);
    },
    formattedToBalance() {
      this.toBalance = Number(this.toBalance);
      return this.toBalance.toFixed(6);
    },
    fromPlaceHolder() {
      return `at least ${this.coinChoose.minBridgeAmount}`;
    },
    isInsufficient() {
      return this.fromBalance >= this.coinChoose.minBridgeAmount &&
          this.fromBalance >= this.amount;
    },
    isCanConfirm() {
      return this.amount != null && this.amount >= this.coinChoose.minBridgeAmount;
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleDocumentClick);
  },
  mounted() {
    document.addEventListener('click', this.handleDocumentClick);

    this.initBridgeBalance();
  }
};
</script>

<style lang="scss" scoped>
/* 样式全部保留，直接用你原来的 style 内容 */


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
