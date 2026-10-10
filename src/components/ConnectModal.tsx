import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { refreshProviders, walletInstalled, type WalletId } from '../lib/wallet'
import { useWallet } from '../wallet/WalletProvider'

const WALLETS: { id: WalletId; name: string; hint: string; icon: string }[] = [
  {
    id: 'phantom',
    name: 'Phantom',
    hint: 'Browser extension',
    icon: '/wallets/phantom.png',
  },
]

export function ConnectModal() {
  const { modalOpen, closeConnect, connect, connecting, error } = useWallet()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!modalOpen) return
    refreshProviders()
    setTick((n) => n + 1)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeConnect()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen, closeConnect])

  if (!modalOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4"
      onClick={closeConnect}
      role="presentation"
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111] p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Connect wallet"
      >
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Connect</h2>
          <button
            type="button"
            onClick={closeConnect}
            className="rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <p className="mb-5 text-xs text-white/40">Phantom · Solana</p>

        <div className="space-y-2" key={tick}>
          {WALLETS.map((w) => {
            const ready = walletInstalled(w.id)
            return (
              <button
                key={w.id}
                type="button"
                disabled={connecting}
                onClick={() => void connect(w.id)}
                className="btn-lift flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-left transition hover:border-ember/50 hover:bg-white/[0.06] disabled:opacity-60"
              >
                <img
                  src={w.icon}
                  alt=""
                  className="h-11 w-11 shrink-0 rounded-xl object-cover"
                />
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold text-white">{w.name}</span>
                  <span className="block text-xs text-white/40">
                    {ready ? w.hint : 'Click to install'}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {error ? <p className="mt-3 text-xs text-red-300">{error}</p> : null}
      </div>
    </div>
  )
}
