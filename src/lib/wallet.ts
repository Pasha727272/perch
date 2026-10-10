import { ROBINHOOD_CHAIN } from '../config'

export type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
  on?: (event: string, handler: (...args: unknown[]) => void) => void
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void
  isPhantom?: boolean
  isMetaMask?: boolean
  isRobinhood?: boolean
  providers?: EthereumProvider[]
}

export type WalletId = 'phantom' | 'robinhood'

declare global {
  interface Window {
    ethereum?: EthereumProvider
    phantom?: { ethereum?: EthereumProvider }
    robinhood?: { ethereum?: EthereumProvider }
    robinhoodWallet?: EthereumProvider
  }
}

type Eip6963Detail = {
  info: { uuid: string; name: string; rdns: string }
  provider: EthereumProvider
}

const announced = new Map<string, Eip6963Detail>()

export function refreshProviders() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event('eip6963:requestProvider'))
}

if (typeof window !== 'undefined') {
  window.addEventListener('eip6963:announceProvider', ((e: CustomEvent<Eip6963Detail>) => {
    announced.set(e.detail.info.uuid, e.detail)
  }) as EventListener)
  refreshProviders()
}

export function truncateAddress(address: string) {
  if (address.length < 10) return address
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

function find6963(test: (d: Eip6963Detail) => boolean) {
  for (const d of announced.values()) {
    if (test(d)) return d.provider
  }
  return null
}

export function getPhantomProvider(): EthereumProvider | null {
  refreshProviders()
  if (window.phantom?.ethereum) return window.phantom.ethereum
  const from6963 = find6963(
    (d) =>
      d.info.rdns.toLowerCase().includes('phantom') ||
      d.info.name.toLowerCase().includes('phantom'),
  )
  if (from6963) return from6963
  if (window.ethereum?.isPhantom) return window.ethereum
  return window.ethereum?.providers?.find((p) => p.isPhantom) ?? null
}

export function getRobinhoodProvider(): EthereumProvider | null {
  refreshProviders()
  if (window.robinhood?.ethereum) return window.robinhood.ethereum
  if (window.robinhoodWallet) return window.robinhoodWallet

  const from6963 = find6963(
    (d) =>
      d.info.rdns.toLowerCase().includes('robinhood') ||
      d.info.name.toLowerCase().includes('robinhood'),
  )
  if (from6963) return from6963

  const flagged =
    window.ethereum?.providers?.find((p) => p.isRobinhood) ??
    (window.ethereum?.isRobinhood ? window.ethereum : null)
  if (flagged) return flagged

  // Browser EVM wallet (MetaMask etc.) → we add Robinhood Chain on connect
  if (window.ethereum && !window.ethereum.isPhantom) return window.ethereum
  if (window.ethereum?.providers?.length) {
    const nonPhantom = window.ethereum.providers.find((p) => !p.isPhantom)
    if (nonPhantom) return nonPhantom
  }
  return null
}

export function walletInstalled(id: WalletId) {
  return id === 'phantom' ? Boolean(getPhantomProvider()) : Boolean(getRobinhoodProvider())
}

const INSTALL: Record<WalletId, string> = {
  phantom: 'https://phantom.com/download',
  robinhood: 'https://solflare.com/download',
}

async function ensureRobinhoodChain(provider: EthereumProvider) {
  const params = [
    {
      chainId: ROBINHOOD_CHAIN.chainIdHex,
      chainName: ROBINHOOD_CHAIN.name,
      nativeCurrency: ROBINHOOD_CHAIN.nativeCurrency,
      rpcUrls: [ROBINHOOD_CHAIN.rpcUrl],
      blockExplorerUrls: [ROBINHOOD_CHAIN.explorer],
    },
  ]

  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ROBINHOOD_CHAIN.chainIdHex }],
    })
  } catch (err) {
    const code = (err as { code?: number })?.code
    if (code === 4902 || code === -32603 || code === -32002) {
      try {
        await provider.request({ method: 'wallet_addEthereumChain', params })
      } catch {
        // Connected anyway — user can switch network manually
      }
      return
    }
    // User rejected switch or wallet cannot switch yet — keep session
  }
}

export async function connectWallet(id: WalletId): Promise<{
  address: string
  provider: EthereumProvider
  walletId: WalletId
}> {
  const provider = id === 'phantom' ? getPhantomProvider() : getRobinhoodProvider()

  if (!provider) {
    window.open(INSTALL[id], '_blank', 'noopener,noreferrer')
    throw new Error(
      id === 'phantom'
        ? 'Phantom not found — install the extension'
        : 'Wallet not found. Install Phantom or Solflare',
    )
  }

  // 1) Connect accounts first (simple, reliable)
  const accounts = (await provider.request({
    method: 'eth_requestAccounts',
  })) as string[]
  if (!accounts?.[0]) throw new Error('No account returned')

  // 2) Then move to Robinhood Chain
  await ensureRobinhoodChain(provider)

  return { address: accounts[0], provider, walletId: id }
}
