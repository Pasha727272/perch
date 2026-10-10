import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ECONOMICS, PERCH_CA, ROBINHOOD_CHAIN } from '../config'
import { truncateAddress } from '../lib/wallet'
import { Reveal } from '../components/Reveal'

const LOOP = [
  { n: '01', title: 'Mark buys', sub: 'The entry is public. The desk sees the open.' },
  { n: '02', title: 'Take perch', sub: `Fee ${ECONOMICS.entryFeeEth} SOL + stake` },
  { n: '03', title: 'Trade window', sub: `${ECONOMICS.windowMin}–${ECONOMICS.windowMax} min from one entry` },
  { n: '04', title: 'Best exit', sub: 'Top PnL takes the stake and the bounty' },
]

const NEST_FLOW = [
  {
    title: 'Fees',
    value: `${ECONOMICS.feeNestPct}% / ${ECONOMICS.feeProjectPct}%`,
    sub: 'Nest · ops · every perch and swoop fee',
  },
  {
    title: 'Perchers',
    value: `${ECONOMICS.poolPerchersPct}%`,
    sub: 'Payout split: fees × altitude',
  },
  {
    title: 'Flock',
    value: `${ECONOMICS.poolFlockPct}%`,
    sub: `Three deep ${ECONOMICS.flockDepth.join(' / ')}`,
  },
]

const MODULES = [
  { name: 'ThePerch', does: 'Opens a perch on a Mark entry and holds the stake until settle' },
  { name: 'Swoop', does: '1v1 with no Mark. Gate is altitude Dive and above' },
  { name: 'Nest', does: `Holds fee SOL and pays at the ${ECONOMICS.payoutThresholdEth} SOL threshold` },
  { name: 'Altitude', does: 'Upgrade with $PERCH. It does not fall and is not refunded' },
  { name: 'Flock', does: 'Referral split, three deep, on Nest payouts' },
  {
    name: 'PERCH',
    does: 'The desk token. Altitude, stake, and the Nest anti-passive rule',
    addr: truncateAddress(PERCH_CA),
  },
]

export default function StructurePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16">
      <Reveal>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
          Mechanism · {ROBINHOOD_CHAIN.name}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Structure</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
          Social launchpad logic: perch a Mark entry, beat the exit, and the Nest pays from fees.
          Rewards are not minted.
        </p>
      </Reveal>

      <section className="mt-12">
        <Reveal>
          <div className="live-frame rounded-3xl px-5 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ember">
                  Loop
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">The loop</h2>
              </div>
              <p className="max-w-sm text-right text-xs text-white/40">
                One Mark entry, one settle. You sit on the buy. You do not follow the whale.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {LOOP.map((step, i) => (
                <div
                  key={step.n}
                  className="relative rounded-2xl border border-white/10 bg-night/50 px-4 py-5 transition-colors hover:border-ember/35 hover:bg-ember/[0.04]"
                >
                  <p className="font-mono text-[11px] font-bold text-ember">{step.n}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{step.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/45">{step.sub}</p>
                  {i < LOOP.length - 1 ? (
                    <span
                      className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-ember/50 lg:block"
                      aria-hidden
                    >
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-10">
        <Reveal delayMs={60}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-8 sm:px-8 sm:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ember">
              Nest escrow
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">Nest flow</h2>
            <p className="mt-2 max-w-xl text-sm text-white/45">
              It pays at the {ECONOMICS.payoutThresholdEth} SOL threshold, not on a calendar. Share
              is fees times altitude.
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {NEST_FLOW.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border border-ember/20 bg-ember/[0.06] px-5 py-5"
                >
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">{c.title}</p>
                  <p className="mt-2 text-2xl font-semibold tabular-nums text-ember">{c.value}</p>
                  <p className="mt-2 text-xs leading-relaxed text-white/50">{c.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-10">
        <Reveal delayMs={80}>
          <h2 className="text-2xl font-semibold tracking-tight">Modules</h2>
          <p className="mt-2 text-sm text-white/45">What runs the desk on {ROBINHOOD_CHAIN.name}.</p>

          <div className="fee-frame relative mt-6 rounded-[28px] p-3 sm:p-4">
            <ul className="relative z-[1] divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-night/60">
              {MODULES.map((m) => (
                <li
                  key={m.name}
                  className="flex flex-wrap items-start justify-between gap-3 px-5 py-4 transition-colors hover:bg-ember/[0.04]"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ember">{m.name}</p>
                    <p className="mt-1 text-sm text-white/55">{m.does}</p>
                  </div>
                  {'addr' in m && m.addr ? (
                    <p className="shrink-0 font-mono text-xs text-white/35">{m.addr}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <Reveal delayMs={100}>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-5">
          <p className="text-sm text-white/45">
            © 2026 PERCH · {ECONOMICS.feeNestPct}% of fees to perchers
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/perch"
              className="btn-lift btn-solid inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              The Perch <ArrowRight size={15} />
            </Link>
            <Link
              to="/nest"
              className="btn-lift btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              Nest
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  )
}
