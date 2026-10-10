import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { PERCH_CA } from '../config'
import { truncateAddress } from '../lib/wallet'

export function CopyableCa({
  className = '',
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(PERCH_CA)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={PERCH_CA}
      className={`btn-lift inline-flex items-center gap-2 rounded-full border border-white/20 bg-hood-deep/40 px-3 py-1.5 text-xs text-white/80 hover:bg-hood-deep/70 hover:text-white ${className}`}
    >
      <span className="text-white/40 tracking-wide uppercase">CA</span>
      {compact ? null : <span className="font-mono">{truncateAddress(PERCH_CA)}</span>}
      {copied ? <Check size={14} className="text-ember" /> : <Copy size={14} className="text-ember" />}
    </button>
  )
}
