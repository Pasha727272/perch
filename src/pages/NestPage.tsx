import { Link } from 'react-router-dom'
import { ALTITUDE, ALTITUDE_AMOUNTS, ECONOMICS, ROBINHOOD_CHAIN } from '../config'
import { CopyableCa } from '../components/CopyableCa'
import { useNestFill } from '../lib/useNestFill'

export default function NestPage() {
  const { threshold, pct, poolLabel } = useNestFill()

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Nest</h1>
      <p className="mt-3 max-w-xl text-white/55 text-sm md:text-base leading-relaxed">
        {ECONOMICS.feeNestPct}% of every fee lands here, in SOL. It pays when the Nest passes{' '}
        {threshold} SOL. Your share is the fees you paid times altitude. Miss the{' '}
        {ECONOMICS.ticker} trade in the window and you are out of that payout.
      </p>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">Nest balance</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums">
              {poolLabel} <span className="text-lg text-white/40">/ {threshold} SOL</span>
            </p>
          </div>
          <p className="text-ember font-semibold">{ECONOMICS.feeNestPct}% fees → Nest</p>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-ember transition-[width] duration-700 ease-out" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-4 text-sm text-white/45">
          Split: {ECONOMICS.poolPerchersPct}% perchers · {ECONOMICS.poolFlockPct}% flock (
          {ECONOMICS.flockDepth.join(' / ')})
        </p>
      </div>

      <section id="altitude" className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">Altitude</h2>
        <p className="mt-2 text-sm text-white/50">
          Hold {ECONOMICS.ticker} to upgrade. The level does not fall. Higher altitude, a bigger
          Nest share and access to fat Marks. Swoop opens at Dive.
        </p>
        <p className="mt-2 text-xs text-white/35">
          Upgrade with {ECONOMICS.ticker}, no refund · on {ROBINHOOD_CHAIN.name}
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-white/[0.04] text-[11px] uppercase tracking-[0.12em] text-white/40">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Tier</th>
                <th className="px-4 py-3">{ECONOMICS.ticker}</th>
                <th className="px-4 py-3">Mult</th>
                <th className="px-4 py-3">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {ALTITUDE.map((t, i) => (
                <tr key={t.id} className="hover:bg-white/[0.03]">
                  <td className="px-4 py-3 text-white/40">{t.id}</td>
                  <td className="px-4 py-3 font-semibold">{t.name}</td>
                  <td className="px-4 py-3">{ALTITUDE_AMOUNTS[i]}</td>
                  <td className="px-4 py-3 text-ember">{t.mult}</td>
                  <td className="px-4 py-3 text-white/50">{t.access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-lg font-semibold">Contracts</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-white/40 text-sm">{ECONOMICS.ticker}</span>
          <CopyableCa />
        </div>
        <p className="mt-4 text-xs text-white/35">
          Stub CA until mainnet. Explorer:{' '}
          <a
            href={ROBINHOOD_CHAIN.explorer}
            className="text-ember underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            {ROBINHOOD_CHAIN.name}
          </a>
        </p>
        <Link to="/perch" className="btn-lift mt-6 inline-flex text-sm text-ember underline underline-offset-4">
          Take perch →
        </Link>
      </section>
    </div>
  )
}
