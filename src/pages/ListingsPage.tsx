import { ECONOMICS, ROBINHOOD_CHAIN } from '../config'

const ROWS = [
  { venue: 'Solana DEX', pair: ECONOMICS.pair, status: 'Primary', note: 'Execution and settlement' },
  { venue: 'Nest escrow', pair: 'SOL fees', status: 'Live stub', note: 'Payouts at the threshold' },
  { venue: 'Altitude vault', pair: ECONOMICS.ticker, status: 'Live stub', note: 'Tier upgrades' },
]

export default function ListingsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Listings</h1>
      <p className="mt-3 text-white/55 text-sm md:text-base leading-relaxed">
        Where {ECONOMICS.ticker} and the Nest rails show up on {ROBINHOOD_CHAIN.name}. Honest stubs
        until mainnet addresses.
      </p>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-white/[0.04] text-[11px] uppercase tracking-[0.12em] text-white/40">
            <tr>
              <th className="px-4 py-3">Venue</th>
              <th className="px-4 py-3">Pair / asset</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {ROWS.map((r) => (
              <tr key={r.venue} className="hover:bg-white/[0.03]">
                <td className="px-4 py-3 font-semibold">{r.venue}</td>
                <td className="px-4 py-3 font-mono text-white/70">{r.pair}</td>
                <td className="px-4 py-3 text-ember">{r.status}</td>
                <td className="px-4 py-3 text-white/45">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
