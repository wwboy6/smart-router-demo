import { Native, ERC20Token, ChainId, CurrencyAmount, TradeType, Percent, Currency } from '@pancakeswap/sdk'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SmartRouter, SmartRouterTrade, SMART_ROUTER_ADDRESSES, SwapRouter } from '@pancakeswap/smart-router'
import { bscTokens } from '@pancakeswap/tokens'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createConfig
} from 'wagmi'
import { bsc } from 'wagmi/chains'

import { createPublicClient, defineChain, hexToBigInt, http, createWalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts';
import { GraphQLClient } from 'graphql-request'

import Big from 'big.js'

import ERC20 from '@openzeppelin/contracts/build/contracts/ERC20.json'

import { PRIVATE_KEY } from './secret'
import './App.css'

const chainId = ChainId.BSC

const smartRounterAddress = SMART_ROUTER_ADDRESSES[chainId];

// const swapMission = {
//   swapFrom: Native.onChain(chainId),
//   swapFromAmount: 10n ** 18n,
//   swapTo: bscTokens.usdt,
// }
const swapMission = {
  swapFrom: bscTokens.usdt,
  swapFromAmount: 650576197739397599575n,
  swapTo: Native.onChain(chainId), // TODO: Native | ERC20Token
}
const { swapFrom, swapFromAmount, swapTo } = swapMission

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
  // batch: {
  //   multicall: true
  // },
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

async function getBalanceOfTokenOrNative(address : `0x${string}` , token : Native | ERC20Token) {
  if (token.isNative) {
    // bsc
    const balance = await viemChainClient.getBalance({
      address: address
    })
    return balance
  } else {
    const balance = await viemChainClient.simulateContract({
      address: token.address,
      abi: ERC20.abi,
      functionName: 'balanceOf',
      args: [smartRounterAddress],
      account: address,
    })
    return balance
  }
}

function calculateGasMargin(value: bigint, margin = 1000n): bigint {
  return (value * (10000n + margin)) / 10000n
}

function printAmount(amount: CurrencyAmount<Currency> | undefined) {
  if (!amount) return '?'
  return new Big(amount.quotient.toString()).div(amount.decimalScale.toString()).toPrecision(5)
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
  
  const fundBsc = useCallback(async () => {
    const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
    // const addr = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    const testClient = createWalletClient({
      account: privateKeyToAccount(privateKey),
      chain,
      transport: http(),
    })
    const transactionId = await testClient.sendTransaction({
      to: account.address,
      value: 1000n * 10n**18n,
    })
    console.log({transactionId})
    const balance = await viemChainClient.getBalance({
      address: account.address
    })
    console.log({balance})
  }, [])
  
  const [trade, setTrade] = useState<SmartRouterTrade<TradeType> | null>(null)
  const amount = useMemo(() => CurrencyAmount.fromRawAmount(swapFrom, swapFromAmount), [])
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
      calldata,
      value,
    }
  }, [trade, account])

  const swap = useCallback(async () => {
    if (!trade || !swapCallParams) {
      return
    }

    const { value, calldata } = swapCallParams
    console.log(`swapCallParams: value: ${value}`);

    console.log('symbol', swapFrom.symbol)

    if (!swapFrom.isNative) {
      // swapping from coin
      // approve
      const { request } = await viemChainClient.simulateContract({
        address: swapFrom.address,
        abi: ERC20.abi,
        functionName: 'approve',
        args: [smartRounterAddress, swapFromAmount],
        account
      })
      const result = await walletClient.writeContract(request)
      console.log('approve', result)
    }

    let balance = await getBalanceOfTokenOrNative(account.address , swapTo)
    console.log('balance before', balance)

    // Estimate gas
    const gasEstimate = await viemChainClient.estimateGas({
      account: account.address,
      to: smartRounterAddress,
      data: calldata,
      value: hexToBigInt(value),
    });
    console.log(`Estimated Gas: ${gasEstimate}`);

    const hash = await walletClient.sendTransaction({
      to: smartRounterAddress,
      data: calldata,
      value: hexToBigInt(value),
      gas: calculateGasMargin(gasEstimate),
    });
    
    console.log(`hash: ${hash}`);

    balance = await getBalanceOfTokenOrNative(account.address , swapTo)
    console.log('balance after', balance)

  }, [swapCallParams, walletClient, account.address])

  // const checkBalance = useCallback(async () => {
  //   const balance = await viemChainClient.getBalance({
  //     address: account.address,
  //   })
  //   console.log({balance})
  //   ERC20Token.
  //   // swapTo.
  // }, [account.address])

  return (
    <div className="App">
      <header className="App-header">
        <p>Pancakeswap Smart Router Example.</p>
        {isLocal ? <p>!! Local !!</p> : <p> Main Net</p>}
        <p>
          Get best quote swapping from {amount.toExact()} {amount.currency.symbol} to {' '}
          {printAmount(trade?.outputAmount) || '?'} {swapTo.symbol}
        </p>
        <p><button onClick={fundBsc}>Get Fund</button></p>
        <p>{!trade ? <button onClick={getBestRoute}>Get Quote</button> : <button onClick={swap}>Swap</button>}</p>
      </header>
    </div>
  )
}
