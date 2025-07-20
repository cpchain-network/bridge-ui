<template>
  <div>
    <div class="header">
      <div class="content">
        <el-row>
          <el-col :xs="3" :sm="4" :md="5" :lg="9" :xl="11">
            <div class="gridContent">
              <img src="@/assets/imgs/cpChain.png" alt="">
            </div>
          </el-col>
          <el-col :xs="21" :sm="20" :md="19" :lg="15" :xl="13">
            <div class="gridContent2">

              <div class="menu">

                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                  style="background: transparent;" :ellipsis="false">
                  <el-submenu index="1">
                    <span slot="title">{{ $t('navbar.meun1.title') }}</span>
                    <el-menu-item index="1-1">{{ $t('navbar.meun1.menu.name1') }}</el-menu-item>
                    <el-menu-item index="1-2">{{ $t('navbar.meun1.menu.name2') }}</el-menu-item>
                  </el-submenu>

                  <el-submenu index="2">
                    <span slot="title">{{ $t('navbar.meun2.title') }}</span>
                    <el-menu-item index="2-1">{{ $t('navbar.meun2.menu.name1') }}</el-menu-item>
                    <el-menu-item index="2-2">{{ $t('navbar.meun2.menu.name2') }}</el-menu-item>
                    <el-menu-item index="2-3">{{ $t('navbar.meun2.menu.name3') }}</el-menu-item>
                    <el-menu-item index="2-4">{{ $t('navbar.meun2.menu.name4') }}</el-menu-item>
                  </el-submenu>

                  <el-submenu index="3">
                    <span slot="title">{{ $t('navbar.meun3.title') }}</span>
                    <el-menu-item index="3-1">{{ $t('navbar.meun3.menu.name1') }}</el-menu-item>
                    <el-menu-item index="3-2">{{ $t('navbar.meun3.menu.name2') }}</el-menu-item>
                  </el-submenu>

                  <el-submenu index="4">
                    <span slot="title">{{ $t('navbar.meun4.title') }}</span>
                    <el-menu-item index="4-1">{{ $t('navbar.meun4.menu.name1') }}</el-menu-item>
                    <el-menu-item index="4-2">{{ $t('navbar.meun4.menu.name2') }}</el-menu-item>
                    <el-menu-item index="4-3">{{ $t('navbar.meun4.menu.name3') }}</el-menu-item>
                    <el-menu-item index="4-4">{{ $t('navbar.meun4.menu.name4') }}</el-menu-item>
                  </el-submenu>

                  <el-menu-item index="5">{{ $t('navbar.meun5.title') }}</el-menu-item>

                  <el-submenu index="6">
                    <span slot="title">
                      <img src="@/assets/imgs/language.png" alt="" style="height: 20px;">
                    </span>
                    <el-menu-item index="6-3">{{ $t('navbar.language.en') }}</el-menu-item>
                    <el-menu-item index="6-1">{{ $t('navbar.language.cn') }}</el-menu-item>
                  </el-submenu>

                  <button v-if="!userInfo.address" @click="openModal">
                    {{ $t('navbar.link') }}
                  </button>
                  <button v-else @click="showUserInfo">{{ userInfo.showAddress }}</button>
                </el-menu>


              </div>

              <div class="menu1">

                <el-menu :default-active="activeIndex" class="el-menu-demo2" ref="menuRef" mode="horizontal"
                  @select="handleSelect" style="background: transparent;" :ellipsis="false">
                  <el-submenu index="6">
                    <span slot="title">
                      <img src="@/assets/imgs/language.png" alt="" style="width: 20px;">
                    </span>
                    <el-menu-item index="6-3">{{ $t('navbar.language.en') }}</el-menu-item>
                    <el-menu-item index="6-1">{{ $t('navbar.language.cn') }}</el-menu-item>

                  </el-submenu>
                </el-menu>
                <button v-if="!userInfo.address" @click="openModal">

                  {{ $t('navbar.link') }}
                </button>
                <button v-else @click="showUserInfo">{{ userInfo.showAddress }}</button>
                <i class="el-icon-s-operation" style="margin-left: 20px;cursor: pointer;color:#fff;font-size: 20PX;"
                  @click="drawer = true"></i>

              </div>


            </div>
          </el-col>
        </el-row>
      </div>






    </div>

    <el-drawer size="80%" :visible.sync="drawer" :show-close="true">

      <el-menu :default-active="activeIndex" class="el-menu-demo" @select="handleSelect" style="background: transparent;"
        :ellipsis="false">
        <el-submenu index="1">
          <span slot="title">{{ $t('navbar.meun1.title') }}</span>
          <el-menu-item index="1-1">{{ $t('navbar.meun1.menu.name1') }}</el-menu-item>
          <el-menu-item index="1-2">{{ $t('navbar.meun1.menu.name2') }}</el-menu-item>
        </el-submenu>

        <el-submenu index="2">
          <span slot="title">{{ $t('navbar.meun2.title') }}</span>
          <el-menu-item index="2-1">{{ $t('navbar.meun2.menu.name1') }}</el-menu-item>
          <el-menu-item index="2-2">{{ $t('navbar.meun2.menu.name2') }}</el-menu-item>
          <el-menu-item index="2-3">{{ $t('navbar.meun2.menu.name3') }}</el-menu-item>
          <el-menu-item index="2-4">{{ $t('navbar.meun2.menu.name4') }}</el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <span slot="title">{{ $t('navbar.meun3.title') }}</span>
          <el-menu-item index="3-1">{{ $t('navbar.meun3.menu.name1') }}</el-menu-item>
          <el-menu-item index="3-2">{{ $t('navbar.meun3.menu.name2') }}</el-menu-item>
        </el-submenu>

        <el-submenu index="4">
          <span slot="title">{{ $t('navbar.meun4.title') }}</span>
          <el-menu-item index="4-1">{{ $t('navbar.meun4.menu.name1') }}</el-menu-item>
          <el-menu-item index="4-2">{{ $t('navbar.meun4.menu.name2') }}</el-menu-item>
          <el-menu-item index="4-3">{{ $t('navbar.meun4.menu.name3') }}</el-menu-item>
          <el-menu-item index="4-4">{{ $t('navbar.meun4.menu.name4') }}</el-menu-item>
        </el-submenu>

        <el-menu-item index="5">{{ $t('navbar.meun5.title') }}</el-menu-item>


      </el-menu>

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

// 
export default {
  name: "HeaderNav",
  data() {
    return {
      drawer: false,
      localLogin: false,
      active:"",
      activeIndex:"",
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

   handleSelect (index)  {

      if (index == "6-3") {
        window.localStorage.setItem("locale","en-us" )
        window.location.reload();
      //   document.documentElement.setAttribute('data-lang', locale.value);
      //   setTimeout(() => {
      //     menuRef.value && menuRef.value.close && menuRef.value.close('6')
      //   }, 100)
       }
      if (index == "6-1") {
        // alert(2)
         window.localStorage.setItem("locale","zh-cn" )
         window.location.reload();
        // document.documentElement.setAttribute('data-lang', locale.value);
        // setTimeout(() => {
        //   menuRef.value && menuRef.value.close && menuRef.value.close('6')
        // }, 100)
      }
      else if (index != "6-1" && index != "6-3") {
        // openPopup()
      }
      // console.log("选中的菜单项：", index);
    }
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
          // window.location.reload()
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
    console.log('当前语言:', this.$i18n.locale);
  },
};
</script>

<style lang="scss" scoped>
// :deep(.el-menu--horizontal>.el-submenu .el-submenu__title) {
//     color: #fff !important;
// }
// :deep(.el-menu--horizontal>.el-menu-item) {
//   color: #fff !important;
// } 
// :deep(.el-menu--horizontal>.el-submenu .el-submenu__title) {
//   color: #fff !important;
// }

.popup {
  font-size: 14px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
  color: #fff;
  background: rgb(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  // display: none;

  .content1 {
    width: 80%;
    height: 400px;
    max-width: 500px;
    background: #181818;
    border-radius: 20px;
    padding: 20px;
    position: relative;
    cursor: pointer;

    h3 {
      margin: 30px 0;
    }

    :deep(.el-icon) {
      position: absolute;
      right: 20px;
      top: 20px;
    }

    ul {
      list-style: none;
      cursor: pointer;

      li {
        height: 50px;
        display: flex;
        align-items: center;

        img {
          width: 30px;
          border-radius: 10px;
          /* 圆形头像 */
          object-fit: cover;
          /* 保证不变形 */

        }

        span {
          margin-left: 30px;
        }
      }
    }
  }

  .content2 {
    width: 30%;
    height: 100px;
    max-width: 500px;
    background: #181818;
    border-radius: 20px;
    padding: 20px;
    position: relative;
    cursor: pointer;

    :deep(.el-icon) {
      position: absolute;
      right: 20px;
      top: 20px;
    }

    :deep(.el-button) {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }

    div {
      width: 100%
    }

    .adds {
      text-align: center;
      margin-top: 30px;
    }



  }

}

.header {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  position: absolute;
  z-index: 1000;

  :deep(.el-dialog) {
    --el-dialog-bg-color: #000 !important;
    z-index: 2000;
  }

  .content {
    height: 72px;
    width: auto;
    position: fixed;
    backdrop-filter: blur(10px);
    /* 固定在页面顶部 */
    top: 0px;
    // left: 0;
    // right: 0;
    // border-radius: 100px;
    backdrop-filter: blur(14px);
    padding: 0 24px;
    width: 100%;
    // border-radius: 100px;

    .gridContent {
      height: 72px;
      display: flex;
      align-items: center;
      width: 100%;

      img {
        height: 30px;
      }
    }

    .gridContent2 {
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
      overflow: hidden;
      flex-wrap: nowrap;

      img {
        height: 30px;
      }

      button {
        margin-top: 10px;
        cursor: pointer;
        display: flex;
        height: 35px;
        // padding: 0px 16px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 100px;
        border: 1px solid #FFF;
        color: #FFF;
        width: 130px;

        font-size: 14px;
        font-weight: 500;
        background: transparent;
      }

      button:hover {
        cursor: pointer;


        border: 1px solid #00CE7A;

        color: #00CE7A;




      }

      .menu {
        display: block;
        overflow: hidden;
      }

      .menu1 {
        height: 44px;
        display: flex;
        align-items: center;

        img {
          height: 20px;
        }

        display: none;
      }
    }
  }

  @media (max-width: 1000px) {
    .content {
      height: 72px;
      // width: calc(100% - 100px);
      // border-radius: 100px;
      // backdrop-filter: blur(14px);
      padding: 0 24px;
      // border-radius: 100px;
    }
  }

  @media (max-width: 900px) {

    .popup {
      font-size: 14px;
      position: fixed;
      top: 0;
      right: 0;
      z-index: 100;
      width: 100%;
      height: 100vh;
      color: #fff;
      background: rgb(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      // display: none;

      .content1 {
        width: 80%;
        height: 400px;
        max-width: 500px;
        background: #181818;
        border-radius: 20px;
        padding: 20px;
        position: relative;
        cursor: pointer;

        h3 {
          margin: 30px 0;
        }

        :deep(.el-icon) {
          position: absolute;
          right: 20px;
          top: 20px;
        }

        ul {
          list-style: none;
          cursor: pointer;

          li {
            height: 50px;
            display: flex;
            align-items: center;

            img {
              width: 30px;
              border-radius: 10px;
              /* 圆形头像 */
              object-fit: cover;
              /* 保证不变形 */

            }

            span {
              margin-left: 30px;
            }
          }
        }
      }

      .content2 {
        width: 100%;
        height: 100px;
        max-width: 500px;
        background: #181818;
        border-radius: 20px;
        padding: 20px;
        position: relative;
        cursor: pointer;

        :deep(.el-icon) {
          position: absolute;
          right: 20px;
          top: 20px;
        }

        :deep(.el-button) {
          position: absolute;
          bottom: 20px;
          right: 20px;
        }

        div {
          width: 100%
        }

        .adds {
          // text-align: center;
          font-size: 12px;
          margin-top: 30px;
        }



      }

    }

    .content {
      height: 48px;
      width: calc(100% - 30px);

      backdrop-filter: blur(14px);
      // border-radius: 100px;

      .gridContent {
        height: 48px;
        display: flex;
        align-items: center;
        width: 100%;

        img {
          height: 20px;
        }
      }

      .gridContent2 {
        height: 48px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        flex-wrap: nowrap;

        img {
          height: 30px;
        }

        button {
          margin-top: 8px;
          cursor: pointer;
          display: flex;
          height: 44px;
          padding: 0px 16px;
          justify-content: center;
          align-items: center;
          gap: 10px;
          border-radius: 100px;
          border: 1px solid #FFF;
          color: #FFF;

          font-size: 16px;
          font-weight: 500;
          background: transparent;

        }

        .menu {
          display: none;
        }

        .menu1 {
          height: 44px;
          display: flex;
          align-items: center;

          img {
            height: 20px;
            margin-right: 10px;
          }

          button {
            margin-top: 0px !important;
            cursor: pointer;
            display: flex;
            height: 25px;
            justify-content: center;
            align-items: center;
            width: 100px;
            padding: 0 5px;
            border-radius: 100px;
            border: 1px solid #FFF;
            color: #FFF;
            font-family: "PingFang SC";
            font-size: 12px;
            font-weight: 500;
            background: transparent;
          }

          button:hover {
            cursor: pointer;


            border: 1px solid #00CE7A;

            color: #00CE7A;




          }

          :deep(.el-icon:hover) {
            color: #00CE7A;
          }
        }
      }
    }
  }
}
</style>
