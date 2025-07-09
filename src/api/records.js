import request from '@/utils/request'


// bridge records 
// ?address=0x00&page=1&pageSize=50&order=desc
export function getBridgeRecords(params) {
    return request({
        url: "/api/v1/bridge-records",
        method: "get",
        params
    })
}
// stake records 
export function getStakeRecords(params) {
    return request({
        url: "/api/v1/staking-records",
        method: "get",
        params
    })
}