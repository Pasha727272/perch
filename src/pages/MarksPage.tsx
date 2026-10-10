import { Link } from 'react-router-dom'
import { ECONOMICS, MOST_PERCHED } from '../config'

export default function MarksPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Marks</h1>
      <p className="mt-3 max-w-xl text-white/55 text-sm md:text-base leading-relaxed">
        A Mark is someone else’s entry. You take a perch on that buy and try to beat their exit.
        Most Perched is the live board of targets.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3 text-sm">
        {[
          ['Entry fee', `${ECONOMICS.entryFeeEth} SOL`, 'Stake in SOL or $PERCH'],
          ['Window', `${ECONOMICS.windowMin}–${ECONOMICS.windowMax} min`, 'You trade from your own wallet'],
          ['Win', 'Best PnL at the exit', 'Stake + bounty'],
        ].map(([a, b, c]) => (
          <div key={a} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-[0.12em] text-white/40">{a}</p>
            <p className="mt-2 font-semibold text-ember">{b}</p>
            <p className="mt-1 text-white/45">{c}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold">Most Perched</h2>
        <p className="mt-2 text-sm text-white/45">Tops and whales with a prize sitting on the entry.</p>
        <div className="mt-6 grid gap-4">
          {MOST_PERCHED.map((m) => (
            <div
              key={m.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div>
                <p className="text-lg font-semibold">{m.label}</p>
                <p className="mt-1 text-sm text-white/50">{m.note}</p>
                <p className="mt-2 text-xs text-white/35 font-mono">{m.addr}</p>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/40">Entry</p>
                  <p className="font-semibold tabular-nums">{m.entryEth} SOL</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/40">Bounty</p>
                  <p className="font-semibold text-ember tabular-nums">{m.bountyEth} SOL</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/40">Window</p>
                  <p className="font-semibold">{m.windowMin} min</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-white/40">Perches</p>
                  <p className="font-semibold">{m.perches}</p>
                </div>
                <Link
                  to="/perch"
                  className="btn-lift btn-solid rounded-full px-5 py-2.5 text-sm font-semibold"
                >
                  Take perch
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
