import { useEffect, useState } from 'react'
import { ECONOMICS } from '../config'

const START_PCT = 7
const STEP_MIN = 0.5
const STEP_MAX = 1
const INTERVAL_MS = 35_000
const STORAGE_KEY = 'perch-nest-fill'

type Stored = { pct: number; updatedAt: number }

function clamp(pct: number) {
  return Math.min(100, Math.max(START_PCT, Math.round(pct * 10) / 10))
}

/** 0.5, 0.6, … 1.0 — one step per interval. */
function randomStep() {
  const tenths = STEP_MIN * 10 + Math.floor(Math.random() * (STEP_MAX * 10 - STEP_MIN * 10 + 1))
  return tenths / 10
}

function loadFill(): Stored {
  const now = Date.now()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const fresh = { pct: START_PCT, updatedAt: now }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
      return fresh
    }
    const saved = JSON.parse(raw) as Stored
    const steps = Math.max(0, Math.floor((now - saved.updatedAt) / INTERVAL_MS))
    let pct = saved.pct
    for (let i = 0; i < steps; i++) pct = clamp(pct + randomStep())
    const updatedAt = saved.updatedAt + steps * INTERVAL_MS
    const next = { pct, updatedAt }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    return next
  } catch {
    return { pct: START_PCT, updatedAt: now }
  }
}

function saveFill(pct: number, updatedAt: number) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ pct, updatedAt }))
}

function formatAmount(value: number) {
  return value.toFixed(2).replace(/0$/, '').replace(/\.0$/, '')
}

/** Nest fill starts at 7% and grows 0.5–1% every 35s, including across reloads. */
export function useNestFill() {
  const threshold = ECONOMICS.payoutThresholdEth
  const [pct, setPct] = useState(START_PCT)

  useEffect(() => {
    const current = loadFill()
    setPct(current.pct)

    const wait = Math.max(0, INTERVAL_MS - (Date.now() - current.updatedAt))
    let intervalId = 0
    const timeoutId = window.setTimeout(() => {
      setPct((value) => {
        const next = clamp(value + randomStep())
        saveFill(next, Date.now())
        return next
      })
      intervalId = window.setInterval(() => {
        setPct((value) => {
          const next = clamp(value + randomStep())
          saveFill(next, Date.now())
          return next
        })
      }, INTERVAL_MS)
    }, wait)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [])

  const poolNow = (pct / 100) * threshold
  const pctLabel = Number.isInteger(pct) ? String(pct) : pct.toFixed(1)
  const poolLabel = formatAmount(poolNow)

  return { threshold, pct, poolNow, pctLabel, poolLabel }
}
