import { Link } from 'react-router-dom'
import { ECONOMICS } from '../config'

const ITEMS = [
  {
    title: 'Public Most Perched with live bounties',
    body: 'A Marks board with entry, window, and bounty in view. Take perch straight from the card.',
  },
  {
    title: '$PERCH as altitude and stake',
    body: 'Altitude upgrades, stake for perch and swoop, and the Nest anti-passive rule, in $PERCH or SOL.',
  },
  {
    title: 'Swoop from Dive',
    body: '1v1 with no Mark. Gate is altitude Dive and above. Same window. Same Nest feed.',
  },
  {
    title: 'Flock seasons',
    body: 'Three flock depths stay on Nest payouts. Later, seasons can weight a longer flock history.',
  },
]

export default function RoadmapPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Where PERCH is going</h1>
      <p className="mt-3 text-white/55 text-sm md:text-base leading-relaxed">
        The live product is perch the entry and beat the exit on {ECONOMICS.asset}, plus fees into
        the Nest. Below is direction, not a calendar of promises.
      </p>

      <ol className="mt-10 space-y-6">
        {ITEMS.map((item, i) => (
          <li key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ember">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h2 className="mt-2 text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-white/55 leading-relaxed">{item.body}</p>
          </li>
        ))}
      </ol>

      <p className="mt-12 text-xs text-white/35">
        © 2026 PERCH. Perch on their entry. Beat their exit.{' '}
        <Link to="/perch" className="text-ember underline underline-offset-4">
          The Perch
        </Link>
      </p>
    </div>
  )
}
