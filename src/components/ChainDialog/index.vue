<!-- Dialog.vue -->
<template>
<div class="dialog-container" @click="closeDialog" v-if="dialogVisible">
    <div class="dialog-content" @click.stop>
        <div class="obSelectChainBody" data-v-2470d5d2="">
            <div class="selectChainContent">
                <div class="topItem">
                    <span>Select a Chain</span>
                    <div style="position: absolute; top: 0px; right: 0px">
                        <i class="iconfont close" @click="closeDialog">&#xe607;</i>
                    </div>
                </div>
                <div style="width: 100%; position: relative">
                    <input type="text" placeholder="input search text" v-model="filterText" class="input" />
                    <img src="@/assets/imgs/bridge/search.png">
                </div>
            </div>
            <div class="list-content-box ob-scrollbar">
                <div class="list-content">
                    <div class="contentItem title">Popular</div>
                    <div class="contentItem" v-for="(item,index) of filteredPopularChainList" :key="index" @click="confirmSelection(item)">
                        <img :src="require(`@/assets/imgs/chain/${item.img}`)" alt="">
                        <span>{{ item.name }}</span>
                    </div>
                    <!-- <div class="contentItem title">Networks</div>
                    <div class="contentItem" v-for="(item) of filteredNetWorks" :key="item.id" @click="confirmSelection(item)">
                        <img :src="require(`@/assets/imgs/chain/${item.img}`)" alt="">
                        <span>{{ item.name }}</span>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        dialogVisible: {
            type: Boolean,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        fromChain: {
            type: Object,
            required: true,
        },
        toChain: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            filterText: "",
            popularChainList: [{
                    img: "eth.svg",
                    name: "Ethereum",
                },
                {
                    img: "arbitrum.png",
                    name: "Arbitrum",
                },
                {
                    img: "base.svg",
                    name: "Ethereum",
                },
                // {
                //     img: "eth.png",
                //     name: "Ethereum",
                // }, 
            ],
            // netWorks: [{
            //     id: 11,
            //     img: "polygon.svg",
            //     name: "Polygon",
            // }, {
            //     id: 21,
            //     img: "arbitrum.png",
            //     name: "Arbitrum",
            // }, ]
        };
    },
    methods: {
        // 取消
        closeDialog() {
            this.$emit("close-dialog");
        },
        confirmSelection(item) {
            // Emit an event to send the selected option back to the parent component
            this.$emit("option-selected", this.position, this.$activeNetworks.find(i => i.name === item.name));
        },
    },
    computed: {
        filteredPopularChainList:{
            get() {
                if(this.position === "from") {
                    return  this.$activeNetworks
                } else {
                    return this.$activeNetworks.filter(item => item.name === this.fromChain.name)?.[0].supportedChainsAndTokens
                }
            },
            set(value) {
                // 设置计算属性的 setter，但在这个例子中我们并不需要设置它
                // 如果你有需要，你可以在这里执行一些逻辑
            },

        },
        filteredNetWorks: {
            get() {
                // 使用 computed 属性根据输入框的值过滤数组
                const filterText = this.filterText.toLowerCase();
                console.log(filterText)
                return this.$activeNetworks.filter(item =>
                    item.name.toLowerCase().includes(filterText)
                );
            },
            set(value) {
                // 设置计算属性的 setter，但在这个例子中我们并不需要设置它
                // 如果你有需要，你可以在这里执行一些逻辑
            },
        },
    },
    watch: {
        filterText(newValue, oldValue) {
            if (!newValue) {
                this.filteredPopularChainList = [...this.popularChainList];
                this.filteredNetWorks = [...this.netWorks];
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.dialog-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;

    .dialog-content {
        // width: 100%;

        .obSelectChainBody {
            width: 320px;
            height: 372px;
            position: relative;
            margin: 4.2rem auto;
            border-radius: 20px;
            padding: 20px 0;
            background-color: #fff;
            box-shadow: 0 8px 30px rgba(0, 0, 0, .16);
            color: #333;

            .selectChainContent {
                position: relative;
                padding: 0 20px;

                .topItem {
                    width: 100%;
                    // height: 2rem;
                    font-size: 20px;
                    font-weight: 700;
                    // line-height: 2rem;
                    display: flex;
                    justify-content: center;
                    // padding: 0 1rem;
                    margin-bottom: 18px;
                    position: relative;
                    box-sizing: border-box;

                    .close {
                        font-size: 32px;
                        color: rgba(51, 51, 51, 0.4);
                        cursor: pointer;
                    }
                }

                .input {
                    position: relative;
                    border-radius: 30px;
                    margin-bottom: 10px;
                    height: 40px;
                    width: 100%;
                    outline: none;
                    // font-size: 1.4rem;
                    padding: 10px;
                    padding-left: 48px;
                    border: none;
                    background-color: #f5f5f5;
                    color: #333;

                }

                img {
                    position: absolute;
                    left: 20px;
                    top: 10px;
                    width: 20px;
                    height: 20px;
                }
            }

            .list-content-box {
                box-sizing: border-box;
                overflow-y: scroll;
                height: calc(100% - 90px);

                .contentItem {
                    width: 100%;
                    align-items: center;
                    display: flex;
                    position: relative;
                    padding: 10px 30px;
                    cursor: pointer;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 24px;

                    img {
                        width: 20px;
                        height: 20px;
                        margin-right: 20px;
                    }
                }

                .title {
                    font-size: 13px;
                    text-align: start;
                    font-family: inherit;
                    font-weight: 600;
                    color: #696969;
                }
            }
        }
    }
}
</style>
