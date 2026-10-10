import { useWallet } from '../wallet/WalletProvider'
import { ECONOMICS } from '../config'

export default function FlockPage() {
  const { address, short, openConnect, connecting } = useWallet()
  const link = address
    ? `https://perch.app/?ref=${address.slice(0, 10)}`
    : null

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Flock</h1>
      <p className="mt-3 text-white/55 text-sm md:text-base leading-relaxed">
        Referrals, three deep, on {ECONOMICS.poolFlockPct}% of every Nest payout:{' '}
        {ECONOMICS.flockDepth.join(' / ')}. Bring perchers and earn when they feed the Nest.
      </p>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        {link ? (
          <>
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">Your flock link</p>
            <p className="mt-2 break-all font-mono text-sm text-ember">{link}</p>
            <button
              type="button"
              onClick={() => void navigator.clipboard.writeText(link)}
              className="btn-lift mt-4 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:text-white"
            >
              Copy · {short}
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-white/55">
              Connect a wallet to get your link and see flock rewards.
            </p>
            <button
              type="button"
              onClick={openConnect}
              disabled={connecting}
              className="btn-lift btn-solid mt-4 rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              {connecting ? 'Connecting…' : 'Connect wallet'}
            </button>
          </>
        )}
      </div>

      <ul className="mt-8 space-y-3 text-sm text-white/60">
        <li>
          Every fee they pay, perch entry and {ECONOMICS.ticker} trades, feeds three flock levels.
        </li>
        <li>Depth split: {ECONOMICS.flockDepth.map((n, i) => `L${i + 1} ${n}%`).join(' · ')}.</li>
        <li>Payouts ride the Nest threshold. There is no separate claim calendar.</li>
      </ul>
    </div>
  )
}
