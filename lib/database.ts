// Database utility functions
import type { Company, StockPrice } from "./mock-data"

// This would typically connect to your actual database
// For now, we'll use mock data as fallback
export async function getCompanies(): Promise<Company[]> {
  // In a real app, this would query your database
  // For demo purposes, we'll return mock data
  const { mockCompanies } = await import("./mock-data")
  return mockCompanies
}

export async function getStockPrices(companyId: number): Promise<StockPrice[]> {
  // In a real app, this would query your database
  // For demo purposes, we'll generate mock data
  const { generateMockStockData, basePrices, mockCompanies } = await import("./mock-data")

  const company = mockCompanies.find((c) => c.id === companyId)
  if (!company) return []

  const basePrice = basePrices[company.symbol] || 1000
  return generateMockStockData(companyId, basePrice)
}

export async function getCompanyStats(companyId: number) {
  const stockPrices = await getStockPrices(companyId)
  if (stockPrices.length === 0) return null

  const prices = stockPrices.map((p) => p.closePrice)
  const volumes = stockPrices.map((p) => p.volume)

  const currentPrice = prices[prices.length - 1]
  const previousPrice = prices[prices.length - 2] || currentPrice
  const change = currentPrice - previousPrice
  const changePercent = (change / previousPrice) * 100

  const high52Week = Math.max(...prices)
  const low52Week = Math.min(...prices)
  const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length

  return {
    currentPrice,
    change,
    changePercent,
    high52Week,
    low52Week,
    avgVolume: Math.round(avgVolume),
  }
}
