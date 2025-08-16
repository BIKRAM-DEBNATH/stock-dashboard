// Mock data for development and fallback
export interface Company {
  id: number
  symbol: string
  name: string
  sector: string
  marketCap: number
}

export interface StockPrice {
  id: number
  companyId: number
  date: string
  openPrice: number
  highPrice: number
  lowPrice: number
  closePrice: number
  volume: number
}

export const mockCompanies: Company[] = [
  { id: 1, symbol: "RELIANCE", name: "Reliance Industries Limited", sector: "Oil & Gas", marketCap: 1500000000000 },
  {
    id: 2,
    symbol: "TCS",
    name: "Tata Consultancy Services",
    sector: "Information Technology",
    marketCap: 1200000000000,
  },
  { id: 3, symbol: "INFY", name: "Infosys Limited", sector: "Information Technology", marketCap: 800000000000 },
  { id: 4, symbol: "HDFCBANK", name: "HDFC Bank Limited", sector: "Banking", marketCap: 900000000000 },
  { id: 5, symbol: "ICICIBANK", name: "ICICI Bank Limited", sector: "Banking", marketCap: 700000000000 },
  { id: 6, symbol: "BHARTIARTL", name: "Bharti Airtel Limited", sector: "Telecommunications", marketCap: 600000000000 },
  { id: 7, symbol: "ITC", name: "ITC Limited", sector: "FMCG", marketCap: 500000000000 },
  { id: 8, symbol: "SBIN", name: "State Bank of India", sector: "Banking", marketCap: 450000000000 },
  { id: 9, symbol: "LT", name: "Larsen & Toubro Limited", sector: "Engineering", marketCap: 400000000000 },
  {
    id: 10,
    symbol: "HCLTECH",
    name: "HCL Technologies Limited",
    sector: "Information Technology",
    marketCap: 350000000000,
  },
  { id: 11, symbol: "WIPRO", name: "Wipro Limited", sector: "Information Technology", marketCap: 300000000000 },
  { id: 12, symbol: "MARUTI", name: "Maruti Suzuki India Limited", sector: "Automobile", marketCap: 280000000000 },
]

// Generate mock stock price data for the last 30 days
export function generateMockStockData(companyId: number, basePrice: number): StockPrice[] {
  const data: StockPrice[] = []
  const today = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Generate realistic price movements
    const variation = (Math.random() - 0.5) * 0.1 // ±10% variation
    const openPrice = basePrice * (1 + variation)
    const highPrice = openPrice * (1 + Math.random() * 0.05) // Up to 5% higher
    const lowPrice = openPrice * (1 - Math.random() * 0.05) // Up to 5% lower
    const closePrice = lowPrice + (highPrice - lowPrice) * Math.random()

    data.push({
      id: i + companyId * 100,
      companyId,
      date: date.toISOString().split("T")[0],
      openPrice: Math.round(openPrice * 100) / 100,
      highPrice: Math.round(highPrice * 100) / 100,
      lowPrice: Math.round(lowPrice * 100) / 100,
      closePrice: Math.round(closePrice * 100) / 100,
      volume: Math.floor(Math.random() * 1000000 + 100000),
    })
  }

  return data
}

// Base prices for mock data generation
export const basePrices: Record<string, number> = {
  RELIANCE: 2500.0,
  TCS: 3800.0,
  INFY: 1650.0,
  HDFCBANK: 1580.0,
  ICICIBANK: 950.0,
  BHARTIARTL: 850.0,
  ITC: 420.0,
  SBIN: 580.0,
  LT: 3200.0,
  HCLTECH: 1450.0,
  WIPRO: 480.0,
  MARUTI: 11500.0,
}
