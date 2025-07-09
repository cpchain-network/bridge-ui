<template>
    <div :class="['out-wrapper', !isHome ? 'dark-bg' : '']">
        <div class="nav-wrapper">
            <div class="left-wrapper">

                <div class="logo-wrapper" @click="goHome">
                    <img src="@/assets/logo/logo_dark.png" alt="" />
                </div>
                <div class="logo-wrapper-mobile" @click="goHome">
                    <img src="@/assets/logo/logo-sm.png" alt="" />
                </div>
                <div class="menu-wrapper">
                    <div class="menu-nav">
                        <div class="menu-item" :class="menu.url == $route.path ? 'selected' : ''"
                            v-for="(menu, index) in topMenus" :key="index">
                            <router-link :to="menu.url">
                                <i class="iconfont" v-if="menu.icon">{{ menu.icon }}</i>
                                <span>{{ menu.title }}</span>
                            </router-link>
                            <!-- <div class="soon-wrapper" v-if="menu.soon">
                            <img src="@/assets/imgs/token/soon.png" alt="" />
                        </div> -->

                        </div>
                    </div>
                </div>
            </div>
            <div :class="['nav-right-box']">
                <!-- <button @click="sign"> sign</button> -->
                <div :class="['connect-wallet', isHome ? 'no_visiabled' : '']" v-if="!userInfo.address">
                    <span class="connect-btn" @click="openModal"> Connect Wallet</span>
                    <!-- <span class="connect-btn" @click="connectToMetaMask"> Connect Wallet</span> -->
                    <div class="connect-wallet-chooser" v-if="walletConnectVisible">
                        <div class="toolbox-header">
                            <span>Connect Wallet</span>
                            <i class="iconfont close" @click="walletConnectVisible = false">&#xe607;</i>
                        </div>
                        <div class="wallet-item">
                            <div class="wallet-item-left">
                                <img src="@/assets/wallet/metamask.png" alt="">
                                <span class="wallet-title">MetaMask</span>
                            </div>
                            <span class="wallet-btn comm-btn" @click.prevent="connectToMetaMask">Connect</span>
                        </div>
                        <div class="wallet-item">
                            <div class="wallet-item-left">
                                <img src="@/assets/wallet/wallet.png" alt="">
                                <span class="wallet-title">WalletConnect</span>
                            </div>
                            <span class="wallet-btn comm-btn">Connect</span>
                        </div>
                    </div>
                </div>
                <div :class="['login-info', isHome ? 'no_visiabled' : '']" v-else>
                    <span class="ops-item pc-show" @click="goHistory()">History</span>
                    <!-- <div class="ops-item center pc-show" v-if="!currentNetwork">
                    <span class="address">Unknown Network</span>
                </div>
                <div class="ops-item center pc-show" v-else>
                    <img :src="require(`@/assets/imgs/chain/${currentNetwork.img}`)" alt="">
                    <span class="address">{{currentNetwork.name}}</span>
                </div> -->
                    <div class="ops-item center " @click="showUserInfo">
                        <img src="@/assets/imgs/header/Wallet.svg" alt="">
                        <span class="address">{{ userInfo.showAddress }}</span>
                        <!-- <img src="@/assets/imgs/header/copy.svg" class="copy-btn" alt=""> -->
                    </div>
                    <!-- <div class="ops-mode pc-show" @click="logout">
                    <img src="@/assets/imgs/header/logout.svg" alt="">
                </div> -->
                </div>
                <div class="mobile-menu-wrapper">
                    <div @click="drawer = true" class="icon-font">
                        <img src="@/assets/imgs/header/menu_white.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <el-drawer title="" :visible.sync="drawer" size="40%" :with-header="false" :append-to-body="true"
            :modal-append-to-body="false">
            <div class="menu-drawer">
                <div class="mobile-menu-box">
                    <router-link :to="menu.url" :class="['m-menu-item', menu.url == $route.path ? 'active' : '']"
                        v-for="(menu, index) in filteredMenus" :key="index">
                        <span>{{ menu.title }}</span>
                    </router-link>
                </div>
                <div class="bottom-wrapper">
                    <span class="ops-item pc-show" v-if="userInfo.address" @click="goHistory()">History</span>
                    <!-- <div class="ops-item center pc-show">
                    <img src="@/assets/imgs/chain/eth.svg" alt="">
                    <span class="address">Ethereum</span>
                </div> -->
                    <!-- <div class="ops-item center " @click="copy">
                    <img src="@/assets/wallet/metamask.png" alt="">
                    <span class="address">{{userInfo.showAddress}}</span>
                    <img src="@/assets/imgs/header/copy.svg" class="copy-btn" alt="">
                </div> -->
                    <!-- <div class="logout-btn" @click="logout" v-if="userInfo.address">
                    <span class="address">Logout</span>
                </div> -->
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import {
    mapActions,
    mapMutations,
    mapState
} from "vuex";
import {
    createWeb3Modal, defaultConfig, useWeb3Modal
    , useWeb3ModalAccount, useWeb3ModalProvider, useWeb3ModalTheme
} from '@web3modal/ethers/vue'
import { BrowserProvider } from 'ethers'
import networks from '@/assets/json/networks'
export default {
    name: "HeaderNav",
    data() {
        return {
            drawer: false,
            localLogin: false,
            topMenus: [
                {
                    title: "Bridge",
                    icon: null,
                    url: "/bridge",
                    soon: false,
                }
            ],
            chainId: null,
            localLogin: false,
            walletConnectVisible: false,
            projectId: '2c99978c56676af588fa04e38c48d815',
            mainnet: {
                chainId: 1,
                name: 'Ethereum',
                currency: 'ETH',
                explorerUrl: 'https://etherscan.io',
                rpcUrl: 'https://mainnet.infura.io/v3/eec3e26ddcd344228d7191f33bf32643'
            },
            metadata: {
                name: 'Dapplink Bridge',
                description: 'Dapplink Bridge',
                url: 'https://bridge.dapplink.xyz',
                icons: ['https://avatars.mywebsite.com/']
            },
            model: null,
            isConnected: null,
            walletProvider: null,
            isHome: false,
        };
    },
    methods: {
        ...mapActions("ethersWallet", ["connectWalletAction"]),
        ...mapMutations("ethersWallet", ["ACCOUNT_CHANGE", "CHAIN_CHANGE", "LOGOUTED", "ALL_LOGIN_SUCCESS"]),
        goHome() {
            window.location.href = "https://www.dapplink.xyz/";
        },
        async connectToMetaMask() {
            this.walletConnectVisible = false;
            this.connectWalletAction();
        },
        metaMaskListener() {
            ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length === 0) { } else if (accounts[0] !== this.userInfo.address) {
                    this.ACCOUNT_CHANGE({
                        address: accounts[0],
                    });
                }
            });
            ethereum.on("chainChanged", (chainId) => {
                console.log("new chainId---", chainId);
                this.CHAIN_CHANGE({
                    chainId, walletProvider: this.walletProvider
                });
                // window.location.reload();
            });
        },
        goHistory() {
            // console.log(this.$route.path)
            if (this.$route.path === "/history") {
                return;
            }
            this.walletConnectVisible = false;
            this.$router.push("history")
        },
        copy() {
            this.$copyText(this.userInfo.address)
                .then(() => {
                    this.$toast.success("copy success");
                })
                .catch(() => {
                    this.$toast.error("copy fail");
                });
        },
        logout() {
            this.drawer = false;
            this.LOGOUTED();
        },
        showUserInfo() {
            this.modal.open({ view: 'Account' })
        },
        createWeb3Modal() {
            createWeb3Modal({
                ethersConfig: defaultConfig({ metadata: this.metadata }),
                chains: networks,
                projectId: this.projectId,
                enableAnalytics: true
            });
        },
        openModal() {
            this.modal.open();
        },
        initData() {
            this.modal = useWeb3Modal();
            const { isConnected } = useWeb3ModalAccount()
            this.isConnected = isConnected
            const { walletProvider } = useWeb3ModalProvider()
            this.walletProvider = walletProvider;
            const { setThemeMode, setThemeVariables, themeMode, themeVariables } = useWeb3ModalTheme()
            setThemeMode('light')
            // setThemeVariables({
            // '--w3m-color-mix': '#FF8FA6',
            // '--w3m-color-mix-strength': 40
            // })
            // console.log(address,chainId,isConnected)
        },
        async sign() {
            // const { address, chainId } = useWeb3ModalAccount()
            let p = new BrowserProvider(this.walletProvider)
            console.log("p--------------", p)
            const signer = await p.getSigner()
            console.log("-------signer----------", signer)
            const signature = await signer?.signMessage('Hello Web3Modal Ethers')
            console.log(signature)
        },
    },
    watch: {
        // 监听 $route 对象的变化
        '$route': function (to, from) {
            console.log("0000-----------to------", to);
            this.drawer = false;
            if (to.path === "/home") {
                this.isHome = true;
            } else {
                this.isHome = false;
            }
        },
        events: {
            handler(newValue, oldValue) {
                console.log(JSON.stringify(newValue));
            },
            deep: true
        },
        model: {
            handler(newValue, oldValue) {
                console.log("model------", JSON.stringify(newValue));
            },
            deep: true
        },
        isConnected: {
            async handler(newValue, oldValue) {
                console.log("isConnected------", newValue);
                if (newValue) {
                    // console.log("this.$networks---------",this.$networks); // 输出 'value1'
                    // this.walletProvider = walletProvider
                    const { address, chainId } = useWeb3ModalAccount()
                    console.log(address.value, chainId.value)
                    this.ALL_LOGIN_SUCCESS({ address: address.value, chainId: chainId.value, walletProvider: this.walletProvider });
                } else {
                    this.LOGOUTED()
                }
            },
            deep: true
        },
    },
    directives: {
        "click-outside": {
            bind(el, binding, vnode) {
                el.clickOutsideEvent = function (event) {
                    setTimeout(() => {
                        // 添加延时
                        if (
                            typeof binding.value === "object" &&
                            binding.value.method &&
                            "isShown" in binding.value
                        ) {
                            if (
                                !(el === event.target || el.contains(event.target)) &&
                                binding.value.isShown
                            ) {
                                binding.value.method();
                            }
                        }
                    }, 100); // 0 毫秒的延时足以将其推到下一个事件循环
                };
                document.body.addEventListener("click", el.clickOutsideEvent);
            },
            unbind(el) {
                document.body.removeEventListener("click", el.clickOutsideEvent);
            },
        },
    },

    computed: {
        ...mapState("ethersWallet", ["provider", "userInfo", "currentNetwork"]),
        filteredMenus() {
            return this.topMenus.filter((item) => !item.soon);
        },
    },
    beforeDestroy() {
        console.log('Component is about to be destroyed!');
        // 在组件销毁之前执行的逻辑
    },
    mounted() {
        // this.INIT_LOGIN_INFO();  //初始化用户信息到store
        // this.chainId = localStorage.getItem("chainId");
        let lang = localStorage.getItem("language");
        this.language = lang;
        this.localLogin = localStorage.getItem("localLogin");
        this.metaMaskListener();
        // if (this.localLogin) {
        //     this.connectWalletAction();
        // }
        console.log("currentNetwork-------", this.currentNetwork)
        this.createWeb3Modal()
        this.initData();
        console.log(this.$route.path)
        if (this.$route.path === "/home") {
            this.isHome = true;
        }
    },
};
</script>

<style lang="scss" scoped>
.out-wrapper {
    width: 100%;
    height: 80px;
    min-width: 375px;

    // top: 0px;
    display: flex; // align-content: center;
    justify-content: center;
    // flex-wrap: wrap; // border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    position: fixed;
    padding: 0 20px;
    z-index: 1;
    background: rgba(23, 27, 39, 0.4);
    backdrop-filter: blur(5px);

    /* 创建磨砂效果 */
    .nav-wrapper {
        position: relative;
        width: 100%;
        height: 80px; // margin: 0 auto;
        display: flex;
        justify-content: space-between;
        margin: 0 20px;

        .left-wrapper {
            width: 300px;
            display: flex;
            justify-content: space-between;

            .logo-wrapper {
                cursor: pointer;
                display: flex;
                align-items: center;

                img {
                    // width: 180px;
                    height: 50px;
                }
            }

            .logo-wrapper-mobile {
                display: none;
            }

            .menu-wrapper {
                display: flex;

                .menu-nav {
                    // width: 500px;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    position: absolute;

                    .menu-item {
                        line-height: 80px;
                        position: relative;

                        a {

                            // display: inline-flex;
                            i {
                                font-size: 20px;
                                margin-right: 3px;
                            }

                            span {
                                font-size: 16px;
                                font-weight: 700;
                                // color: rgba(51, 51, 51, 0.8);
                                color: #fff;
                            }

                            &:hover {
                                cursor: pointer;

                                span {
                                    //color: #fff;
                                }
                            }
                        }

                        .soon-wrapper {
                            position: absolute;
                            top: -10px;
                            right: -37px;

                            img {
                                height: 12px;
                            }
                        }
                    }

                    .selected {
                        position: relative;

                        &::after {
                            content: "";
                            position: absolute;
                            width: 40px;
                            height: 6px;
                            background: $global-color;
                            left: calc(50% - 20px);
                            border-radius: 11px;
                            bottom: 15px;
                        }
                    }

                    .menu-item:not(:last-child) {
                        margin-right: 50px;
                    }

                    .active {
                        a {
                            span {
                                color: $global-color;
                            }
                        }
                    }
                }
            }
        }

        .nav-right-box {
            display: flex;
            justify-content: space-evenly;
            align-items: center;

            .connect-wallet {
                position: relative;
                display: flex;
                align-items: center;
                height: 40px;
                box-sizing: border-box;
                white-space: nowrap;

                .connect-btn {
                    font-weight: 700;
                    font-size: 16px;
                    color: #fff;
                    background: $global-color;
                    // background: linear-gradient(270deg, #05FF51 0%, #00A0FF 100%);
                    box-shadow: inset 0 -6px 0 rgba(0, 0, 0, 0.16);
                    padding: 8px 18px;
                    border-radius: 20px;
                    line-height: 24px;
                    cursor: pointer;

                    &:active {
                        box-shadow: inset 0 -8px 0 rgba(0, 0, 0, 0.16);
                    }

                    &:hover {
                        background: $global-bg-color;
                    }
                }

                img {
                    width: 12px;
                }

                .connect-wallet-chooser {
                    position: absolute;
                    top: 75px;
                    right: 0;
                    width: 320px;
                    z-index: 2000;
                    padding: 26px 0 10px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
                    border-radius: 20px;
                    background: #fff;

                    .toolbox-header {
                        height: 24px;
                        margin-top: 18px;
                        text-align: center;
                        position: relative;
                        line-height: 24px;
                        margin-bottom: 22px;
                        position: relative;

                        span {
                            color: #333;
                            font-family: Inter Bold;
                            font-weight: 700;
                            font-size: 16px;
                            line-height: 24px;
                        }

                        .close {
                            font-size: 24px;
                            position: absolute;
                            top: 1px;
                            right: 26px;
                            opacity: 0.6;
                            cursor: pointer;
                        }
                    }

                    .wallet-item {
                        box-sizing: border-box;
                        height: 36px;
                        padding: 0 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 16px;

                        .wallet-item-left {
                            display: flex;
                            justify-content: center;
                            align-items: center;

                            img {
                                width: 22px;
                                height: 22px;
                            }

                            span {
                                font-weight: 400;
                                font-size: 14px;
                                line-height: 24px;
                                margin-left: 8px;
                            }
                        }

                        .wallet-btn {
                            box-sizing: border-box;
                            height: 36px;
                            line-height: 20px;
                            background: #FF8FA6;
                            box-shadow: inset 0 -6px 0 #00000029;
                            border-radius: 20px;
                            padding: 8px 24px;
                            text-align: center;
                            color: #fff;
                            font-weight: 700;
                            font-size: 16px;
                            cursor: pointer;
                            display: inline-block;

                            &:active {
                                box-shadow: inset 0 -8px 0 rgba(0, 0, 0, 0.16);
                            }

                            &:hover {
                                background: $global-bg-color;
                            }
                        }
                    }
                }
            }

            .login-info {
                display: flex;
                align-items: center;

                .ops-item {
                    padding: 8px 18px;
                    border-radius: 20px;
                    line-height: 24px;
                    margin-right: 10px;
                    cursor: pointer;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    font-weight: 700;
                    font-size: 16px;
                    color: rgba(51, 51, 51, .8);
                    white-space: nowrap;

                    span {
                        font-weight: 700;
                        font-size: 16px;
                        color: rgba(51, 51, 51, .8);
                        white-space: nowrap;
                    }

                    img {
                        width: 24px;
                        margin-right: 10px;
                    }

                    .copy-btn {
                        width: 16px;
                        height: 16px;
                        color: rgba(211, 208, 208, 0.4);
                        margin: 0 0 0 10px;
                    }
                }

                .ops-mode {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    background: #fff;

                    img {
                        width: 16px;
                        height: 16px;
                        color: rgba(51, 51, 51, 0.4);
                    }
                }
            }

            .mobile-menu-wrapper {
                display: none;
                position: relative;

                img {
                    height: 30px;
                    cursor: pointer;
                }

                .icon-font {
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                }

            }

        }

        .no_visiabled {
            visibility: hidden;
        }
    }



    @media only screen and (max-width: 1000px) {
        .nav-wrapper {
            .left-wrapper {

                .menu-wrapper,
                .logo-wrapper {
                    display: none;
                }

                .logo-wrapper-mobile {
                    display: block;
                    cursor: pointer;
                    display: flex;
                    align-items: center;

                    img {
                        height: 40px;
                    }
                }
            }

            .nav-right-box {
                .login-info {
                    .pc-show {
                        display: none;
                    }

                }

                .mobile-menu-wrapper {
                    display: flex;
                    align-items: center;
                }
            }
        }
    }

}

.menu-drawer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background-color: #f5f5f5;

    .mobile-menu-box {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // padding: 0px 30px;
        margin-top: 30px;

        .m-menu-item {
            width: 100%;
            padding: 15px 0;
            white-space: nowrap;
            cursor: pointer;
            border-radius: 5px;
            position: relative;
            display: flex;
            justify-content: center;

            span {
                font-size: 16px;
                color: rgba(51, 51, 51, .8);
                font-weight: 700;
            }

            &:hover {
                background-color: rgb(255, 255, 255, 0.5);
            }

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background-color: #a7a4a4;
                /* 横线的颜色 */
            }
        }

        .active {
            span {
                color: $global-color;
            }
        }
    }

    .bottom-wrapper {
        display: flex;
        flex-direction: column;

        // & > * {
        //     margin-bottom: 20px;
        // }
        .ops-item {
            padding: 8px 18px;
            border-radius: 20px;
            line-height: 24px;
            margin: 10px 20px;
            cursor: pointer;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 16px;
            color: rgba(51, 51, 51, .8);
            white-space: nowrap;

            span {
                font-weight: 700;
                font-size: 16px;
                color: rgba(51, 51, 51, .8);
                white-space: nowrap;
            }

            img {
                width: 24px;
                margin-right: 10px;
            }

            .copy-btn {
                width: 16px;
                height: 16px;
                color: rgba(211, 208, 208, 0.4);
                margin: 0 0 0 10px;
            }
        }

        .ops-mode {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            background: #fff;

            img {
                width: 16px;
                height: 16px;
                color: rgba(51, 51, 51, 0.4);
            }
        }

        .logout-btn {
            background: #FF8FA6;
            box-shadow: inset 0 -6px 0 rgba(0, 0, 0, 0.16);
            padding: 8px 18px;
            border-radius: 20px;
            line-height: 24px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px 20px;

            span {
                font-weight: 700;
                font-size: 16px;
                color: #fff;
            }

            &:active {
                box-shadow: inset 0 -8px 0 rgba(0, 0, 0, 0.16);
            }

            &:hover {
                background: $global-bg-color;
            }
        }
    }
}

.dark-bg {
    background: #171B27;
}
</style>
