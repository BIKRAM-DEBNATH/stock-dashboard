import { NextResponse } from "next/server"
import { getStockPrices } from "@/lib/database"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const companyId = Number.parseInt(params.id)

    if (isNaN(companyId)) {
      return NextResponse.json({ error: "Invalid company ID" }, { status: 400 })
    }

    const stockPrices = await getStockPrices(companyId)

    if (stockPrices.length < 5) {
      return NextResponse.json({ error: "Insufficient data for prediction" }, { status: 400 })
    }

    // Simple AI prediction using multiple algorithms
    const recentPrices = stockPrices.slice(-10).map((p) => p.closePrice)
    const recentVolumes = stockPrices.slice(-10).map((p) => p.volume)

    // Moving Average Prediction
    const movingAverage = recentPrices.reduce((sum, price) => sum + price, 0) / recentPrices.length

    // Weighted Moving Average (more weight to recent prices)
    const weights = [1, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 3.0]
    const weightedSum = recentPrices.reduce((sum, price, index) => sum + price * weights[index], 0)
    const weightSum = weights.reduce((sum, weight) => sum + weight, 0)
    const weightedMovingAverage = weightedSum / weightSum

    // Trend Analysis
    const firstHalf = recentPrices.slice(0, 5)
    const secondHalf = recentPrices.slice(5)
    const firstHalfAvg = firstHalf.reduce((sum, price) => sum + price, 0) / firstHalf.length
    const secondHalfAvg = secondHalf.reduce((sum, price) => sum + price, 0) / secondHalf.length
    const trendFactor = (secondHalfAvg - firstHalfAvg) / firstHalfAvg

    // Volume-based adjustment
    const avgVolume = recentVolumes.reduce((sum, vol) => sum + vol, 0) / recentVolumes.length
    const lastVolume = recentVolumes[recentVolumes.length - 1]
    const volumeFactor = lastVolume > avgVolume ? 1.02 : 0.98 // Higher volume = slight price increase

    // Combine predictions
    const basePrediction = movingAverage * 0.3 + weightedMovingAverage * 0.7
    const trendAdjustedPrediction = basePrediction * (1 + trendFactor * 0.5)
    const finalPrediction = trendAdjustedPrediction * volumeFactor

    // Calculate confidence based on price volatility
    const volatility = calculateVolatility(recentPrices)
    const confidence = Math.max(0.6, Math.min(0.95, 1 - volatility))

    // Generate prediction range
    const currentPrice = recentPrices[recentPrices.length - 1]
    const change = finalPrediction - currentPrice
    const changePercent = (change / currentPrice) * 100

    const prediction = {
      predictedPrice: Math.round(finalPrediction * 100) / 100,
      currentPrice: Math.round(currentPrice * 100) / 100,
      change: Math.round(change * 100) / 100,
      changePercent: Math.round(changePercent * 100) / 100,
      confidence: Math.round(confidence * 100),
      algorithm: "Hybrid Moving Average + Trend Analysis",
      factors: {
        movingAverage: Math.round(movingAverage * 100) / 100,
        weightedMovingAverage: Math.round(weightedMovingAverage * 100) / 100,
        trendFactor: Math.round(trendFactor * 10000) / 100, // as percentage
        volumeFactor: Math.round(volumeFactor * 10000) / 100,
        volatility: Math.round(volatility * 10000) / 100,
      },
      range: {
        low: Math.round(finalPrediction * 0.95 * 100) / 100,
        high: Math.round(finalPrediction * 1.05 * 100) / 100,
      },
    }

    return NextResponse.json(prediction)
  } catch (error) {
    console.error("Error generating prediction:", error)
    return NextResponse.json({ error: "Failed to generate prediction" }, { status: 500 })
  }
}

function calculateVolatility(prices: number[]): number {
  if (prices.length < 2) return 0

  const returns = []
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i - 1]) / prices[i - 1])
  }

  const avgReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length
  const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length

  return Math.sqrt(variance)
}
