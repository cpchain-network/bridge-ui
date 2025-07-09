import { ethers } from 'ethers'
let state = {
  provider: null,
  userInfo: {
    address: null,
    balance: null,
    showAddress: null
  },
  chainId: null,
  currentNetwork: null
}
const actions = {
  async connectWalletAction ({ commit, dispatch }, payload) {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum
          .request({ method: 'eth_requestAccounts' })
          .then(accounts => {
            // connect wallet
            let provider = new ethers.BrowserProvider(window.ethereum)
            // const provider = new ethers.BrowserProvider(window.ethereum)
            commit('LOGIN_SUCCESS', { provider })
          })
          .catch(error => {
          
            if (error.info?.error?.code === 4001) {
             
              this._vm.$toast.error('User rejected the request.')
            }
          })
      } catch (error) {
       
        console.error('Error connecting to MetaMask:', error)
        if (error.info?.error?.code === 4001) {
          this._vm.$toast.error('User rejected the request.')
        }
      }
    } else {
      console.error('MetaMask is not installed')
      this._vm.$toast.error('MetaMask is not installed')
    }
  }
}
const mutations = {
  async LOGIN_SUCCESS (state, payload) {
    const accounts = await payload.provider.listAccounts()
    const account = accounts[0]

    console.log('Connected to MetaMask')
    console.log('User address:', account.address)

    // Now you can use ethers.js to interact with Ethereum using MetaMask's provider
    // For example, you can get the user's balance
    // const balance = await payload.provider.getBalance(account.address)
    const { chainId } = await payload.provider.getNetwork()
    state.provider = payload.provider
    console.log(typeof chainId)
    state.chainId = Number(chainId.toString().replace('n', ''))
    state.userInfo.address = account.address
    state.userInfo.showAddress = `${account.address.substring(
      0,
      6
    )}...${account.address.substring(account.address.length - 4)}`
    const filteredNetworks = this._vm.$networks.filter(
      network => network.chainId === state.chainId
    )
    // console.log('chainId-------', state.chainId)
    // console.log('networks-------', networks)
    // console.log('filteredNetworks-------', filteredNetworks)
    // 获取第一条符合条件的记录
    state.currentNetwork =
      filteredNetworks.length > 0 ? filteredNetworks[0] : null
    localStorage.setItem('localLogin', true)
    console.log(state)
  },
  async ALL_LOGIN_SUCCESS (state, payload) {
    console.log("this._vm-----------",this._vm)
    console.log('User address:', payload.address)
    state.provider =  new ethers.BrowserProvider(payload.walletProvider)
    console.log('state.provider :', state.provider )
    state.chainId = payload.chainId
    state.userInfo.address = payload.address
    state.userInfo.showAddress = `${payload.address.substring(
      0,
      6
    )}...${payload.address.substring(payload.address.length - 4)}`
    const filteredNetworks = this._vm.$networks.filter(
      network => network.chainId === state.chainId
    )
    // console.log('chainId-------', state.chainId)
    // console.log('networks-------', networks)
    // console.log('filteredNetworks-------', filteredNetworks)
    // 获取第一条符合条件的记录
    state.currentNetwork =
      filteredNetworks.length > 0 ? filteredNetworks[0] : null
    localStorage.setItem('localLogin', true)
    console.log(state)
  },
  async ACCOUNT_CHANGE (state, payload) {
    let localLogin = localStorage.getItem("localLogin")
    if(!localLogin){
        return
    }
    state.userInfo.address = payload.address
    state.userInfo.showAddress = `${payload.address.substring(
      0,
      6
    )}...${payload.address.substring(payload.address.length - 4)}`
    console.log('ACCOUNT_CHANGE---', state)
  },
  async CHAIN_CHANGE (state, payload) {
    // state.provider = new ethers.BrowserProvider(window.ethereum)
    state.provider =  new ethers.BrowserProvider(payload.walletProvider)
    const decimalChainId = parseInt(payload.chainId, 16) // Convert hexadecimal to decimal
    const parsedValue = ethers.parseUnits(decimalChainId.toString(), 0) // Parse as a decimal string
    state.chainId = Number(parsedValue.toString().replace('n', ''))
    const filteredNetworks = this._vm.$networks.filter(
      network => network.chainId === state.chainId
    )
    state.currentNetwork =
      filteredNetworks.length > 0 ? filteredNetworks[0] : null
    console.log('CHAIN_CHANGE---', state)
  },
  async LOGOUTED (state, payload) {
    state.provider = null
    state.userInfo = {
      address: null,
      balance: null,
      showAddress: null,
      chainId: null
    }
    state.currentNetwork = null
    localStorage.removeItem('localLogin')
    // console.log(state)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
