"use client"

import { useState, useEffect } from "react"
import type { Company, StockPrice } from "./mock-data"

const API_BASE = "/api"

export interface CompanyStats {
  currentPrice: number
  change: number
  changePercent: number
  high52Week: number
  low52Week: number
  avgVolume: number
}

export interface AIPrediction {
  predictedPrice: number
  currentPrice: number
  change: number
  changePercent: number
  confidence: number
  algorithm: string
  factors: {
    movingAverage: number
    weightedMovingAverage: number
    trendFactor: number
    volumeFactor: number
    volatility: number
  }
  range: {
    low: number
    high: number
  }
}

export class ApiClient {
  static async getCompanies(): Promise<Company[]> {
    const response = await fetch(`${API_BASE}/companies`)
    if (!response.ok) {
      throw new Error("Failed to fetch companies")
    }
    return response.json()
  }

  static async getCompany(id: number): Promise<Company> {
    const response = await fetch(`${API_BASE}/companies/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch company")
    }
    return response.json()
  }

  static async getStockPrices(companyId: number): Promise<StockPrice[]> {
    const response = await fetch(`${API_BASE}/companies/${companyId}/prices`)
    if (!response.ok) {
      throw new Error("Failed to fetch stock prices")
    }
    return response.json()
  }

  static async getCompanyStats(companyId: number): Promise<CompanyStats> {
    const response = await fetch(`${API_BASE}/companies/${companyId}/stats`)
    if (!response.ok) {
      throw new Error("Failed to fetch company stats")
    }
    return response.json()
  }

  static async getPrediction(companyId: number): Promise<AIPrediction> {
    const response = await fetch(`${API_BASE}/companies/${companyId}/predict`)
    if (!response.ok) {
      throw new Error("Failed to fetch prediction")
    }
    return response.json()
  }
}

// React hooks for data fetching
export function useCompanies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ApiClient.getCompanies()
      .then(setCompanies)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { companies, loading, error }
}

export function useStockData(companyId: number | null) {
  const [stockPrices, setStockPrices] = useState<StockPrice[]>([])
  const [stats, setStats] = useState<CompanyStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!companyId) {
      setStockPrices([])
      setStats(null)
      return
    }

    setLoading(true)
    setError(null)

    Promise.all([ApiClient.getStockPrices(companyId), ApiClient.getCompanyStats(companyId)])
      .then(([prices, statistics]) => {
        setStockPrices(prices)
        setStats(statistics)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [companyId])

  return { stockPrices, stats, loading, error }
}

export function usePrediction(companyId: number | null) {
  const [prediction, setPrediction] = useState<AIPrediction | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!companyId) {
      setPrediction(null)
      return
    }

    setLoading(true)
    setError(null)

    ApiClient.getPrediction(companyId)
      .then(setPrediction)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [companyId])

  return { prediction, loading, error }
}

export function useStockPrices(companyId: string | null) {
  const [stockPrices, setStockPrices] = useState<StockPrice[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!companyId) {
      setStockPrices([])
      return
    }

    setLoading(true)
    setError(null)

    ApiClient.getStockPrices(Number.parseInt(companyId))
      .then(setStockPrices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [companyId])

  return { stockPrices, loading, error }
}

export function useCompanyStats(companyId: string | null) {
  const [stats, setStats] = useState<CompanyStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!companyId) {
      setStats(null)
      return
    }

    setLoading(true)
    setError(null)

    ApiClient.getCompanyStats(Number.parseInt(companyId))
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [companyId])

  return { stats, loading, error }
}
