import request from '@/utils/request'




export function getbridgeFees(
    chain_id,
    symbol
) {
    return request({
        url: "/api/v1/bridge-price-fee",
        method: "get",
        params: {
            chain_id,
            symbol
        }
    })
}