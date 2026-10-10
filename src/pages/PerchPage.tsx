import { useEffect, useState } from 'react'
import { ECONOMICS } from '../config'
import { useWallet } from '../wallet/WalletProvider'

type Tab = 'open' | 'running' | 'finished'

type Side = {
  role: 'Percher' | 'Mark' | 'Opponent' | 'Creator'
  addr: string
  letter: string
  color: string
  pnl: string
  pnlUp: boolean
  stake: string
  trades: number
  volume: string
}

type SessionCard = {
  id: string
  kind: 'perch' | 'swoop'
  title: string
  /** For running examples — countdown starts from this many seconds */
  durationSec?: number
  status?: 'settled' | 'cancelled'
  note?: string
  a: Side
  b: Side
}

type OpenOffer = {
  id: string
  addr: string
  label: string
  bet: string
  unit: string
  mins: number
  letter: string
  color: string
}

const TABS: { id: Tab; label: string }[] = [
  { id: 'open', label: 'Open' },
  { id: 'running', label: 'Running' },
  { id: 'finished', label: 'Finished' },
]

const DURATIONS = [1, 3, 5, 10, 15] as const

const OPEN_EXAMPLES: OpenOffer[] = [
  {
    id: '42',
    addr: '7a3f…9b3d',
    label: 'Swoop 42',
    bet: '0.05 SOL',
    unit: 'Stake in SOL',
    mins: 15,
    letter: '7',
    color: 'bg-ember/35 text-ember',
  },
  {
    id: '41',
    addr: '2c6a…77b4',
    label: 'Swoop 41',
    bet: '120 $PERCH',
    unit: 'Stake in $PERCH',
    mins: 10,
    letter: '2',
    color: 'bg-sky/30 text-sky',
  },
  {
    id: '40',
    addr: 'b770…12cd',
    label: 'Perch 40',
    bet: '0.12 SOL',
    unit: 'On a Mark · SOL',
    mins: 5,
    letter: 'B',
    color: 'bg-violet-500/30 text-violet-200',
  },
  {
    id: '39',
    addr: '414d…3b69',
    label: 'Swoop 39',
    bet: '0.08 SOL',
    unit: 'Stake in SOL',
    mins: 3,
    letter: '4',
    color: 'bg-lime-900/40 text-lime-100',
  },
]

const RUNNING_EXAMPLES: SessionCard[] = [
  {
    id: 'r37',
    kind: 'perch',
    title: 'Perch 37',
    durationSec: 6 * 60 + 12,
    a: {
      role: 'Percher',
      addr: '7a3f…9b3d',
      letter: '7',
      color: 'bg-ember/35 text-ember',
      pnl: '+3.12%',
      pnlUp: true,
      stake: '0.05 SOL',
      trades: 14,
      volume: '$2,140',
    },
    b: {
      role: 'Mark',
      addr: 'Whale…88',
      letter: 'W',
      color: 'bg-sky/30 text-sky',
      pnl: '−1.45%',
      pnlUp: false,
      stake: 'entry 12.4',
      trades: 9,
      volume: '$1,880',
    },
  },
  {
    id: 'r36',
    kind: 'swoop',
    title: 'Swoop 36',
    durationSec: 11 * 60 + 40,
    a: {
      role: 'Percher',
      addr: '2c6a…77b4',
      letter: '2',
      color: 'bg-violet-500/30 text-violet-200',
      pnl: '−0.40%',
      pnlUp: false,
      stake: '0.08 SOL',
      trades: 6,
      volume: '$980',
    },
    b: {
      role: 'Opponent',
      addr: 'b770…12cd',
      letter: 'B',
      color: 'bg-lime-900/40 text-lime-100',
      pnl: '+1.05%',
      pnlUp: true,
      stake: '0.08 SOL',
      trades: 11,
      volume: '$1,210',
    },
  },
]

const FINISHED_EXAMPLES: SessionCard[] = [
  {
    id: 'f2',
    kind: 'perch',
    title: 'Perch 2',
    status: 'settled',
    a: {
      role: 'Percher',
      addr: '7a3f…9b3d',
      letter: '7',
      color: 'bg-ember/35 text-ember',
      pnl: '+4.80%',
      pnlUp: true,
      stake: '0.05 SOL',
      trades: 18,
      volume: '$2,140',
    },
    b: {
      role: 'Mark',
      addr: 'Whale…88',
      letter: 'W',
      color: 'bg-sky/30 text-sky',
      pnl: '+1.10%',
      pnlUp: true,
      stake: 'entry 8.1',
      trades: 12,
      volume: '$1,902',
    },
  },
  {
    id: 'f1',
    kind: 'swoop',
    title: 'Swoop 1',
    status: 'cancelled',
    note: 'The creator pulled the swoop before Accept. Stake returned.',
    a: {
      role: 'Creator',
      addr: '00bd…0b0e',
      letter: '0',
      color: 'bg-white/15 text-white/70',
      pnl: '—',
      pnlUp: true,
      stake: '0.001 SOL',
      trades: 0,
      volume: '$0',
    },
    b: {
      role: 'Opponent',
      addr: '—',
      letter: '?',
      color: 'bg-white/10 text-white/40',
      pnl: '—',
      pnlUp: true,
      stake: '—',
      trades: 0,
      volume: '—',
    },
  },
]

function formatClock(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function useCountdown(totalSec: number) {
  const [left, setLeft] = useState(totalSec)

  useEffect(() => {
    if (left <= 0) return
    const id = window.setTimeout(() => setLeft((v) => v - 1), 1000)
    return () => window.clearTimeout(id)
  }, [left])

  const done = left <= 0
  const progress = totalSec <= 0 ? 100 : Math.min(100, ((totalSec - Math.max(left, 0)) / totalSec) * 100)
  return { left: Math.max(left, 0), done, progress }
}

function SideBlock({ side }: { side: Side }) {
  return (
    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40">{side.role}</p>
      <div className="mt-2 flex items-center gap-2.5">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${side.color}`}
        >
          {side.letter}
        </span>
        <p className="truncate font-mono text-sm text-white/80">{side.addr}</p>
      </div>
      <p
        className={`mt-3 text-2xl font-semibold tabular-nums ${
          side.pnl === '—' ? 'text-white/35' : side.pnlUp ? 'text-ember' : 'text-red-400'
        }`}
      >
        {side.pnl}
      </p>
      <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div>
          <dt className="text-white/35">Stake</dt>
          <dd className="mt-0.5 font-medium text-white/75">{side.stake}</dd>
        </div>
        <div>
          <dt className="text-white/35">Trades</dt>
          <dd className="mt-0.5 font-medium text-white/75">{side.trades}</dd>
        </div>
        <div>
          <dt className="text-white/35">Volume</dt>
          <dd className="mt-0.5 font-medium text-white/75">{side.volume}</dd>
        </div>
      </dl>
    </div>
  )
}

function SessionCardView({ card }: { card: SessionCard }) {
  const isLive = !card.status && typeof card.durationSec === 'number'
  const countdown = useCountdown(isLive ? (card.durationSec as number) : 0)
  const progress = card.status === 'settled' ? 100 : card.status === 'cancelled' ? 0 : countdown.progress

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_24px_rgba(0,0,0,0.25)]">
      <div className="h-1.5 w-full bg-white/10">
        <div
          className={`h-full transition-[width] duration-1000 linear ${
            card.status === 'cancelled'
              ? 'bg-white/25'
              : countdown.done && isLive
                ? 'bg-ember-bright'
                : 'bg-ember'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">{card.title}</h3>
          <span className="rounded-full border border-white/12 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/45">
            {card.kind === 'perch' ? 'perch × mark' : 'swoop'}
          </span>
        </div>
        {card.status === 'settled' ? (
          <span className="rounded-full bg-ember/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ember">
            Settled
          </span>
        ) : card.status === 'cancelled' ? (
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
            Cancelled
          </span>
        ) : countdown.done ? (
          <button
            type="button"
            className="btn-lift btn-solid rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider"
          >
            Finish it
          </button>
        ) : (
          <span className="font-mono text-xs tabular-nums text-white/55">
            {formatClock(countdown.left)} left
          </span>
        )}
      </div>
      {card.note ? <p className="px-4 pt-2 text-xs text-white/45">{card.note}</p> : null}
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_auto_1fr] sm:items-start">
        <SideBlock side={card.a} />
        <div className="hidden sm:flex h-full items-center justify-center px-1 text-xs font-bold uppercase tracking-[0.16em] text-white/25">
          vs
        </div>
        <SideBlock side={card.b} />
      </div>
    </article>
  )
}

export default function PerchPage() {
  const { address, openConnect, connecting } = useWallet()
  const [tab, setTab] = useState<Tab>('open')
  const [pay, setPay] = useState<'PERCH' | 'SOL'>('PERCH')
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>(15)
  const [betAsset] = useState<'SOL' | 'PERCH'>('SOL')

  const openCount = 0
  const runningCount = 0

  const onCreate = () => {
    if (!address) {
      openConnect()
      return
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">The Perch</h1>
      <p className="mt-3 max-w-2xl text-sm md:text-base text-white/60 leading-relaxed">
        1v1 on $PERCH. Take perch on a Mark entry, or start a swoop with no Mark.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`btn-lift rounded-full px-4 py-2 text-sm font-semibold ${
              tab === t.id ? 'btn-chip-on' : 'btn-chip-off'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: 'Open challenges', v: String(openCount), s: null as string | null },
          { k: 'Running now', v: String(runningCount), s: null },
          {
            k: 'Entry fee',
            v: `${ECONOMICS.entryFeeEth} SOL`,
            s: 'In $PERCH or SOL, from each side',
          },
          {
            k: 'Trading',
            v: 'PERCH',
            s: 'From each trader’s own wallet',
          },
        ].map((c) => (
          <div
            key={c.k}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_6px_16px_rgba(0,0,0,0.22)]"
          >
            <p className="text-[11px] uppercase tracking-[0.12em] text-white/40">{c.k}</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-white">{c.v}</p>
            {c.s ? <p className="mt-1 text-xs text-white/40 leading-snug">{c.s}</p> : null}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.55fr_0.9fr] lg:items-start">
        <div className="min-w-0 space-y-6">
          {tab === 'open' ? (
            <>
              <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-ember/45 bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xl text-sm text-white/70 leading-relaxed">
                  No open swoops yet. Create the first challenge. It lands here, anyone can Accept,
                  and the best PnL at the exit takes the bounty.
                </p>
                <button
                  type="button"
                  onClick={onCreate}
                  className="btn-lift btn-solid shrink-0 rounded-full px-5 py-3 text-sm font-semibold"
                >
                  Create the first swoop
                </button>
              </div>
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
                  Example
                </p>
                <ul className="space-y-3">
                  {OPEN_EXAMPLES.map((row) => (
                    <li
                      key={row.id}
                      className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${row.color}`}
                      >
                        {row.letter}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-sm text-white/85">{row.addr}</p>
                        <p className="text-xs text-white/40">{row.label}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold tabular-nums">{row.bet}</p>
                        <p className="text-xs text-white/40">{row.unit}</p>
                      </div>
                      <p className="w-16 text-center text-sm text-white/55">{row.mins} min</p>
                      <button
                        type="button"
                        disabled
                        className="cursor-not-allowed rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/35"
                      >
                        Accept
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}

          {tab === 'running' ? (
            <>
              <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/55">No live perch or swoop right now.</p>
                <button
                  type="button"
                  onClick={onCreate}
                  className="btn-lift btn-solid shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold"
                >
                  Start a swoop
                </button>
              </div>
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
                  Example · Running
                </p>
                <div className="space-y-4">
                  {RUNNING_EXAMPLES.map((card) => (
                    <SessionCardView key={card.id} card={card} />
                  ))}
                </div>
              </div>
            </>
          ) : null}

          {tab === 'finished' ? (
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
                Example · Finished
              </p>
              <div className="space-y-4">
                {FINISHED_EXAMPLES.map((card) => (
                  <SessionCardView key={card.id} card={card} />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_28px_rgba(0,0,0,0.28)] lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold tracking-tight">Start a swoop</h2>
          <p className="mt-1 text-xs text-white/40">1v1, no Mark · altitude Dive and above</p>

          <div className="mt-5">
            <p className="text-[11px] uppercase tracking-[0.12em] text-white/40">Your stake</p>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/12 bg-night/70 px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#627eea]/30 text-xs font-bold text-[#8aa4ff]">
                ◆
              </span>
              <div>
                <p className="text-sm font-semibold">{betAsset}</p>
                <p className="text-xs text-white/40">At face value</p>
              </div>
            </div>
            {!address ? (
              <button
                type="button"
                onClick={openConnect}
                disabled={connecting}
                className="btn-lift mt-3 w-full rounded-xl border border-dashed border-white/25 bg-white/[0.03] px-3 py-5 text-center text-sm text-white/55 transition-colors hover:border-ember/50 hover:bg-ember/5 hover:text-white/80 disabled:opacity-60"
              >
                Connect a wallet to pick coins from it.
              </button>
            ) : (
              <div className="mt-3 rounded-xl border border-white/12 bg-night/50 px-3 py-3 text-sm text-white/60">
                Wallet connected. Coin picker is a stub.
              </div>
            )}
          </div>

          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.12em] text-white/40">Entry fee</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(
                [
                  ['PERCH', 'Pay in $PERCH'],
                  ['SOL', 'Pay in SOL'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPay(id)}
                  className={`btn-lift rounded-full px-3 py-2.5 text-xs font-semibold sm:text-sm ${
                    pay === id ? 'btn-chip-on' : 'btn-chip-off'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-white/40 leading-relaxed">
              A flat fee on every swoop and perch, on top of the stake. It is not part of the win or
              the loss.
            </p>
          </div>

          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.12em] text-white/40">Duration</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`btn-lift rounded-full px-3 py-2 text-xs font-semibold ${
                    duration === d ? 'btn-chip-on' : 'btn-chip-off'
                  }`}
                >
                  {d} min
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-6 space-y-1.5 text-xs text-white/45">
            <li>Opponent stake stays within 10% of yours</li>
            <li>The offer stays up until Accept or cancel</li>
            <li>
              Entry fees feed the Nest: {ECONOMICS.feeNestPct}% perchers · {ECONOMICS.feeProjectPct}%
              project
            </li>
          </ul>

          <button
            type="button"
            onClick={onCreate}
            disabled={connecting}
            className={`btn-lift mt-6 w-full rounded-full px-4 py-3.5 text-sm font-semibold disabled:opacity-60 ${
              address ? 'btn-solid' : 'btn-ghost'
            }`}
          >
            {!address ? 'Connect wallet' : connecting ? 'Connecting…' : 'Start a swoop'}
          </button>
        </aside>
      </div>
    </div>
  )
}
