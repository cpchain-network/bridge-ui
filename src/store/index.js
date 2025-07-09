import Vue from 'vue'
import Vuex from "vuex";

import ethersWallet from "./modules/ethersWallet"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 默认网站关键词
        metaInfo: {},
        system:{
            screenWidth:document.documentElement.clientWidth, //屏幕宽度
            currentAddress : localStorage.getItem("address")
        }
    },
    //改变meta关键词
    mutations: {
        CAHNGE_META_INFO(state, metaInfo) {
            // console.log(metaInfo, "metaInfo")
            state.metaInfo = metaInfo;
        }
    },
    modules: {
        ethersWallet,
    }
})