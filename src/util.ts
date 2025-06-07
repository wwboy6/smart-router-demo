import { Currency, CurrencyAmount } from "@pancakeswap/sdk"
import Big from "big.js"

export function toSerializable(value: any) : any {
  switch (typeof(value)) {
    case 'object':
      if (!value) return value
      if (Array.isArray(value)) {
        return value.map(toSerializable)
      }
      return Object.keys(value).reduce((obj, key) => {
        obj[key] = toSerializable(value[key])
        return obj
      }, {} as any)
    case 'bigint':
      return {
        '_type': 'bigint',
        '_value': value.toString(),
      }
  }
  return value
}

export function parseSerializable(value: any) : any {
  switch (typeof(value)) {
    case 'object':
      if (!value) return value
      if (Array.isArray(value)) {
        return value.map(parseSerializable)
      }
      // handle converted data
      if (Object.keys(value).length === 2 && value._type && value._value) {
        switch (value._type) {
          case 'bigint': return BigInt(value._value)
          default: console.warn('unknown type', value._type)
        }
      }
      // handle normal object
      return Object.keys(value).reduce((obj, key) => {
        obj[key] = parseSerializable(value[key])
        return obj
      }, {} as any)
  }
  return value
}


export function printAmount(amount: CurrencyAmount<Currency> | undefined) {
  if (!amount) return '?'
  return printBalance(amount.quotient, amount.decimalScale)
}

export function printBalance(balance : bigint, decimalScale : bigint = 10n**18n) : string {
  return Big(balance.toString()).div(decimalScale.toString()).toFixed(5)
}
