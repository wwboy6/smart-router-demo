import { PoolType } from "@pancakeswap/smart-router"
import { parseSerializable } from "./util"
import { Currency, CurrencyAmount, Native, Percent, Token } from "@pancakeswap/sdk"
import { Tick } from "@pancakeswap/v3-sdk"

const raw = [
  {
    "type": 0,
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "19667311658013413628592292"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDT",
        "name": "Tether USD",
        "isNative": false,
        "isToken": true,
        "address": "0x55d398326f99059fF775485246999027B3197955",
        "projectLink": "https://tether.to/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "30510858489733817405701"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "WBNB",
        "name": "Wrapped BNB",
        "isNative": false,
        "isToken": true,
        "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "projectLink": "https://www.binance.org"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "address": "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE"
  },
  {
    "type": 0,
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "1002734483336923320761664"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDT",
        "name": "Tether USD",
        "isNative": false,
        "isToken": true,
        "address": "0x55d398326f99059fF775485246999027B3197955",
        "projectLink": "https://tether.to/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "1005909074887268561496201"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDC",
        "name": "Binance-Peg USD Coin",
        "isNative": false,
        "isToken": true,
        "address": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        "projectLink": "https://www.centre.io/usdc"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "address": "0xEc6557348085Aa57C72514D67070dC863C0a5A8c"
  },
  {
    "type": 0,
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "216240462335221841641342"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "CAKE",
        "name": "PancakeSwap Token",
        "isNative": false,
        "isToken": true,
        "address": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
        "projectLink": "https://pancakeswap.finance/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "503803662097181416704928"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDT",
        "name": "Tether USD",
        "isNative": false,
        "isToken": true,
        "address": "0x55d398326f99059fF775485246999027B3197955",
        "projectLink": "https://tether.to/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "address": "0xA39Af17CE4a8eb807E076805Da1e2B8EA7D0755b"
  },
  {
    "type": 0,
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "4118708879348139607443554"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "CAKE",
        "name": "PancakeSwap Token",
        "isNative": false,
        "isToken": true,
        "address": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
        "projectLink": "https://pancakeswap.finance/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "14891303412363121458816"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "WBNB",
        "name": "Wrapped BNB",
        "isNative": false,
        "isToken": true,
        "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "projectLink": "https://www.binance.org"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "address": "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0"
  },
  {
    "type": 0,
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "16887523638169432001"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "BTCB",
        "name": "Binance BTC",
        "isNative": false,
        "isToken": true,
        "address": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        "projectLink": "https://bitcoin.org/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "2732085430574152672941"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "WBNB",
        "name": "Wrapped BNB",
        "isNative": false,
        "isToken": true,
        "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "projectLink": "https://www.binance.org"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "address": "0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082"
  },
  {
    "type": 0,
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "604103249259436464359"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "ETH",
        "name": "Binance-Peg Ethereum Token",
        "isNative": false,
        "isToken": true,
        "address": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        "projectLink": "https://ethereum.org/en/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "2321740518948713556543"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "WBNB",
        "name": "Wrapped BNB",
        "isNative": false,
        "isToken": true,
        "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "projectLink": "https://www.binance.org"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "address": "0x74E4716E431f45807DCF19f284c7aA99F18a4fbc"
  },
  {
    "type": 0,
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "131505485841974577675"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "ETH",
        "name": "Binance-Peg Ethereum Token",
        "isNative": false,
        "isToken": true,
        "address": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        "projectLink": "https://ethereum.org/en/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "326103876518406241063321"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDT",
        "name": "Tether USD",
        "isNative": false,
        "isToken": true,
        "address": "0x55d398326f99059fF775485246999027B3197955",
        "projectLink": "https://tether.to/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "address": "0x531FEbfeb9a61D948c384ACFBe6dCc51057AEa7e"
  },
  {
    "type": 0,
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "124793751628422124253091"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDT",
        "name": "Tether USD",
        "isNative": false,
        "isToken": true,
        "address": "0x55d398326f99059fF775485246999027B3197955",
        "projectLink": "https://tether.to/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "124631609607839260748658"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USD1",
        "name": "USD1",
        "isNative": false,
        "isToken": true,
        "address": "0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d",
        "projectLink": "https://www.worldlibertyfinancial.com/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "address": "0x109977931268a6f7CbCF61dC9218323345Ce8d0E"
  },
  {
    "type": 0,
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "735931110480128208374425"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USD1",
        "name": "USD1",
        "isNative": false,
        "isToken": true,
        "address": "0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d",
        "projectLink": "https://www.worldlibertyfinancial.com/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "1139715701735475541662"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "WBNB",
        "name": "Wrapped BNB",
        "isNative": false,
        "isToken": true,
        "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "projectLink": "https://www.binance.org"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "address": "0x46b9217342CdC50c89FfA84A12Be45b2639eAf4A"
  },
  {
    "type": 0,
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "211578532961076139061859"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDC",
        "name": "Binance-Peg USD Coin",
        "isNative": false,
        "isToken": true,
        "address": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        "projectLink": "https://www.centre.io/usdc"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "327541728868213327696"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "WBNB",
        "name": "Wrapped BNB",
        "isNative": false,
        "isToken": true,
        "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "projectLink": "https://www.binance.org"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "address": "0xd99c7F6C65857AC913a8f880A4cb84032AB2FC5b"
  },
  {
    "type": 0,
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "326869134556965036016"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "ETH",
        "name": "Binance-Peg Ethereum Token",
        "isNative": false,
        "isToken": true,
        "address": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        "projectLink": "https://ethereum.org/en/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "7747429064554477874"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "BTCB",
        "name": "Binance BTC",
        "isNative": false,
        "isToken": true,
        "address": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        "projectLink": "https://bitcoin.org/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "address": "0xD171B26E4484402de70e3Ea256bE5A2630d7e88D"
  },
  {
    "type": 0,
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "65434786668606518993"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "ETH",
        "name": "Binance-Peg Ethereum Token",
        "isNative": false,
        "isToken": true,
        "address": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        "projectLink": "https://ethereum.org/en/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "162443608594891665480076"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDC",
        "name": "Binance-Peg USD Coin",
        "isNative": false,
        "isToken": true,
        "address": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        "projectLink": "https://www.centre.io/usdc"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "address": "0xEa26B78255Df2bBC31C1eBf60010D78670185bD0"
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "ETH",
      "name": "Binance-Peg Ethereum Token",
      "isNative": false,
      "isToken": true,
      "address": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
      "projectLink": "https://ethereum.org/en/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USDT",
      "name": "Tether USD",
      "isNative": false,
      "isToken": true,
      "address": "0x55d398326f99059fF775485246999027B3197955",
      "projectLink": "https://tether.to/"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "192"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "ETH",
        "name": "Binance-Peg Ethereum Token",
        "isNative": false,
        "isToken": true,
        "address": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        "projectLink": "https://ethereum.org/en/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "7415"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDT",
        "name": "Tether USD",
        "isNative": false,
        "isToken": true,
        "address": "0x55d398326f99059fF775485246999027B3197955",
        "projectLink": "https://tether.to/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 10000,
    "liquidity": {
      "_type": "bigint",
      "_value": "0"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "4295128740"
    },
    "tick": -887272,
    "address": "0x83c38557a0576Ad38dEf24abaFA17c2C218cb9E4",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3200"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3200"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USDT",
      "name": "Tether USD",
      "isNative": false,
      "isToken": true,
      "address": "0x55d398326f99059fF775485246999027B3197955",
      "projectLink": "https://tether.to/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "WBNB",
      "name": "Wrapped BNB",
      "isNative": false,
      "isToken": true,
      "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      "projectLink": "https://www.binance.org"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "44994398563481371369204870"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDT",
        "name": "Tether USD",
        "isNative": false,
        "isToken": true,
        "address": "0x55d398326f99059fF775485246999027B3197955",
        "projectLink": "https://tether.to/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "16484318642724513399946"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "WBNB",
        "name": "Wrapped BNB",
        "isNative": false,
        "isToken": true,
        "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "projectLink": "https://www.binance.org"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 500,
    "liquidity": {
      "_type": "bigint",
      "_value": "6454713538916473029411904"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "3118079063211747411869480212"
    },
    "tick": -64706,
    "address": "0x36696169C63e42cd08ce11f5deeBbCeBae652050",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3400"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3400"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USDT",
      "name": "Tether USD",
      "isNative": false,
      "isToken": true,
      "address": "0x55d398326f99059fF775485246999027B3197955",
      "projectLink": "https://tether.to/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USDC",
      "name": "Binance-Peg USD Coin",
      "isNative": false,
      "isToken": true,
      "address": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      "projectLink": "https://www.centre.io/usdc"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "15130297533142293302443576"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDT",
        "name": "Tether USD",
        "isNative": false,
        "isToken": true,
        "address": "0x55d398326f99059fF775485246999027B3197955",
        "projectLink": "https://tether.to/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "18897181986672973640074003"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDC",
        "name": "Binance-Peg USD Coin",
        "isNative": false,
        "isToken": true,
        "address": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        "projectLink": "https://www.centre.io/usdc"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 500,
    "liquidity": {
      "_type": "bigint",
      "_value": "3571305933762657438006828622"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "79250632790663747744293094435"
    },
    "tick": 5,
    "address": "0x4f31Fa980a675570939B737Ebdde0471a4Be40Eb",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3400"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3400"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USDT",
      "name": "Tether USD",
      "isNative": false,
      "isToken": true,
      "address": "0x55d398326f99059fF775485246999027B3197955",
      "projectLink": "https://tether.to/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USDC",
      "name": "Binance-Peg USD Coin",
      "isNative": false,
      "isToken": true,
      "address": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      "projectLink": "https://www.centre.io/usdc"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "14308681727339124699035268"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDT",
        "name": "Tether USD",
        "isNative": false,
        "isToken": true,
        "address": "0x55d398326f99059fF775485246999027B3197955",
        "projectLink": "https://tether.to/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "13016729540288191602808032"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDC",
        "name": "Binance-Peg USD Coin",
        "isNative": false,
        "isToken": true,
        "address": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        "projectLink": "https://www.centre.io/usdc"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 100,
    "liquidity": {
      "_type": "bigint",
      "_value": "78505152436949935120463455201"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "79262542024517725164283470040"
    },
    "tick": 8,
    "address": "0x92b7807bF19b7DDdf89b706143896d05228f3121",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3300"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3300"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USDT",
      "name": "Tether USD",
      "isNative": false,
      "isToken": true,
      "address": "0x55d398326f99059fF775485246999027B3197955",
      "projectLink": "https://tether.to/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "WBNB",
      "name": "Wrapped BNB",
      "isNative": false,
      "isToken": true,
      "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      "projectLink": "https://www.binance.org"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "7716995908643025564333704"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDT",
        "name": "Tether USD",
        "isNative": false,
        "isToken": true,
        "address": "0x55d398326f99059fF775485246999027B3197955",
        "projectLink": "https://tether.to/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "14041603130317544341985"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "WBNB",
        "name": "Wrapped BNB",
        "isNative": false,
        "isToken": true,
        "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "projectLink": "https://www.binance.org"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 100,
    "liquidity": {
      "_type": "bigint",
      "_value": "12841370705944325389630135"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "3118091188159839659595378555"
    },
    "tick": -64706,
    "address": "0x172fcD41E0913e95784454622d1c3724f546f849",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3300"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3300"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USD1",
      "name": "USD1",
      "isNative": false,
      "isToken": true,
      "address": "0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d",
      "projectLink": "https://www.worldlibertyfinancial.com/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "WBNB",
      "name": "Wrapped BNB",
      "isNative": false,
      "isToken": true,
      "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      "projectLink": "https://www.binance.org"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "11225773113700021911327446"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USD1",
        "name": "USD1",
        "isNative": false,
        "isToken": true,
        "address": "0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d",
        "projectLink": "https://www.worldlibertyfinancial.com/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "1229940360483849926186"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "WBNB",
        "name": "Wrapped BNB",
        "isNative": false,
        "isToken": true,
        "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "projectLink": "https://www.binance.org"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 500,
    "liquidity": {
      "_type": "bigint",
      "_value": "1948597776918976580855926"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "3116708133841720255978710087"
    },
    "tick": -64715,
    "address": "0x4a3218606AF9B4728a9F187E1c1a8c07fBC172a9",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3400"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3400"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "CAKE",
      "name": "PancakeSwap Token",
      "isNative": false,
      "isToken": true,
      "address": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
      "projectLink": "https://pancakeswap.finance/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "WBNB",
      "name": "Wrapped BNB",
      "isNative": false,
      "isToken": true,
      "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      "projectLink": "https://www.binance.org"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "2703525375646500528741844"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "CAKE",
        "name": "PancakeSwap Token",
        "isNative": false,
        "isToken": true,
        "address": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
        "projectLink": "https://pancakeswap.finance/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "5367657766781371114276"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "WBNB",
        "name": "Wrapped BNB",
        "isNative": false,
        "isToken": true,
        "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "projectLink": "https://www.binance.org"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 2500,
    "liquidity": {
      "_type": "bigint",
      "_value": "630190345929588972197926"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "4763384984959359410936960387"
    },
    "tick": -56231,
    "address": "0x133B3D95bAD5405d14d53473671200e9342896BF",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3200"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3200"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "BTCB",
      "name": "Binance BTC",
      "isNative": false,
      "isToken": true,
      "address": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
      "projectLink": "https://bitcoin.org/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "WBNB",
      "name": "Wrapped BNB",
      "isNative": false,
      "isToken": true,
      "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      "projectLink": "https://www.binance.org"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "25789781316567734604"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "BTCB",
        "name": "Binance BTC",
        "isNative": false,
        "isToken": true,
        "address": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        "projectLink": "https://bitcoin.org/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "9664349956985835363195"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "WBNB",
        "name": "Wrapped BNB",
        "isNative": false,
        "isToken": true,
        "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "projectLink": "https://www.binance.org"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 500,
    "liquidity": {
      "_type": "bigint",
      "_value": "12172925466976944508511"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "1008724429615216110030673580581"
    },
    "tick": 50884,
    "address": "0x6bbc40579ad1BBD243895cA0ACB086BB6300d636",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3400"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3400"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USDT",
      "name": "Tether USD",
      "isNative": false,
      "isToken": true,
      "address": "0x55d398326f99059fF775485246999027B3197955",
      "projectLink": "https://tether.to/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "WBNB",
      "name": "Wrapped BNB",
      "isNative": false,
      "isToken": true,
      "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      "projectLink": "https://www.binance.org"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "10276415690839662851981"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDT",
        "name": "Tether USD",
        "isNative": false,
        "isToken": true,
        "address": "0x55d398326f99059fF775485246999027B3197955",
        "projectLink": "https://tether.to/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "10631376557503958950"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "WBNB",
        "name": "Wrapped BNB",
        "isNative": false,
        "isToken": true,
        "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "projectLink": "https://www.binance.org"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 2500,
    "liquidity": {
      "_type": "bigint",
      "_value": "3937035414387550555600"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "3121507333972095691885695708"
    },
    "tick": -64684,
    "address": "0x1401ff943D08a7E098328C1d3a9d388923B115D2",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3200"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3200"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USDT",
      "name": "Tether USD",
      "isNative": false,
      "isToken": true,
      "address": "0x55d398326f99059fF775485246999027B3197955",
      "projectLink": "https://tether.to/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "WBNB",
      "name": "Wrapped BNB",
      "isNative": false,
      "isToken": true,
      "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      "projectLink": "https://www.binance.org"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "4033285196543017785807"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDT",
        "name": "Tether USD",
        "isNative": false,
        "isToken": true,
        "address": "0x55d398326f99059fF775485246999027B3197955",
        "projectLink": "https://tether.to/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "3453561741089834684"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "WBNB",
        "name": "Wrapped BNB",
        "isNative": false,
        "isToken": true,
        "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "projectLink": "https://www.binance.org"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 10000,
    "liquidity": {
      "_type": "bigint",
      "_value": "1919776595720497956088"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "3116038802170601601832670395"
    },
    "tick": -64719,
    "address": "0x6805E0E5333c5c3acCF2930Be4734E2b98f4Ce06",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3200"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3200"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "ETH",
      "name": "Binance-Peg Ethereum Token",
      "isNative": false,
      "isToken": true,
      "address": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
      "projectLink": "https://ethereum.org/en/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "BTCB",
      "name": "Binance BTC",
      "isNative": false,
      "isToken": true,
      "address": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
      "projectLink": "https://bitcoin.org/"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "68380207559268"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "ETH",
        "name": "Binance-Peg Ethereum Token",
        "isNative": false,
        "isToken": true,
        "address": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        "projectLink": "https://ethereum.org/en/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "202261784420"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "BTCB",
        "name": "Binance BTC",
        "isNative": false,
        "isToken": true,
        "address": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        "projectLink": "https://bitcoin.org/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 10000,
    "liquidity": {
      "_type": "bigint",
      "_value": "0"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "14502529052354527819544578827"
    },
    "tick": -33962,
    "address": "0x775eF0eD5aE3120e4C75fD67d1A9fAb31723e2c3",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3200"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3200"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "CAKE",
      "name": "PancakeSwap Token",
      "isNative": false,
      "isToken": true,
      "address": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
      "projectLink": "https://pancakeswap.finance/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "BTCB",
      "name": "Binance BTC",
      "isNative": false,
      "isToken": true,
      "address": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
      "projectLink": "https://bitcoin.org/"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "204451218616966543"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "CAKE",
        "name": "PancakeSwap Token",
        "isNative": false,
        "isToken": true,
        "address": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
        "projectLink": "https://pancakeswap.finance/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "4887349472462"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "BTCB",
        "name": "Binance BTC",
        "isNative": false,
        "isToken": true,
        "address": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        "projectLink": "https://bitcoin.org/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 100,
    "liquidity": {
      "_type": "bigint",
      "_value": "730915172899970"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "374502705920037009234647349"
    },
    "tick": -107096,
    "address": "0x86384E39FFb9384d42a2886b089f4DC518909daF",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3300"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3300"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USDT",
      "name": "Tether USD",
      "isNative": false,
      "isToken": true,
      "address": "0x55d398326f99059fF775485246999027B3197955",
      "projectLink": "https://tether.to/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USD1",
      "name": "USD1",
      "isNative": false,
      "isToken": true,
      "address": "0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d",
      "projectLink": "https://www.worldlibertyfinancial.com/"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "1834534140639686394988284"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDT",
        "name": "Tether USD",
        "isNative": false,
        "isToken": true,
        "address": "0x55d398326f99059fF775485246999027B3197955",
        "projectLink": "https://tether.to/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "14786444475031814620793335"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USD1",
        "name": "USD1",
        "isNative": false,
        "isToken": true,
        "address": "0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d",
        "projectLink": "https://www.worldlibertyfinancial.com/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 100,
    "liquidity": {
      "_type": "bigint",
      "_value": "19957355418646188477376181587"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "79249471814524128056975241997"
    },
    "tick": 5,
    "address": "0x9c4Ee895e4f6Ce07Ada631C508D1306Db7502cCE",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3300"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3300"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USDT",
      "name": "Tether USD",
      "isNative": false,
      "isToken": true,
      "address": "0x55d398326f99059fF775485246999027B3197955",
      "projectLink": "https://tether.to/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "BTCB",
      "name": "Binance BTC",
      "isNative": false,
      "isToken": true,
      "address": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
      "projectLink": "https://bitcoin.org/"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "8244888516698972001351962"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDT",
        "name": "Tether USD",
        "isNative": false,
        "isToken": true,
        "address": "0x55d398326f99059fF775485246999027B3197955",
        "projectLink": "https://tether.to/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "70633987108060569753"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "BTCB",
        "name": "Binance BTC",
        "isNative": false,
        "isToken": true,
        "address": "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        "projectLink": "https://bitcoin.org/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 500,
    "liquidity": {
      "_type": "bigint",
      "_value": "379451069590497303539013"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "244909065944935506953703532"
    },
    "tick": -115590,
    "address": "0x46Cf1cF8c69595804ba91dFdd8d6b960c9B0a7C4",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3400"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3400"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "ETH",
      "name": "Binance-Peg Ethereum Token",
      "isNative": false,
      "isToken": true,
      "address": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
      "projectLink": "https://ethereum.org/en/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "WBNB",
      "name": "Wrapped BNB",
      "isNative": false,
      "isToken": true,
      "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      "projectLink": "https://www.binance.org"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "1177329329376776316540"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "ETH",
        "name": "Binance-Peg Ethereum Token",
        "isNative": false,
        "isToken": true,
        "address": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        "projectLink": "https://ethereum.org/en/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "3030344117016245757923"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "WBNB",
        "name": "Wrapped BNB",
        "isNative": false,
        "isToken": true,
        "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "projectLink": "https://www.binance.org"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 500,
    "liquidity": {
      "_type": "bigint",
      "_value": "31375898182556361070080"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "155429840236062498407039562453"
    },
    "tick": 13477,
    "address": "0xD0e226f674bBf064f54aB47F42473fF80DB98CBA",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3400"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3400"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USDC",
      "name": "Binance-Peg USD Coin",
      "isNative": false,
      "isToken": true,
      "address": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      "projectLink": "https://www.centre.io/usdc"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "WBNB",
      "name": "Wrapped BNB",
      "isNative": false,
      "isToken": true,
      "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      "projectLink": "https://www.binance.org"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "2727884039188164558316413"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDC",
        "name": "Binance-Peg USD Coin",
        "isNative": false,
        "isToken": true,
        "address": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        "projectLink": "https://www.centre.io/usdc"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "2342484453074827530535"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "WBNB",
        "name": "Wrapped BNB",
        "isNative": false,
        "isToken": true,
        "address": "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        "projectLink": "https://www.binance.org"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 100,
    "liquidity": {
      "_type": "bigint",
      "_value": "2698274616920206602022090"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "3116783280196279407991108531"
    },
    "tick": -64714,
    "address": "0xf2688Fb5B81049DFB7703aDa5e770543770612C4",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3300"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3300"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "ETH",
      "name": "Binance-Peg Ethereum Token",
      "isNative": false,
      "isToken": true,
      "address": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
      "projectLink": "https://ethereum.org/en/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USDC",
      "name": "Binance-Peg USD Coin",
      "isNative": false,
      "isToken": true,
      "address": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      "projectLink": "https://www.centre.io/usdc"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "36957649243012"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "ETH",
        "name": "Binance-Peg Ethereum Token",
        "isNative": false,
        "isToken": true,
        "address": "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        "projectLink": "https://ethereum.org/en/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "103530220029658973"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USDC",
        "name": "Binance-Peg USD Coin",
        "isNative": false,
        "isToken": true,
        "address": "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        "projectLink": "https://www.centre.io/usdc"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 100,
    "liquidity": {
      "_type": "bigint",
      "_value": "0"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "4125811846180301287805961767036"
    },
    "tick": 79057,
    "address": "0x62Cf00528cB7aF872C1f9DD426E655C903F16770",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3300"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3300"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  },
  {
    "type": 1,
    "token0": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "CAKE",
      "name": "PancakeSwap Token",
      "isNative": false,
      "isToken": true,
      "address": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
      "projectLink": "https://pancakeswap.finance/"
    },
    "token1": {
      "chainId": 56,
      "decimals": 18,
      "symbol": "USD1",
      "name": "USD1",
      "isNative": false,
      "isToken": true,
      "address": "0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d",
      "projectLink": "https://www.worldlibertyfinancial.com/"
    },
    "reserve0": {
      "numerator": {
        "_type": "bigint",
        "_value": "229537755008143060"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "CAKE",
        "name": "PancakeSwap Token",
        "isNative": false,
        "isToken": true,
        "address": "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
        "projectLink": "https://pancakeswap.finance/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "reserve1": {
      "numerator": {
        "_type": "bigint",
        "_value": "9969846279043919"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "1"
      },
      "currency": {
        "chainId": 56,
        "decimals": 18,
        "symbol": "USD1",
        "name": "USD1",
        "isNative": false,
        "isToken": true,
        "address": "0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d",
        "projectLink": "https://www.worldlibertyfinancial.com/"
      },
      "decimalScale": {
        "_type": "bigint",
        "_value": "1000000000000000000"
      }
    },
    "fee": 100,
    "liquidity": {
      "_type": "bigint",
      "_value": "50680514469343709333"
    },
    "sqrtRatioX96": {
      "_type": "bigint",
      "_value": "17493102964449772067018732586241"
    },
    "tick": 107950,
    "address": "0x553038E1b4B65c9a44d6977019b64c58d02aD1dd",
    "token0ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3300"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    },
    "token1ProtocolFee": {
      "numerator": {
        "_type": "bigint",
        "_value": "3300"
      },
      "denominator": {
        "_type": "bigint",
        "_value": "10000"
      },
      "isPercent": true
    }
  }
]

const converted = parseSerializable(raw)

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

export const pools : any = converted.map(parsePool)
