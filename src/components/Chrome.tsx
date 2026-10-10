import { Link, NavLink, useLocation } from 'react-router-dom'
import { CopyableCa } from './CopyableCa'
import { ConnectModal } from './ConnectModal'
import { useWallet } from '../wallet/WalletProvider'

type NavItem = { to: string; label: string; end?: boolean; accent?: boolean }

const leftLinks: NavItem[] = [
  { to: '/nest', label: 'Nest' },
  { to: '/perch', label: 'The Perch', accent: true },
]

const rightLinks: NavItem[] = [
  { to: '/feed', label: 'Feed' },
  { to: '/flock', label: 'Flock' },
]

function notchLinkClass({ isActive }: { isActive: boolean }) {
  return `justify-self-center text-center text-[11px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] transition-opacity ${
    isActive ? 'opacity-100' : 'opacity-80 hover:opacity-100'
  }`
}

export function Chrome() {
  const { short, walletId, connecting, openConnect, disconnect } = useWallet()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
        <div className="mx-auto grid h-[96px] max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-6">
          <div aria-hidden />

          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#0a100a]/28 shadow-[0_8px_28px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:w-max sm:gap-5 sm:px-6">
            {leftLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `hidden sm:inline ${notchLinkClass({ isActive })} ${l.accent ? '!text-ember' : ''}`
                }
              >
                {l.label}
              </NavLink>
            ))}

            <Link
              to="/"
              className="flex h-7 w-7 shrink-0 items-center justify-center"
              aria-label="PERCH home"
            >
              <img src="/perch-logo.png" alt="PERCH" className="h-7 w-7 object-contain" />
            </Link>

            {rightLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `hidden sm:inline ${notchLinkClass({ isActive })} ${l.accent ? '!text-ember' : ''}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 pr-1 sm:gap-2.5 sm:pr-2 md:pr-4">
            <CopyableCa
              compact
              className="btn-lift btn-ghost !px-3.5 !py-2.5 [&_span]:!text-white/70"
            />
            {short ? (
              <button
                type="button"
                onClick={disconnect}
                className="btn-lift btn-ghost hidden rounded-full px-3.5 py-2.5 text-sm font-mono font-semibold sm:inline-flex"
                title={`Disconnect ${walletId ?? 'wallet'}`}
              >
                {short}
              </button>
            ) : (
              <button
                type="button"
                onClick={openConnect}
                disabled={connecting}
                className="btn-lift btn-solid inline-flex rounded-full px-3.5 py-2.5 text-xs font-bold uppercase tracking-[0.1em] disabled:opacity-60 sm:px-4 sm:text-[13px]"
              >
                {connecting ? '…' : 'Connect'}
              </button>
            )}
          </div>
        </div>

        <nav className="sm:hidden flex justify-center gap-4 px-4 pb-3">
          {[...leftLinks, ...rightLinks].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `${notchLinkClass({ isActive })} ${l.accent ? '!text-ember' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </header>
      {!isHome ? <div className="h-[96px] max-sm:h-[8rem]" aria-hidden /> : null}
      <ConnectModal />
    </>
  )
}
