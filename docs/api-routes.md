# API Routes & Data Sources

## Blockscout API (Testnet)

Base URL: `https://test.quarrychain.network`

### Endpoints
```
GET /api/v2/stats                    → total blocks, transactions, addresses
GET /api/v2/blocks?type=block        → latest blocks
GET /api/v2/stats/charts/market      → if token is listed
```

### Usage
- Client component with SWR for polling (every 15s)
- Graceful fallback to static numbers if API unavailable
- Environment variable: `NEXT_PUBLIC_BLOCKSCOUT_URL`

### Expected Response Fields (stats)
- Total blocks
- Total transactions
- Total addresses
- Average block time

## Static Data Sources (from whitepaper/pitch deck)

All static data lives in `src/lib/constants.ts`:

### Tokenomics Allocation
| Category | Percentage |
|---|---|
| Public Sale / Liquidity | 30% |
| Staking & Farming | 20% |
| Team | 20% |
| Angel Investors | 10% |
| Dev | 5% |
| Ecosystem | 5% |
| Marketing | 5% |
| Private Presale | 2.5% |
| Private Sale | 2.5% |

### Token Details
- Total Supply: 200,000,000 QRY
- Symbol: QRC
- Decimals: 18
- Seed Price: $0.25 (50% discount)

### Revenue Model
- 0.25% transaction fees
- Smart contract deployment fees
- 1% asset tokenization commission
