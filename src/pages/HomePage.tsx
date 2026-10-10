import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Radio, Timer, Users, Wallet } from 'lucide-react'
import { ALTITUDE, ALTITUDE_AMOUNTS, ECONOMICS, ROBINHOOD_CHAIN } from '../config'
import { Reveal } from '../components/Reveal'
import { useNestFill } from '../lib/useNestFill'

function randOnline() {
  return 20 + Math.floor(Math.random() * 21)
}

const FEE_ROWS = [
  ['All revenue', `${ECONOMICS.feeNestPct}% to Nest`],
  ['Us', `${ECONOMICS.feeProjectPct}% gas, hosting, work`],
  ['Each payout', `${ECONOMICS.poolPerchersPct}% perchers, by fees × altitude`],
  [
    'Flock',
    `${ECONOMICS.poolFlockPct}% flock, ${ECONOMICS.flockDepth.join(' / ')} across three depths`,
  ],
  ['Perch entry', `${ECONOMICS.entryFeeEth} SOL + stake`],
  ['Altitude', 'Upgrade in $PERCH. No refund. It does not fall.'],
]

const MARQUEE = [
  'PERCH. BEAT THE EXIT',
  'ALTITUDE. SHARE OF THE NEST',
  'TRADE. FEED THE NEST',
  'SWOOP. 1v1, NO MARK',
  'FLOCK. THREE DEEP',
  'ENTRY. SIT ON THE BUY',
  'BOUNTY. BEST PNL',
  `${ECONOMICS.feeNestPct}% FEES TO NEST`,
]

function MarqueeStrip() {
  const loop = [...MARQUEE, ...MARQUEE]
  return (
    <section className="border-y border-hood-deep/20 bg-ember text-hood-deep">
      <div className="marquee py-3.5">
        <div className="marquee-track">
          {loop.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex items-center px-6 text-[12px] font-bold uppercase tracking-[0.14em] sm:text-[13px]"
            >
              {item}
              <span className="mx-6 opacity-35" aria-hidden>
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const { threshold, pct, pctLabel, poolLabel } = useNestFill()
  const [online, setOnline] = useState(randOnline)

  useEffect(() => {
    const id = window.setInterval(() => setOnline(randOnline()), 10_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div>
      <section className="dawn-hero relative isolate overflow-hidden border-b border-white/10 min-h-svh">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-night/55 via-night/50 to-night"
          aria-hidden
        />
        <div className="relative mx-auto flex min-h-svh max-w-3xl flex-col items-center justify-center px-6 pb-20 pt-28 text-center md:pb-28 md:pt-32">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-ember/80">
            {ECONOMICS.ticker} on {ROBINHOOD_CHAIN.name}
          </p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.05]">
            Perch on their entry.
            <br />
            <span className="font-display italic text-ember">Beat their exit.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base md:text-lg text-white/75 leading-relaxed">
            A Mark leaves a buy. You take the perch. Best PnL takes the bounty. Sit on their entry
            and outplay the exit.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/perch"
              className="btn-lift btn-solid inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Take perch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      <section className="border-b border-white/10 px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="mx-auto max-w-5xl">
          <div className="live-frame rounded-3xl px-5 py-10 sm:px-10 sm:py-12">
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
              </span>
              Live desk · {ROBINHOOD_CHAIN.name}
            </div>
            <h2 className="mt-4 text-center text-4xl font-semibold tracking-tight md:text-5xl">
              Live now.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-white/55 md:text-base">
              Both sides count from the same Mark open. Pumping the bag helps nobody. PnL at the exit
              decides it. Window {ECONOMICS.windowMin}–{ECONOMICS.windowMax} min, bounty in SOL.
            </p>

            <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
              {[
                { icon: Radio, label: 'Active perches', value: '4' },
                { icon: Timer, label: 'Open windows', value: '2' },
                { icon: Users, label: 'Perchers online', value: String(online) },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-night/50 px-4 py-4 text-center"
                >
                  <Icon className="mx-auto text-ember" size={16} />
                  <p className="mt-2 text-2xl font-semibold tabular-nums text-white">{value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/40">{label}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-white/40">
              4 active perches. 2 windows open. The desk is live.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/perch"
                className="btn-lift btn-solid inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
              >
                Take perch <ArrowRight size={16} />
              </Link>
              <Link
                to="/marks"
                className="btn-lift btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                Most Perched
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-b border-white/10 px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-10 sm:px-10 sm:py-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ember">
                  Nest escrow
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                  It pays when the Nest is full, not on a calendar.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/55 md:text-base">
                  Rewards go out once the Nest passes {threshold} SOL. No weekly wait. Miss the{' '}
                  {ECONOMICS.ticker} trade in the payout window and you are out of that payout. Your
                  share is your fees times altitude.
                </p>
              </div>
              <div className="rounded-2xl border border-ember/30 bg-ember/10 px-5 py-4 text-right">
                <p className="text-[11px] uppercase tracking-[0.14em] text-ember/80">Threshold</p>
                <p className="mt-1 text-3xl font-semibold tabular-nums text-ember">{threshold} SOL</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-2 flex justify-between text-xs text-white/45">
                <span>
                  {poolLabel} SOL of {threshold} SOL in the Nest now
                </span>
                <span>{pctLabel}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-ember to-ember-bright transition-[width] duration-700 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                {
                  t: `${ECONOMICS.feeNestPct}% → Nest`,
                  d: 'Every perch and swoop fee feeds the shared SOL pool.',
                },
                {
                  t: `${ECONOMICS.poolPerchersPct}% perchers`,
                  d: 'Payout split is fees times altitude. Higher tier, thicker share.',
                },
                {
                  t: `${ECONOMICS.poolFlockPct}% flock`,
                  d: `Referrals ${ECONOMICS.flockDepth.join(' / ')}, three deep, on every payout.`,
                },
              ].map((c) => (
                <div
                  key={c.t}
                  className="rounded-2xl border border-white/10 bg-night/40 px-4 py-4"
                >
                  <p className="font-semibold text-ember">{c.t}</p>
                  <p className="mt-2 text-xs leading-relaxed text-white/45">{c.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/nest"
                className="btn-lift btn-solid inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                Open Nest <ArrowRight size={15} />
              </Link>
              <Link
                to="/structure"
                className="btn-lift btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                How the share works
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="altitude" className="border-b border-white/10 bg-bone text-hood-deep">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <Reveal>
            <h2 className="text-center text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              A trading contest usually takes a desk and a license.
              <br />
              Here,{' '}
              <span className="inline-block rounded-md bg-hood-deep px-2.5 py-0.5 font-display italic text-ember">
                altitude
              </span>{' '}
              is enough.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-center text-sm md:text-base text-hood-deep/60 leading-relaxed">
              Upgrade with {ECONOMICS.ticker}. The level does not fall and is not refunded. Higher
              altitude, bigger Nest share. Swoop opens at Dive.
            </p>
          </Reveal>

          <Reveal delayMs={80}>
            <div className="mt-12 overflow-x-auto pb-4 pt-2">
              <div className="mx-auto flex min-w-[920px] max-w-5xl items-end justify-between gap-3 px-1 sm:gap-4">
                {ALTITUDE.map((t, i) => {
                  const isMax = i === ALTITUDE.length - 1
                  const heightPx = 88 + i * 24
                  return (
                    <div
                      key={t.id}
                      className="alt-col group flex flex-1 cursor-default flex-col items-center"
                    >
                      <div className="alt-stem flex w-full flex-col items-center">
                        <p
                          className={`alt-mult mb-2.5 text-[12px] font-bold tabular-nums sm:text-[15px] ${
                            isMax ? 'text-hood-deep' : 'text-hood-deep/55'
                          }`}
                        >
                          {t.mult}
                        </p>
                        <div
                          className={`alt-bar relative w-full max-w-[92px] rounded-t-[18px] ${
                            isMax
                              ? 'alt-bar-max bg-gradient-to-b from-ember-bright to-ember'
                              : 'alt-bar-dark bg-hood-deep'
                          }`}
                          style={{ height: heightPx }}
                        >
                          {isMax ? (
                            <span className="absolute inset-x-0 top-3 text-center text-[11px] font-black uppercase tracking-[0.18em] text-hood-deep">
                              MAX
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <p className="mt-3 text-center text-[10px] font-semibold leading-tight sm:text-xs">
                        {t.name}
                      </p>
                      <p className="mt-1 text-center text-[10px] tabular-nums text-hood-deep/50">
                        {ALTITUDE_AMOUNTS[i]}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            <p className="mt-8 text-center text-xs text-hood-deep/45">
              Grounded to Sky Lord. Multipliers lock in. They never fall.
            </p>
            <div className="mt-6 flex justify-center sm:justify-end">
              <Link
                to="/nest"
                className="btn-lift btn-solid inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.08em]"
              >
                Nest →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/10 px-6 py-16">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-5xl font-semibold tabular-nums text-ember md:text-6xl">
            {ECONOMICS.feeNestPct}%
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            of every fee goes to perchers.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50">
            {ECONOMICS.feeNestPct}% of all revenue goes to the Nest. {ECONOMICS.feeProjectPct}% keeps
            the lights on. Rewards are not minted. They are fees, in SOL.
          </p>
        </Reveal>
      </section>

      <section className="border-b border-white/10 px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-semibold md:text-3xl">
            Where every fee goes.
          </h2>
          <div className="fee-frame relative mt-8 rounded-[28px] p-3 sm:p-4">
            <dl className="relative z-[1] divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-night/60">
              {FEE_ROWS.map(([k, v]) => (
                <div
                  key={k}
                  className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3.5 text-sm transition-colors hover:bg-ember/[0.04]"
                >
                  <dt className="text-white/45">{k}</dt>
                  <dd className="font-medium text-white/90">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/structure"
              className="btn-lift btn-solid inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
            >
              How rewards split <ArrowRight size={15} />
            </Link>
            <Link
              to="/nest"
              className="btn-lift btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
            >
              <Wallet size={15} />
              Contract addresses
            </Link>
          </div>
        </Reveal>
      </section>

      <footer className="px-6 py-12 text-center text-sm text-white/40">
        <p>PERCH. Sit on their entry. Beat the exit. {ROBINHOOD_CHAIN.name}</p>
      </footer>
    </div>
  )
}
