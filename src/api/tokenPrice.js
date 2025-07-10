import request from '@/utils/request'

export function getPriceToken(
    contract_addresses,
    vs_currencies
) {
    return request({
        url: "https://api.coingecko.com/api/v3/simple/token_price/ethereum",
        method: "get",
        params: {
            contract_addresses,
            vs_currencies
        }
    })
}



