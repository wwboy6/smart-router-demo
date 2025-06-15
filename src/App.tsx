import { Native, ERC20Token, ChainId, CurrencyAmount, TradeType, Percent, Currency } from '@pancakeswap/sdk'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SmartRouter, SmartRouterTrade, SMART_ROUTER_ADDRESSES, SwapRouter } from '@pancakeswap/smart-router'
import { bscTokens } from '@pancakeswap/tokens'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createConfig } from 'wagmi'
import { bsc } from 'viem/chains'

import { defineChain, hexToBigInt, http, createWalletClient, BaseError, ContractFunctionRevertedError, Chain, Hex, createPublicClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts';
import { GraphQLClient } from 'graphql-request'

import Big from 'big.js'

import ERC20 from '@openzeppelin/contracts/build/contracts/ERC20.json'

import { PRIVATE_KEY } from './secret'
import './App.css'
// import { toSerializable } from './util'
;
import { printAmount, printBalance, toSerializable } from './util';

import FlashLoadSmartRouterInfo from './contract/FlashLoadSmartRouter.json'
import { v3PoolAbi } from '@pancakeswap/v3-sdk'
import { limitedHttp } from './util/http2'

const FlashLoadSmartRouterAddress = "0xeed8260f27BdbBD8e79761541C63a1D82A33518c"

const chainId = ChainId.BSC

const smartRouterAddress = SMART_ROUTER_ADDRESSES[chainId];

const nativeCurrency = Native.onChain(chainId)

const swapMission = {
  swapFrom: bscTokens.wbnb,
  // swapFromAmount: 25n * 10n ** 16n,
  // swapFromAmount: 5n * 10n ** 17n,

  swapFromAmount: 10n ** 18n,
  // swapFromAmount: 15n * 10n ** 17n,
  // swapFromAmount: 2n * 10n ** 18n,
  // swapFromAmount: 3n * 10n ** 18n,
  // swapFromAmount: 6n * 10n ** 18n,
  // swapFromAmount: 12n * 10n ** 18n,
  // swapFromAmount: 25n * 10n ** 18n,
  // swapFromAmount: 50n * 10n ** 18n,
  // swapFromAmount: 100n * 10n ** 18n,
  // swapFromAmount: 1000n * 10n ** 18n,
  // swapFromAmount: 100000n * 10n ** 18n,
  swapTo: bscTokens.busd,
}
// const swapMission = {
//   swapFrom: bscTokens.babycake,
//   swapFromAmount: 3279720347055191991407771n,
//   swapTo: bscTokens.usdt,
// }
const { swapFrom, swapFromAmount, swapTo } = swapMission

const queryClient = new QueryClient()

// TODO:
const isLocal = false;

let chain : Chain;

if (isLocal) {
  chain = defineChain({
    // id: 31337,
    id: 56,
    name: 'Local Hardhat',
    network: 'hardhat',
    nativeCurrency: {
      decimals: 18,
      name: 'Binance Coin',
      symbol: 'BNB',
    },
    rpcUrls: {
      default: {
        http: ['http://127.0.0.1:8545'],
      },
      public: {
        http: ['http://127.0.0.1:8545'],
      },
    },
    contracts: {
      multicall3: { address: "0xcA11bde05977b3631167028862bE2a173976CA11" },
    },
  });
} else {
  // chain = bsc;
  chain = defineChain({
    id: 56,
    name: 'BNB Smart Chain',
    nativeCurrency: {
      decimals: 18,
      name: 'BNB',
      symbol: 'BNB',
    },
    rpcUrls: {
      default: { http: ['https://56.rpc.thirdweb.com'] },
      // default: { http: ['https://bsc-mainnet.infura.io/v3/05c1dbfaa33f43268f953de9e26bef0d'] },
    },
    blockExplorers: {
      default: {
        name: 'BscScan',
        url: 'https://bscscan.com',
        apiUrl: 'https://api.bscscan.com/api',
      },
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 15921452,
      },
    },
  })
}

// Note: this client is hijacked
const viemChainClient = createPublicClient({
  chain: chain,
  transport: limitedHttp(chain.rpcUrls.default.http[0], {
    retryCount: Infinity, // FIXME:
    retryDelay: 5 * 1000,
  }, 5), // TODO:
  batch: {
    multicall: {
      batchSize: 2**10, // TODO: determine optimal batch size
    }
  },
})

export const config = createConfig({
  chains: [chain],
  transports: {
    [bsc.id]: http(),
  },
})

const v2SubgraphClient = new GraphQLClient('https://proxy-worker-api.pancakeswap.com/bsc-exchange')
const v3SubgraphClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc')

// const quoteProvider = SmartRouter.createQuoteProvider({
//   onChainProvider: () => viemChainClient,
// })
const quoteProvider = SmartRouter.createOffChainQuoteProvider()

async function getSwapPools(swapFrom : Currency, swapTo : Currency) { // TODO: return type
  // let swapPools = getPools(swapFrom.symbol, swapTo.symbol)
  let swapPools = null
  if (!swapPools) {
    console.warn('fetch swap pools !!!', swapFrom.symbol, swapTo.symbol)
    // const v2p = SmartRouter.getV2CandidatePools({
    //   onChainProvider: () => viemChainClient,
    //   v2SubgraphProvider: () => v2SubgraphClient,
    //   v3SubgraphProvider: () => v3SubgraphClient,
    //   currencyA: swapFrom,
    //   currencyB: swapTo,
    // })
    // const v3p = SmartRouter.getV3CandidatePools({
    //   onChainProvider: () => viemChainClient,
    //   subgraphProvider: () => v3SubgraphClient,
    //   currencyA: swapFrom,
    //   currencyB: swapTo,
    //   subgraphFallback: false,
    // })
    // const [v2Pools, v3Pools] = await Promise.all([
    //   v2p,
    //   v3p,
    // ])
    // const v2Pools = await SmartRouter.getV2CandidatePools({
    //   onChainProvider: () => viemChainClient,
    //   v2SubgraphProvider: () => v2SubgraphClient,
    //   v3SubgraphProvider: () => v3SubgraphClient,
    //   currencyA: swapFrom,
    //   currencyB: swapTo,
    // })
    // debugger
    const v3Pools = await SmartRouter.getV3CandidatePools({
      onChainProvider: () => viemChainClient,
      subgraphProvider: () => v3SubgraphClient,
      currencyA: swapFrom,
      currencyB: swapTo,
      subgraphFallback: false,
    })
    // swapPools = [...v2Pools, ...v3Pools]
    swapPools = v3Pools
    console.log(swapPools)
    console.log(JSON.stringify(toSerializable(swapPools))) // TODO: use library instead
  }
  return swapPools
}

async function getBalanceOfTokenOrNative(address : Hex , token : Native | ERC20Token) : Promise<bigint> {
  if (token.isNative) {
    // bsc
    const balance = await viemChainClient.getBalance({
      address
    })
    return balance
  } else {
    const balance : any = await viemChainClient.readContract({
      address: token.address,
      abi: ERC20.abi,
      functionName: 'balanceOf',
      args: [address],
    })
    return balance
  }
}

function calculateGasMargin(value: bigint, margin = 1000n): bigint {
  return (value * (10000n + margin)) / 10000n
}

// update trade to use one route per each swap, and transfer all balance in the middle
function prepareTradeForCustomContract(trade : SmartRouterTrade<TradeType>) : SmartRouterTrade<TradeType> {
  const inputAmount = CurrencyAmount.fromRawAmount(trade.inputAmount.currency, 0n) // get all transferred balance
  const outputAmount = CurrencyAmount.fromRawAmount(trade.outputAmount.currency, 0n) // no minimum output
  const updatedTrade : SmartRouterTrade<TradeType> = {
    ...trade,
    inputAmount,
    outputAmount,
    routes: [
      {
        ...trade.routes[0],
        inputAmount,
        outputAmount,
        percent: 100,
      }
    ]
  }
  return updatedTrade
}

export default function SmartRouterExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}

function Main() {
  const account = privateKeyToAccount(PRIVATE_KEY);
  const walletClient = createWalletClient({
    account,
    chain,
    transport: http(),
  })

  const [gasPriceWei, setGasPriceWei] = useState(0n)

  useEffect(() => {
    (async() => {
      const gpw = await viemChainClient.getGasPrice()
      setGasPriceWei(gpw)
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getFund = useCallback(async () => {
    if (!gasPriceWei) return
    const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
    // const addr = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    const testClient = createWalletClient({
      account: privateKeyToAccount(privateKey),
      chain,
      transport: http(),
    })
    const ba = 20n * 10n**18n
    const transactionId = await testClient.sendTransaction({
      to: account.address,
      value: ba,
    })
    console.log({transactionId})
    const balance = await viemChainClient.getBalance({
      address: account.address
    })
    console.log({balance})
    // prepare initial token
    if (swapFrom.isToken) {
      const swapPools = await getSwapPools(nativeCurrency, swapFrom)
      const amount = CurrencyAmount.fromRawAmount(nativeCurrency, ba)
      const trade = await SmartRouter.getBestTrade(amount, swapFrom, TradeType.EXACT_INPUT, {
        gasPriceWei,
        maxHops: 2,
        maxSplits: 2,
        poolProvider: SmartRouter.createStaticPoolProvider(swapPools),
        quoteProvider,
        quoterOptimization: true,
      })
      if (!trade) throw new Error('no trade found')
      console.log(trade)
      const { value, calldata } = SwapRouter.swapCallParameters(trade, {
        recipient: account.address,
        slippageTolerance: new Percent(1),
      })
      // Estimate gas
      const gasEstimate = await viemChainClient.estimateGas({
        account: account.address,
        to: smartRouterAddress,
        data: calldata,
        value: hexToBigInt(value),
      });
      console.log(`Estimated Gas: ${gasEstimate}`);
      const hash = await walletClient.sendTransaction({
        to: smartRouterAddress,
        data: calldata,
        value: hexToBigInt(value),
        gas: calculateGasMargin(gasEstimate),
      });
      console.log(hash)
    }
  }, [account.address, gasPriceWei, walletClient])

  const getBalances = useCallback(async () => {
    let balance = await getBalanceOfTokenOrNative(account.address, swapFrom)
    console.log(swapFrom.symbol, printBalance(balance, 10n**BigInt(swapFrom.decimals)), balance)
    balance = await getBalanceOfTokenOrNative(account.address, swapTo)
    console.log(swapTo.symbol, printBalance(balance, 10n**BigInt(swapTo.decimals)), balance)
  }, [account.address])
  
  const [trade, setTrade] = useState<SmartRouterTrade<TradeType> | null>(null)
  const amount = useMemo(() => CurrencyAmount.fromRawAmount(swapFrom, swapFromAmount), [])
  const [trade2, setTrade2] = useState<SmartRouterTrade<TradeType> | null>(null)
  const [isOneway, setIsOneway] = useState<boolean>(false)
  const handleIsOnewayToggle = useCallback(() => {
    setIsOneway(!isOneway)
  }, [isOneway])

  const getBestRoute = useCallback(async () => {
    if (!gasPriceWei) return
    const swapPools = await getSwapPools(amount.currency, swapTo)
    // ---- forward trading
    const td = await SmartRouter.getBestTrade(amount, swapTo, TradeType.EXACT_INPUT, {
      gasPriceWei,
      maxHops: 2,
      maxSplits: 2,
      poolProvider: SmartRouter.createStaticPoolProvider(swapPools),
      quoteProvider,
      quoterOptimization: true,
    })
    console.log(td)
    setTrade(td)
    if (!td) return
    //
    // const poolAddresses = [...new Set(td.routes.map(r => r.pools.map(p => (p as any).address)).flat())]
    const pools = td.routes.map(r => r.pools).flat()
    console.log("pools", pools)
    const poolAddresses = new Set(pools.map(p => (p as any).address))
    
    if (!isOneway) {
      // ---- backward trading
      // exclude pools of forward trading
      const swapPools2 = swapPools.filter((p : any) => !poolAddresses.has(p.address) )
      //
      const td2 = await SmartRouter.getBestTrade(td.outputAmount, swapFrom, TradeType.EXACT_INPUT, {
        gasPriceWei,
        maxHops: 2,
        maxSplits: 2,
        poolProvider: SmartRouter.createStaticPoolProvider(swapPools2),
        quoteProvider,
        quoterOptimization: true,
      })
      console.log(td2)
      setTrade2(td2)
      if (!td2) return
        const pools2 = td2.routes.map(r => r.pools).flat()
        console.log("pools2", pools2)
        const poolAddresses2 = new Set(pools2.map(p => (p as any).address))
        const intersectingAddress = poolAddresses.intersection(poolAddresses2)
        if (intersectingAddress.size) console.warn('intersecting pool', intersectingAddress)
        //
      console.log('profit', Big((td2.outputAmount.numerator - swapFromAmount).toString()).div((10n**18n).toString()).toString())
    }
  }, [amount, isOneway, gasPriceWei])

  const swapCallParams = useMemo(() => {
    if (!trade) {
      return null
    }
    const { value, calldata } = SwapRouter.swapCallParameters(trade, {
      recipient: account.address,
      slippageTolerance: new Percent(1),
    })
    return {
      calldata,
      value,
    }
  }, [trade, account])

  const swapCallParams2 = useMemo(() => {
    if (!trade2) {
      return null
    }
    const { value, calldata } = SwapRouter.swapCallParameters(trade2, {
      recipient: account.address,
      slippageTolerance: new Percent(1),
    })
    return {
      calldata,
      value,
    }
  }, [trade2, account])

  const _swap = useCallback(async (value : Hex, calldata : Hex, swapFrom : Currency, swapFromAmount : bigint, swapTo : Currency) => {
    console.log('_swap')
    console.log('symbol', swapFrom.symbol)

    if (!swapFrom.isNative) {
      // swapping from coin
      // approve
      const { request } = await viemChainClient.simulateContract({
        address: swapFrom.address,
        abi: ERC20.abi,
        functionName: 'approve',
        args: [smartRouterAddress, swapFromAmount],
        account
      })
      const result = await walletClient.writeContract(request)
      console.log('approve', swapFromAmount, result)
    }

    let balancef0 : bigint, balancef1 : bigint, balancet0 : bigint, balancet1 : bigint
    let balanceN0 : bigint = 0n, balanceN1 : bigint;

    balancef0 = await getBalanceOfTokenOrNative(account.address , swapFrom)
    console.log('balance before', swapFrom.symbol, printBalance(balancef0))
    balancet0 = await getBalanceOfTokenOrNative(account.address , swapTo)
    console.log('balance before', swapTo.symbol, printBalance(balancet0))

    if (swapFrom.isToken && swapTo.isToken) {
      // also display native balance
      balanceN0 = await getBalanceOfTokenOrNative(account.address , nativeCurrency)
      console.log('native balance before', printBalance(balanceN0))
    }

    // Estimate gas
    let gasEstimate = 0n
    let error
    for (let i = 0; i < 3; ++i) {
      try {
        gasEstimate = await viemChainClient.estimateGas({
          account: account.address,
          to: smartRouterAddress,
          data: calldata,
          value: hexToBigInt(value),
        });
        console.log(`Estimated Gas: ${gasEstimate}`);
        break;
      } catch (e) {
        error = e
        console.warn('estimate gas failed', e)
      }
    }
    if (!gasEstimate) throw error

    const hash = await walletClient.sendTransaction({
      to: smartRouterAddress,
      data: calldata,
      value: hexToBigInt(value),
      gas: calculateGasMargin(gasEstimate),
      // gas: 10000000n
    });
    
    console.log(`hash: ${hash}`);

    balancef1 = await getBalanceOfTokenOrNative(account.address , swapFrom)
    console.log('balance after', swapFrom.symbol, printBalance(balancef1), printBalance(balancef1 - balancef0))
    balancet1 = await getBalanceOfTokenOrNative(account.address , swapTo)
    console.log('balance after', swapTo.symbol, printBalance(balancet1), printBalance(balancet1 - balancet0))

    if (swapFrom.isToken && swapTo.isToken) {
      // also display native balance
      balanceN1 = await getBalanceOfTokenOrNative(account.address , nativeCurrency)
      console.log('native after', printBalance(balanceN1), printBalance(balanceN1 - balanceN0))
    }

    return balancet1
  }, [account, walletClient])

  const swap = useCallback(async () => {
    if (!swapCallParams) return

    if (!isOneway && !swapCallParams) return

    const originalBscBalance = await getBalanceOfTokenOrNative(account.address, swapFrom)
    console.log({originalBscBalance})

    let balanceN0 : bigint = 0n, balanceN1 : bigint
    if (swapFrom.isToken && swapTo.isToken) {
      // also display native balance
      balanceN0 = await getBalanceOfTokenOrNative(account.address , nativeCurrency)
      console.log('native balance before swap', printBalance(balanceN0))
    }

    const { value, calldata } = swapCallParams
    const balance = await _swap(value, calldata, swapFrom, swapFromAmount, swapTo)

    if (!isOneway && swapCallParams2) {
      const { value: value2, calldata: calldata2 } = swapCallParams2
      await _swap(value2, calldata2, swapTo, balance, swapFrom)
    }

    const finalBscBalance = await getBalanceOfTokenOrNative(account.address, swapFrom)
    console.log({finalBscBalance})
    console.log('net different', swapFrom.symbol, printBalance(finalBscBalance - originalBscBalance))

    if (swapFrom.isToken && swapTo.isToken) {
      // also display native balance
      balanceN1 = await getBalanceOfTokenOrNative(account.address , nativeCurrency)
      console.log('native balance after swap', printBalance(balanceN1), printBalance(balanceN1 - balanceN0))
    }

  }, [swapCallParams, swapCallParams2, _swap, account.address, isOneway])

  const swap2 = useCallback(async () => {
    if (!trade || !trade2) return
    // TODO: seperate multiple swap if more than 1 route for any trade
    // update trade to use one route per each swap, and transfer all balance in the middle
    const updatedTrade = prepareTradeForCustomContract(trade)
    const updatedTrade2 = prepareTradeForCustomContract(trade2)
    console.log({updatedTrade})
    console.log({updatedTrade2})
    //
    const { calldata } = SwapRouter.swapCallParameters(updatedTrade, {
      recipient: FlashLoadSmartRouterAddress,
      slippageTolerance: new Percent(1), // TODO:
    })
    const { calldata: calldata2 } = SwapRouter.swapCallParameters(updatedTrade2, {
      recipient: FlashLoadSmartRouterAddress,
      slippageTolerance: new Percent(1), // TODO:
    })
    // log
    const originalBscBalance = await getBalanceOfTokenOrNative(account.address, swapFrom)
    console.log({originalBscBalance})
    const balanceN0 = await getBalanceOfTokenOrNative(account.address , nativeCurrency)
    console.log('native balance before swap', printBalance(balanceN0))
    // approve
    const { request } = await viemChainClient.simulateContract({
      address: swapFrom.address,
      abi: ERC20.abi,
      functionName: 'approve',
      args: [FlashLoadSmartRouterAddress, swapFromAmount],
      account
    })
    let result = await walletClient.writeContract(request)
    console.log('approve', swapFromAmount, result)
    // TODO: remove approval upon failure?
    //
    // result = await walletClient.writeContract({
    //   address: FlashLoadSmartRouterAddress,
    //   abi: FlashLoadSmartRouterInfo.abi,
    //   functionName: "trade",
    //   args: [swapFrom.address, swapFromAmount, calldata, swapTo.address, calldata2],
    // })
    // console.log(result)
    try {
      const { request, result: r } = await viemChainClient.simulateContract({
        account,
        address: FlashLoadSmartRouterAddress,
        abi: FlashLoadSmartRouterInfo.abi,
        functionName: "trade",
        args: [swapFrom.address, swapFromAmount, calldata, swapTo.address, calldata2],
      })
      console.log(r)
      result = await walletClient.writeContract(request)
    } catch (err) {
      if (err instanceof BaseError) {
        const revertError = err.walk(err => err instanceof ContractFunctionRevertedError)
        if (revertError instanceof ContractFunctionRevertedError) {
          console.error('reason', revertError.reason)
          const errorName = revertError.data?.errorName ?? ''
          // do something with `errorName`
          console.error({errorName})
        }
      }
    }
    console.log(result)
    // log
    const finalBscBalance = await getBalanceOfTokenOrNative(account.address, swapFrom)
    console.log({finalBscBalance})
    console.log('net different', swapFrom.symbol, printBalance(finalBscBalance - originalBscBalance))
    const balanceN1 = await getBalanceOfTokenOrNative(account.address , nativeCurrency)
    console.log('native balance after swap', printBalance(balanceN1), printBalance(balanceN1 - balanceN0))
  }, [account, trade, trade2, walletClient])

  const [v3PoolAddress, setV3PoolAddress] = useState<Hex>('0x36696169c63e42cd08ce11f5deebbcebae652050') // USDT - WBNB
  const handleV3PoolAddressChange = (event: any) => {
    setV3PoolAddress(event.target.value);
  };

  const fetchV3PoolInfo = useCallback(async () => {
    // const result = await viemChainClient.readContract({
    //   address: v3PoolAddress,
    //   abi: v3PoolAbi,
    //   functionName: 'slot0',
    //   // args: [],
    // })
    
    const response = await viemChainClient.multicall({
      contracts: Array(20).fill({
        address: v3PoolAddress,
        abi: v3PoolAbi,
        functionName: 'slot0',
        // args: [],
      })
    })
    response.forEach(r => {
      if (r.result) {
        const [sqrtPriceX96, tick, , , , feeProtocol] = r.result as any
        console.warn({
          sqrtPriceX96,
          tick,
          feeProtocol,
        })
      }

    })
  }, [v3PoolAddress])

  return (
    <div className="App">
      <header className="App-header">
        <p>Pancakeswap Smart Router Example.</p>
        {isLocal ? <p>!! Local !!</p> : <p> Main Net</p>}
        <p>
          Get best quote swapping from {printAmount(amount)} {amount.currency.symbol} to {' '}
          {printAmount(trade?.outputAmount) || '?'} {swapTo.symbol}
        </p>
        <p>
          Get best quote swapping from {printAmount(trade?.outputAmount)} {swapTo.symbol} to {' '}
          {printAmount(trade2?.outputAmount)} {amount.currency.symbol}
        </p>
        <p>
          <button onClick={getFund}>Get Fund</button>
          <button onClick={getBalances}>Get Balance</button>
        </p>
        <p>
          <input type="checkbox" checked={isOneway} onChange={handleIsOnewayToggle} />One Way {'  '}
          {!trade ? <button onClick={getBestRoute}>Get Quote</button> : <button onClick={swap}>Swap</button>}
        </p>
        <p>
          <button onClick={swap2}>swap2</button>
        </p>
        <p>
          <input value={v3PoolAddress} onChange={handleV3PoolAddressChange} style={{"width": 400}}></input>
          <button onClick={fetchV3PoolInfo}>fetch v3 pool info</button>
        </p>
      </header>
    </div>
  )
}
