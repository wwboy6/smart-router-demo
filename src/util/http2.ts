import  pLimit from 'p-limit'
import { createTransport, http, HttpTransportConfig } from "viem";


export function limitedHttp(url?: string | undefined, config?: HttpTransportConfig<undefined, false> | undefined, concurrentLimit: number = 15) { // TODO: type
  const limit = pLimit(concurrentLimit);
  const baseTransport = http(url, config); // Use Viem's default HTTP transport
  return (transportParams: any) => { // TODO: type
    const t = baseTransport(transportParams)
    return createTransport({
      ...baseTransport,
      key: 'limited http',
      name: 'Limited HTTP',
      request: (args, options) => limit(() => t.request(args, options)) as any, // TODO: type
      type: 'custom',
    })
  }
}
