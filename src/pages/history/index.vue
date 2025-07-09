<template>
    <div class="main-box">
        <div class="main-content">
            <div class="history-content">
                <div class="header-links-box">
                    <div :class="['nav-item', type === 1 ? 'selected' : '']" @click="type = 1">
                        Bridge
                    </div>
                    <div :class="['nav-item', type === 2 ? 'selected' : '']" @click="type = 2">
                        Stake
                    </div>
                    <!-- <i class="iconfont close">&#xe607;</i> -->
                </div>
            
                <!-- <i class="iconfont close">&#xe607;</i> -->
                <div class="history-table">
                <div class="title">
                    <span>
                        {{ type === 1 ? 'Bridge' : type === 2 ? 'Stake'
                        : 'Withdraw'
                        }} History
                    </span>
                </div>
                <el-table :data="tableData" stripe style="width: 100%" empty-text="No Data" height="530" v-if="type === 1">
                    <el-table-column prop="msg_sent_timestamp" label="Time" width="160" align="center">
                        <template slot-scope="scope">
                            <div>
                                {{ scope.row.msg_sent_timestamp | fmtDate }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="amount" label="Value" align="center">
                        <template slot-scope="scope">
                            <div>
                                {{ scope.row.amount | fmtAmount(scope.row.source_chain_id) }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="source_chain_id" label="Source Chain" align="center">
                        <template slot-scope="scope">
                            <div>
                                {{ scope.row.source_chain_id | fmtChain }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dest_chain_id" label="Dest Chain" align="center">
                        <template slot-scope="scope">
                            <div>
                                {{ scope.row.dest_chain_id | fmtChain }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fromAddress" label="From" align="center">
                        <template slot-scope="scope">
                            <div>
                                {{ scope.row.fromAddress | fmtAddress }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="toAddress" label="To" align="center">
                        <template slot-scope="scope">
                            <div>
                                {{ scope.row.toAddress | fmtAddress }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="source_tx_hash" label="Source Hash" align="center">
                        <template slot-scope="scope">
                            <el-link type="primary"  @click="gotoScan(scope.row.source_tx_hash,scope.row.source_chain_id)">
                                {{ scope.row.source_tx_hash | fmtAddress }}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dest_tx_hash" label="Dest Hash" align="center">
                        <template slot-scope="scope">
                            <el-link type="primary"  @click="gotoScan(scope.row.dest_tx_hash,scope.row.dest_chain_id)">
                                {{ scope.row.dest_tx_hash | fmtAddress }}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fee" label="Fee" align="center">
                        <template slot-scope="scope">
                            <div>
                                {{ scope.row.fee | fmtAmount(scope.row.source_chain_id) }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="Status" align="center">
                        <template slot-scope="scope">
                            <div>
                                {{ scope.row.status | fmtStatus }}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-table :data="stakeData" stripe style="width: 100%" empty-text="No Data" height="530" v-else-if="type === 2">
                    <el-table-column prop="timestamp" label="Time" width="180" align="center">
                        <template slot-scope="scope">
                            <div>
                                <!-- {{ fmtDate(scope.row.timestamp) }} -->
                                {{ scope.row.timestamp | fmtDate }}
                                <!-- {{ scope.row.timestamp }} -->
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="amount" label="Value" align="center">
                        <template slot-scope="scope">
                            <div>
                                <!-- {{ fmtAmount(scope.row.amount)}} -->
                                {{ scope.row.amount | fmtAmount(stakeChainId) }}
                                <!-- {{ scope.row.amount }} -->
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userAddress" label="From" align="center">
                        <template slot-scope="scope">
                            <div>
                                {{ scope.row.userAddress | fmtAddress }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="txHash" label="Hash" align="center">
                        <template slot-scope="scope">
                            <el-link type="primary"  @click="gotoScan(scope.row.txHash,stakeChainId)">
                                {{ scope.row.txHash | fmtAddress }}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="Status" align="center">
                        <template slot-scope="scope">
                            <div>
                                {{ scope.row.status | fmtStatus }}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-table :data="withdrawData" stripe style="width: 100%" empty-text="No Data" height="530" v-else-if="type === 3">
                    <el-table-column prop="timestamp" label="Time" width="180" align="center">
                        <template slot-scope="scope">
                            <div>
                                <!-- {{ fmtDate(scope.row.timestamp) }} -->
                                {{ scope.row.timestamp | fmtDate }}
                                <!-- {{ scope.row.timestamp }} -->
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="amount" label="Value" align="center">
                        <template slot-scope="scope">
                            <div>
                                <!-- {{ fmtAmount(scope.row.amount)}} -->
                                {{ scope.row.amount | fmtAmount(stakeChainId) }}
                                <!-- {{ scope.row.amount }} -->
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userAddress" label="From" align="center">
                        <template slot-scope="scope">
                            <div>
                                {{ scope.row.userAddress | fmtAddress }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="txHash" label="Hash" align="center">
                        <template slot-scope="scope">
                            <el-link type="primary"  @click="gotoScan(scope.row.txHash,stakeChainId)">
                                {{ scope.row.txHash | fmtAddress }}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="Status" align="center">
                        <template slot-scope="scope">
                            <div>
                                {{ scope.row.status | fmtStatus }}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page-wraper">
                    <el-pagination v-if="type === 1" :small="isSmall" layout="prev, pager, next" :total="bridgeTotal" :current-page.sync="bridgePage" :page-size="bridgeSize" @current-change="handleBridgeChange">
                    </el-pagination>
                    <el-pagination v-else-if="type === 2" :small="isSmall" layout="prev, pager, next" :total="stakeTotal" :current-page.sync="stakePage" :page-size="stakeSize" @current-change="handleStakeChange">
                    </el-pagination>
                    <el-pagination v-else-if="type === 3" :small="isSmall" layout="prev, pager, next" :total="widthdrawTotal" :current-page.sync="widthdrawPage" :page-size="widthdrawSize" @current-change="handleWithdrawChange">
                    </el-pagination>
            </div>
        </div>
            </div>
            
    </div>
</div>

</template>

<script>
import {
    getBridgeRecords,
    getStakeRecords
} from "@/api/records"
import {
    mapActions,
    mapMutations,
    mapState
} from "vuex";
import { StakingType } from '@/utils/commonType'
// import {
//     ethers
// } from 'ethers'
// import axios from 'axios';
// import networks from "@/assets/json/networks"
let that;
export default {
    data() {
        return {
            isSmall: true,
            type: 1,
            bridgeTotal: 0,
            bridgePage: 1,
            bridgeSize: 10,
            stakeTotal: 0,
            stakePage: 1,
            stakeSize: 10,
            widthdrawTotal: 0,
            widthdrawPage: 1,
            widthdrawSize: 10,
            tableData: [],
            stakeData: [],
            withdrawData: [],
            stakeChainId: 11155111, //质押链id， 正式环境 需要改成 1 为eth主网
        }
    },
    // 存放方法事件 - 会在数据变化时被调用
    methods: {
        async handleBridgeChange(page) {
            this.bridgePage = Number(page);
            // self.selectTrans(self.recordPage, self.recordSize).then((res) => {
            //     self.records = res.records;
            //     self.recordTotal = res.recordTotal;
            // });
            this.getBridgeRecordsMethod()
        },
        async handleStakeChange(page) {
            this.stakePage = Number(page);
            this.getStakeRecordsMethod()
        },
        async handleWithdrawChange(page) {
            this.widthdrawPage = Number(page);
            this.getWithdrawRecordsMethod()
        },
        //// ?address=0x00&page=1&pageSize=50&order=desc
        async getBridgeRecordsMethod() {
            let reqData = {
                address: this.userInfo.address,
                page: this.bridgePage,
                pageSize: this.bridgeSize,
                order: "desc"
            }
            let {
                data
            } = await getBridgeRecords(reqData)
            console.log(data)
            this.tableData = data.Records;
            this.bridgePage = data.Current;
            this.bridgeTotal = data.Total;
        },
        async getStakeRecordsMethod() {
            let reqData = {
                address: this.userInfo.address,
                page: this.stakePage,
                pageSize: this.stakeSize,
                order: "desc",
                txType: StakingType.StakingTypeStake
            }
            let {
                data
            } = await getStakeRecords(reqData)
            // const response = await axios.get('https://acorus.testnet.dapplink.xyz/api/v1/staking-records',{params:reqData});
            // // 将获取的数据存储在组件的data属性中
            // let data = response.data;
            console.log(data)
            this.stakeData = data.Records
            this.stakePage = data.Current
            this.stakeTotal = data.Total
        },
        async getWithdrawRecordsMethod() {
            let reqData = {
                address: this.userInfo.address,
                page: this.widthdrawPage,
                pageSize: this.widthdrawSize,
                order: "desc",
                txType: StakingType.StakingTypeWithdraw
            }
            let {
                data
            } = await getStakeRecords(reqData)
            // const response = await axios.get('https://acorus.testnet.dapplink.xyz/api/v1/staking-records',{params:reqData});
            // // 将获取的数据存储在组件的data属性中
            // let data = response.data;
            console.log(301, data.Records)
            this.withdrawData = data.Records
            this.widthdrawPage = data.Current
            this.widthdrawTotal = data.Total
        },  
        gotoScan(hash, chainId) {
            const network = this.$networks.find(network => network.chainId === Number(chainId));
            if (network) {
                let url = `${network.explorerUrl}/tx/${hash}`
                window.open(url, "_blank")
            }
        },
        // 假设数组名为 networks
        getTokenSymbol(chainId, tokenAddress) {
            // 找到对应的网络
            let network = that.$networks.find(net => net.chainId === chainId);
            console.log(244);
            // 如果没有找到对应的网络，返回错误信息
            if (!network) {
                return "Error: Network not found.";
            }

            // 遍历网络对象的所有属性
            for (let property in network) {
                // 如果属性的值与 token 地址一致，我们就找到了符号
                if (network[property] === tokenAddress) {
                    // 找到符号后，将其格式化并返回。例如，"usdtContract" 变为 "USDT"
                    let symbol = property.replace('Contract', '').toUpperCase();
                    if (symbol === 'nativeToken') {
                        return network.currency;
                    }
                    return symbol;
                }
            }

            // 如果没有找到符号，返回信息告知
            return "Error: Token address not found.";
        }
    },
    filters: {
        fmtDate(value) {
            // console.log("-----fmtDate--------",value)
            if (!value) return '';
            return that.$moment(value * 1000).format("YYYY/MM/DD HH:mm:ss")
        },
        fmtAmount(value, chainId) {
            // console.log("-----fmtAmount--------",value)
            // return value;
            if (!value) return '';
            let v = (value / 10 ** 18).toFixed(4)
            const network = that.$networks.find(network => network.chainId === Number(chainId));
            if (network) {
                return `${v} ${network.currency}`
            }
            return v
        },
        fmtBridgeAmount(value, chainId, tokenAddress) {
            if (!value) return '';
            let v = (value / 10 ** 18).toFixed(5)
            const network = that.$networks.find(network => network.chainId === Number(chainId));
            if (network) {
                // 如果没有找到对应的网络，返回错误信息
                if (!network) {
                    return "Error: Network not found.";
                }
                if(tokenAddress === "0x0000000000000000000000000000000000000000"){
                    return `${v} ${network.currency}`
                }
                // 遍历网络对象的所有属性
                for (let property in network) {
                    // 如果属性的值与 token 地址一致，我们就找到了符号
                    if (typeof network[property] === 'string' && network[property].toLowerCase() === tokenAddress.toLowerCase()) {
                        // 找到符号后，将其格式化并返回。例如，"usdtContract" 变为 "USDT"
                        let symbol = property.replace('Contract', '').toUpperCase();
                        if (symbol === 'NATIVETOKEN') {
                            return `${v} ${network.currency}`
                        }
                        return `${v} ${symbol}`;
                    }
                }
            }
            return v
        },
        fmtAddress(value) {
            // console.log("-----fmtAddress--------",value)
            if (!value) return '';
            return `${value.substring(0, 6)}...${value.substring(value.length - 4)}`
        },
        fmtChain(value) {
            if (!value) return '';
            const network = that.$networks.find(network => network.chainId === Number(value));
            // console.log(network);
            return network.name;
        },
        fmtStatus(value) {
            // console.log("-----fmtStatus--------",value)
            if (value === null) return '';
            return value === 1 ? 'Success' : 'Pending'
        }
    },
    computed: {
        ...mapState("ethersWallet", ["provider", "userInfo", "currentNetwork"]),
    },
    beforeCreate() {
        that = this;
    },
    // 生命周期 - 创建完成（访问当前this实例）
    created() {

    },
    // 生命周期 - 挂载完成（访问DOM元素）
    mounted() {
        this.type = this.$route.query.type ? Number(this.$route.query.type) : 1;
        setTimeout(() => {
            this.getBridgeRecordsMethod();
            this.getStakeRecordsMethod();
            this.getWithdrawRecordsMethod();
        }, 500);
        console.log("this.networks------------------", this.$networks)
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
        width: 100%;
        height: 100%;
        // margin: 0 20px;
        padding-top: 24px;
        display: flex;
        justify-content: center;

        .history-content {
            min-height: 660px;
            width: 1300px;
            max-width: 1400px;
            padding: 18px 20px;
            height: 100%;
            border-radius: 20px;
            position: relative;
            background-color: #fff;
            color: #333;

            .header-links-box {
                display: flex;
                font-weight: 700;
                font-size: 16px;
                line-height: 24px;
                position: relative;

                .nav-item {
                    height: 24px;
                    margin-right: 39px;
                    cursor: pointer;
                    color: rgba(51, 51, 51, .8);
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
                        bottom: -10px;
                    }
                }

                .close {
                    position: absolute;
                    right: 10px;
                    // top: 0px;
                    font-size: 20px;
                }

            }
        }

        .history-table {
            .title {
                display: flex;
                justify-content: center;
                margin: 20px 0;

                span {
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 24px;
                    font-family: Inter Bold;
                    color: #333;
                }
            }

            ::v-deep .el-table__body-wrapper {
                height: 100% !important;
            }

            .page-wraper {
                display: flex;
                justify-content: center;
                margin-top: 10px;

                // margin: 10px 0;
                ::v-deep .el-pagination .el-pager li.active {
                    color: $global-color !important;
                }

                ::v-deep .el-pagination .el-pager li:hover {
                    color: $global-color !important;
                }

                ::v-deep .el-pagination button:hover {
                    color: $global-color !important;
                }
            }
        }
    }

    @media only screen and (max-width: 1300px) {
        .main-content {
            box-sizing: border-box;
            padding: 10px;

            .history-content {
                width: 100%;

            }
        }
    }
}
</style>
