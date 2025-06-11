import { PoolType } from "@pancakeswap/smart-router"
import { parseSerializable } from "./util"
import { Currency, CurrencyAmount, Native, Percent, Token } from "@pancakeswap/sdk"
import { Tick } from "@pancakeswap/v3-sdk"

import { getPools as getPools_native_usdt } from './pools-native-usdt'
import { getPools as getPools_usdt_bnb } from './pools-usdt-bnb'
import { getPools as getPools_busd_usdt } from './pools-busd-usdt'
import { getPools as getPools_usdt_babycake } from './pools-usdt-babycake'
import { getPools as getPools_usdt_wbnb } from './pools-usdt-wbnb'

function parseCurrency(data: any) {
  if (data.isToken) {
    return new Token(
      data.chainId,
      data.address,
      data.decimals,
      data.symbol,
      data.name,
      data.projectLink)
  } else {
    return Native.onChain(data.chainId)
  }
}

function parseReserve(data: any) {
  const currency = parseCurrency(data.currency)
  return CurrencyAmount.fromFractionalAmount(currency, data.numerator, data.denominator)
}

function parsePool(data: any) {
  const reserve0 = parseReserve(data.reserve0)
  const reserve1 = parseReserve(data.reserve1)
  switch(data.type) {
    case PoolType.V2:
      return {
        ...data,
        reserve0,
        reserve1,
      }
    case PoolType.V3:
      if (data.ticks) console.warn('V3 data with ticks', data)
      return {
        ...data,
        reserve0,
        reserve1,
        token0: reserve0.currency,
        token1: reserve1.currency,
        token0ProtocolFee: new Percent(data.token0ProtocolFee.numerator, data.token0ProtocolFee.denominator),
        token1ProtocolFee: new Percent(data.token1ProtocolFee.numerator, data.token1ProtocolFee.denominator),
        // TODO: verify this
        ticks: data.ticks?.map((t : any) => new Tick(t))
      }
    case PoolType.STABLE:
      console.log('stable')
      break
    case PoolType.InfinityBIN:
      console.log('InfinityBIN')
      break
    case PoolType.InfinityCL:
      console.log('InfinityCL')
      break
  }
  return data
}

export function getPools(swapFrom : string, swapTo : string) : any { // TODO: return type
  const data = getPoolData(swapFrom, swapTo)
  if (!data) return null
  return parseSerializable(data).map(parsePool)
}

function getPoolData (swapFrom : string, swapTo : string) : any {
  let data = _getPoolData(swapFrom, swapTo)
  if (!data) data = _getPoolData(swapTo, swapFrom)
  return data
}
function _getPoolData (swapFrom : string, swapTo : string) : any {
  // sort with native first, then common, then other
  // native: BSC
  // common: BUSD CAKE DAI tUSDC USD1 USDC USDT
  switch (swapFrom) {
    case 'BSC':
      switch (swapTo) {
        case 'USDT':
          return getPools_native_usdt()
      }
      break;
    case 'BUSD':
      switch (swapTo) {
        case 'USDT':
          return getPools_busd_usdt()
      }
      break;
    case 'USDT':
      switch (swapTo) {
        case 'BNB':
          return  getPools_usdt_bnb()
        case 'BABYCAKE':
          return getPools_usdt_babycake()
        case 'WBNB':
          return getPools_usdt_wbnb()
      }
      break;
  }
}
