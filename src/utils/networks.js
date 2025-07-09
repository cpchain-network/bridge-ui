// networks.js

import networks from '@/assets/json/networks.json'
import activeNetworks from '@/assets/json/active-networks.json'

let prodNetworks = null

async function loadProdNetworks () {
  try {
    let json = await import('@/assets/json/networks-prod.json')
    console.error('load - json------', json)
    console.error('load - json------', json['default'])
    // 将对象转换为数组
    prodNetworks = json.default
    console.error('load - prodNetworks------', prodNetworks)
  } catch (error) {
    console.error('Failed to load production networks configuration', error)
  }
}

export async function getNetworks (isGetActiveNetworks = false) {
  if (process.env.VUE_APP_ENV === 'prod') {
    await loadProdNetworks()
  }
  return prodNetworks ? prodNetworks : isGetActiveNetworks ? activeNetworks : networks
}
