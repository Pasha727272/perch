export const PERCH_CA = 'PERCHmint11111111111111111111111111111111' as const

export const ROBINHOOD_CHAIN = {
  chainId: 4663,
  chainIdHex: '0x1237',
  name: 'Solana',
  rpcUrl: 'https://rpc.mainnet.chain.robinhood.com',
  explorer: 'https://solscan.io',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
} as const

export const ECONOMICS = {
  feeNestPct: 82,
  feeProjectPct: 18,
  /** Nest pays when escrow hits this SOL balance */
  payoutThresholdEth: 10,
  /** Demo fill — 7% of 10 SOL */
  nestPoolNowEth: 0.7,
  poolPerchersPct: 90,
  poolFlockPct: 10,
  flockDepth: [80, 15, 5] as const,
  entryFeeEth: 0.001,
  windowMin: 3,
  windowMax: 15,
  pair: 'PERCH/SOL',
  ticker: '$PERCH',
  asset: 'PERCH',
} as const

/** Altitude tiers — upgrade with $PERCH; never falls / never refunded */
export const ALTITUDE = [
  { id: 1, name: 'Grounded', perch: '100K', mult: '1.00x', access: 'Light bounties' },
  { id: 2, name: 'Branch', perch: '170K', mult: '1.10x', access: 'Light bounties' },
  { id: 3, name: 'Lookout', perch: '290K', mult: '1.20x', access: 'Mid bounties' },
  { id: 4, name: 'Scout', perch: '490K', mult: '1.30x', access: 'Mid bounties' },
  { id: 5, name: 'Watcher', perch: '840K', mult: '1.40x', access: 'Mid bounties' },
  { id: 6, name: 'Glider', perch: '1.43M', mult: '1.50x', access: 'Fat bounties' },
  { id: 7, name: 'Dive', perch: '2.43M', mult: '1.60x', access: 'Fat bounties · Swoop' },
  { id: 8, name: 'Talon', perch: '4.13M', mult: '1.70x', access: 'Fat bounties · Swoop' },
  { id: 9, name: 'Apex', perch: '7.02M', mult: '1.85x', access: 'Whale Marks · Swoop' },
  { id: 10, name: 'Sky Lord', perch: '11.94M', mult: '2.00x', access: 'All Marks · Swoop' },
] as const

export const ALTITUDE_AMOUNTS = [
  '100,000',
  '170,000',
  '290,000',
  '490,000',
  '840,000',
  '1,430,000',
  '2,430,000',
  '4,130,000',
  '7,020,000',
  '11,940,000',
] as const

export const SWOOP_FROM_ALTITUDE = 7 // Dive

export type Mark = {
  id: string
  label: string
  addr: string
  entryEth: string
  bountyEth: string
  windowMin: number
  perches: number
  note: string
}

export const MOST_PERCHED: Mark[] = [
  {
    id: 'm1',
    label: 'Whale…88',
    addr: 'Wh4le…k88',
    entryEth: '12.4',
    bountyEth: '0.42',
    windowMin: 10,
    perches: 6,
    note: 'Fresh buy. The exit is still wide.',
  },
  {
    id: 'm2',
    label: 'AviFelman',
    addr: 'AviF…f01',
    entryEth: '8.1',
    bountyEth: '0.28',
    windowMin: 8,
    perches: 4,
    note: 'The Mark is already cutting. Beat the exit.',
  },
  {
    id: 'm3',
    label: 'NestRunner',
    addr: 'Nest…c2a',
    entryEth: '3.6',
    bountyEth: '0.11',
    windowMin: 5,
    perches: 2,
    note: 'Tight window. Watcher altitude or higher.',
  },
]

export type FeedRow = {
  id: string
  tag: 'Buy' | 'Sell' | 'Perch' | 'Swoop'
  kind: 'Trades' | 'Perches'
  addr: string
  body: string
  ago: string
  eth: string
}

export const FEED: FeedRow[] = [
  { id: '1', tag: 'Sell', kind: 'Trades', addr: '7kF4…n3Qa', body: 'sold 1,527,580.21 PERCH', ago: '1 min ago', eth: '0.0022 SOL' },
  { id: '2', tag: 'Buy', kind: 'Trades', addr: '9mC2…p8Lx', body: 'bought 2,396,381.80 PERCH', ago: '3 min ago', eth: '0.0250 SOL' },
  { id: '3', tag: 'Perch', kind: 'Perches', addr: '4aR7…k2Wd', body: 'took perch on Whale…88, win', ago: '2 min ago', eth: '0.0500 SOL' },
  { id: '4', tag: 'Sell', kind: 'Trades', addr: 'Hk91…b3Ne', body: 'sold 11,096,817.77 PERCH', ago: '5 min ago', eth: '0.0186 SOL' },
  { id: '5', tag: 'Swoop', kind: 'Perches', addr: 'Bq77…12cd', body: 'swoop closed vs 9c21…a4f0', ago: '4 min ago', eth: '0.1200 SOL' },
  { id: '6', tag: 'Buy', kind: 'Trades', addr: 'Bq77…12cd', body: 'bought 6,540,000.00 PERCH', ago: '7 min ago', eth: '0.0857 SOL' },
  { id: '7', tag: 'Perch', kind: 'Perches', addr: '5aaQ…99bb', body: 'took perch on AviFelman, bounty taken', ago: '6 min ago', eth: '0.1200 SOL' },
  { id: '8', tag: 'Sell', kind: 'Trades', addr: '56fR…8781', body: 'sold 7,220,991.08 PERCH', ago: '8 min ago', eth: '0.0120 SOL' },
]
