import { useMemo, useState } from 'react'
import { FEED, type FeedRow } from '../config'

type Filter = 'All' | 'Perches' | 'Trades' | 'Mine'

const FILTER_LABELS: Record<Filter, string> = {
  All: 'All',
  Perches: 'Perches',
  Trades: 'Trades',
  Mine: 'Mine',
}

const AVATAR = [
  'bg-ember/30',
  'bg-sky/30',
  'bg-emerald-900/40',
  'bg-white/15',
  'bg-lime-400/25',
]

function Tag({ tag }: { tag: FeedRow['tag'] }) {
  const style =
    tag === 'Buy'
      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/25'
      : tag === 'Sell'
        ? 'bg-red-500/15 text-red-300 border-red-400/25'
        : tag === 'Swoop'
          ? 'bg-sky/20 text-sky border-sky/30'
          : 'bg-ember/15 text-ember border-ember/30'
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style}`}>
      {tag}
    </span>
  )
}

export default function FeedPage() {
  const [filter, setFilter] = useState<Filter>('All')
  const rows = useMemo(() => {
    if (filter === 'Mine') return []
    if (filter === 'All') return FEED
    return FEED.filter((r) => r.kind === filter)
  }, [filter])

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Feed</h1>
          <p className="mt-2 text-sm text-white/55">
            Every perch and every $PERCH trade, as it settles.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['All', 'Perches', 'Trades', 'Mine'] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`btn-lift rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                filter === f ? 'btn-chip-on' : 'btn-chip-off'
              }`}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3 text-center text-sm">
        {[
          ['Perches closed', '0'],
          ['$PERCH volume', '—'],
          ['Open windows', '0'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-4">
            <p className="text-lg font-semibold text-ember">{v}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/40">{k}</p>
          </div>
        ))}
      </div>

      {filter === 'Mine' ? (
        <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-16 text-center">
          <p className="text-lg font-semibold text-white/85">You have no trades yet</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/45 leading-relaxed">
            Your perches, swoops, and $PERCH trades will show up here after your first session or
            swap.
          </p>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 overflow-hidden">
          {rows.map((r, i) => (
            <li key={r.id} className="flex items-center gap-3 bg-white/[0.02] px-4 py-3">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${AVATAR[i % AVATAR.length]}`}
              >
                {r.addr.slice(2, 3).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag tag={r.tag} />
                  <span className="font-mono text-xs text-white/45">{r.addr}</span>
                  <span className="text-xs text-white/30">{r.ago}</span>
                </div>
                <p className="mt-1 truncate text-sm text-white/80">{r.body}</p>
              </div>
              <span className="shrink-0 text-xs tabular-nums text-white/45">{r.eth}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
