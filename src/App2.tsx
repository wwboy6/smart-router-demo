import { Native, ChainId, CurrencyAmount, TradeType, Percent, Currency } from '@pancakeswap/sdk'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SmartRouter, SmartRouterTrade, SMART_ROUTER_ADDRESSES, SwapRouter } from '@pancakeswap/smart-router'
import { bscTokens } from '@pancakeswap/tokens'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  WagmiProvider,
  createConfig,
  useAccount,
  useConnect,
  useSwitchChain,
  useChainId,
  useSendTransaction,
} from 'wagmi'
import { bsc } from 'wagmi/chains'

import { createPublicClient, defineChain, hexToBigInt, http, createWalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts';
import { GraphQLClient } from 'graphql-request'

import Big from 'big.js'

import './App.css'
import { PRIVATE_KEY } from './secret'

const chainId = ChainId.BSC
const swapFrom = Native.onChain(chainId)
// const swapFrom = bscTokens.cake
const swapTo = bscTokens.usdt
// const swapTo = bscTokens.cake
// const swapTo = bscTokens.ace
const queryClient = new QueryClient()

// TODO:
const isLocal = true;

// let chain;

// if (isLocal) {
  let chain = defineChain({
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
  });
// } else {
//   chain = bsc;
// }

const viemChainClient = createPublicClient({
  chain: chain,
  transport: http(),
  batch: {
    multicall: true
  },
});

const viemChainClientForGetPool = createPublicClient({
  chain: bsc,
  transport: http('https://bsc-dataseed1.binance.org'),
  // batch: {
  //   multicall: {
  //     batchSize: 1024 * 200,
  //   },
  // },
});

// const viemChainClient = createPublicClient({
//   chain: bsc,
//   transport: http('https://bsc-dataseed1.binance.org'),
//   batch: {
//     multicall: {
//       batchSize: 1024 * 200,
//     },
//   },
// })

export const config = createConfig({
  chains: [chain],
  transports: {
    // 31337: http(),
    56: http(),
  },
})

// export const config = createConfig({
//   chains: [bsc],
//   transports: {
//     [bsc.id]: http('https://bsc-dataseed1.binance.org'),
//   },
// })

const v3SubgraphClient = new GraphQLClient('https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc')
const v2SubgraphClient = new GraphQLClient('https://proxy-worker-api.pancakeswap.com/bsc-exchange')

const quoteProvider = SmartRouter.createQuoteProvider({
  onChainProvider: () => viemChainClient,
})

function calculateGasMargin(value: bigint, margin = 1000n): bigint {
  return (value * (10000n + margin)) / 10000n
}

function printAmount(amount: CurrencyAmount<Currency> | undefined) {
  if (!amount) return '?'
  return new Big(amount.quotient.toString()).div(amount.decimalScale.toString()).toPrecision(5)
}

export default function SmartRouterExample() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function Main() {
  const currentChainId = useChainId()
  // const { address, isConnected } = useAccount()
  // const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  const privateKey = PRIVATE_KEY
  // const addr = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  const account = privateKeyToAccount(privateKey);
  const address = createWalletClient({
    account,
    chain,
    transport: http(),
  })
  const isConnected = true
  const { connect, connectors } = useConnect()
  const { switchChainAsync: switchNetwork } = useSwitchChain()
  const { sendTransactionAsync } = useSendTransaction()

  const [trade, setTrade] = useState<SmartRouterTrade<TradeType> | null>(null)
  const [trade2, setTrade2] = useState<SmartRouterTrade<TradeType> | null>(null)
  const amount = useMemo(() => CurrencyAmount.fromRawAmount(swapFrom, 10 ** 18), [])
  const getBestRoute = useCallback(async () => {
    const [v2Pools, v3Pools] = await Promise.all([
      SmartRouter.getV2CandidatePools({
        onChainProvider: () => viemChainClientForGetPool,
        v2SubgraphProvider: () => v2SubgraphClient,
        v3SubgraphProvider: () => v3SubgraphClient,
        currencyA: amount.currency,
        currencyB: swapTo,
      }),
      SmartRouter.getV3CandidatePools({
        onChainProvider: () => viemChainClientForGetPool,
        subgraphProvider: () => v3SubgraphClient,
        currencyA: amount.currency,
        currencyB: swapTo,
        subgraphFallback: false,
      }),
    ])
    const pools = [...v2Pools, ...v3Pools]
    // console.log(pools)
    // ---- forward trading
    const td = await SmartRouter.getBestTrade(amount, swapTo, TradeType.EXACT_INPUT, {
      gasPriceWei: () => viemChainClient.getGasPrice(),
      maxHops: 2,
      maxSplits: 2,
      poolProvider: SmartRouter.createStaticPoolProvider(pools),
      quoteProvider,
      quoterOptimization: true,
    })
    console.log(td)
    setTrade(td)
    if (td) {
      // ---- backward trading
      const td2 = await SmartRouter.getBestTrade(td.outputAmount, swapFrom, TradeType.EXACT_INPUT, {
        gasPriceWei: () => viemChainClient.getGasPrice(),
        maxHops: 2,
        maxSplits: 2,
        poolProvider: SmartRouter.createStaticPoolProvider(pools),
        quoteProvider,
        quoterOptimization: true,
      })
      console.log(td2)
      setTrade2(td2)
    }
  }, [amount])

  const swapCallParams = useMemo(() => {
    if (!trade) {
      return null
    }
    const { value, calldata } = SwapRouter.swapCallParameters(trade, {
      recipient: account.address,
      slippageTolerance: new Percent(1),
    })
    return {
      address: SMART_ROUTER_ADDRESSES[chainId],
      calldata,
      value,
    }
  }, [trade, address])

  // FIXME: approve!!

  const swapCallParams2 = useMemo(() => {
    if (!trade2) {
      return null
    }
    const { value, calldata } = SwapRouter.swapCallParameters(trade2, {
      recipient: account.address,
      slippageTolerance: new Percent(1),
    })
    return {
      address: SMART_ROUTER_ADDRESSES[chainId],
      calldata,
      value,
    }
  }, [trade2, address])

  const swap = useCallback(async () => {
    if (!trade || !swapCallParams || !address) {
      return
    }
    if (!trade2 || !swapCallParams2) {
      return
    }

    const { value, calldata, address: routerAddress } = swapCallParams
    console.log(`swapCallParams: value: ${value}`);

    // const tx = {
    //   account: address,
    //   to: routerAddress,
    //   data: calldata,
    //   value: hexToBigInt(value),
    // }
    // const gasEstimate = await viemChainClient.estimateGas(tx)

    // await sendTransactionAsync({
    //   account: address,
    //   chainId,
    //   to: routerAddress,
    //   data: calldata,
    //   value: hexToBigInt(value),
    //   gas: calculateGasMargin(gasEstimate),
    // })

    // console.log({
    //   account: address,
    //   chainId,
    //   to: routerAddress,
    //   data: calldata,
    //   value: hexToBigInt(value),
    //   // gas: calculateGasMargin(gasEstimate),
    // })
    
    // Estimate gas
    const gasEstimate = await viemChainClient.estimateGas({
      account: account.address,
      to: routerAddress,
      data: calldata,
      value: hexToBigInt(value),
    });
    console.log(`Estimated Gas: ${gasEstimate}`);

    const hash = await address.sendTransaction({
      to: routerAddress,
      data: calldata,
      value: hexToBigInt(value),
      gas: calculateGasMargin(gasEstimate),
    });
    
    console.log(`hash: ${hash}`);

    
    const { value: value2, calldata: calldata2, address: routerAddress2 } = swapCallParams2
    console.log(`swapCallParams2: value: ${value2}`);

    // // FIXME: approval
    // if (trade2.inputAmount.currency.symbol !== "BNB") {
    //   SmartRouter.
    //   trade2.inputAmount.currency
    // }

    // Estimate gas
    const gasEstimate2 = await viemChainClient.estimateGas({
      account: account.address,
      to: routerAddress2,
      data: calldata2,
      value: hexToBigInt(value2),
    });
    console.log(`Estimated Gas: ${gasEstimate2}`);

    const hash2 = await address.sendTransaction({
      to: routerAddress2,
      data: calldata2,
      value: hexToBigInt(value2),
      gas: calculateGasMargin(gasEstimate2),
    });

    console.log(`hash2: ${hash2}`);

  }, [swapCallParams, address, account.address])

  // const checkBalance = useCallback(async () => {
  //   const balance = await viemChainClient.getBalance({
  //     address: account.address,
  //   })
  //   console.log({balance})
  //   ERC20Token.
  //   // swapTo.
  // }, [account.address])

  useEffect(() => {
    if (isConnected && currentChainId !== chainId) {
      switchNetwork?.({ chainId })
    }
  }, [isConnected, switchNetwork, currentChainId])

  return (
    <div className="App">
      <header className="App-header">
        <p>Pancakeswap Smart Router Example.</p>
        {isLocal ? <p>!! Local !!</p> : <p> Main Net</p>}
        <p>
          Get best quote swapping from {amount.toExact()} {amount.currency.symbol} to {' '}
          {printAmount(trade?.outputAmount) || '?'} {swapTo.symbol}
        </p>
        <p>
          Get best quote swapping from {printAmount(trade?.outputAmount)} {swapTo.symbol} to {' '}
          {printAmount(trade2?.outputAmount)} {amount.currency.symbol}
        </p>
        <p>
          {isConnected ? (
            // address
            "connected"
          ) : (
            <button onClick={() => connect({ connector: connectors[0] })}>Connect wallet</button>
          )}
        </p>
        <p>{!trade ? <button onClick={getBestRoute}>Get Quote</button> : <button onClick={swap}>Swap</button>}</p>
      </header>
    </div>
  )
}
