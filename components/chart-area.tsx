import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AIPredictionCard } from "@/components/ai-prediction"
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Activity, Volume2 } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts"
import { cn } from "@/lib/utils"
import type { Company, StockPrice } from "@/lib/mock-data"
import type { CompanyStats } from "@/lib/api-client"
import { usePrediction } from "@/lib/api-client"

interface ChartAreaProps {
  company: Company | null
  stockPrices: StockPrice[]
  stats: CompanyStats | null
  loading: boolean
  error: string | null
}

export function ChartArea({ company, stockPrices, stats, loading, error }: ChartAreaProps) {
  const { prediction, loading: predictionLoading, error: predictionError } = usePrediction(company?.id || null)

  if (!company) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Select a Company</h3>
          <p className="text-muted-foreground">Choose a company from the sidebar to view its stock data</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="h-full p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-destructive text-lg mb-2">Error loading data</div>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  const isPositive = stats ? stats.change >= 0 : false

  const chartData = stockPrices.map((price) => ({
    date: new Date(price.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    fullDate: price.date,
    price: price.closePrice,
    open: price.openPrice,
    high: price.highPrice,
    low: price.lowPrice,
    volume: price.volume,
  }))

  const chartConfig = {
    price: {
      label: "Price",
      color: "hsl(var(--chart-1))",
    },
    volume: {
      label: "Volume",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <div className="h-full p-6 overflow-auto">
      {/* Company Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-foreground">{company.symbol}</h1>
          <Badge variant="outline">{company.sector}</Badge>
        </div>
        <p className="text-muted-foreground">{company.name}</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.currentPrice.toFixed(2)}</div>
              <div className={cn("flex items-center text-sm", isPositive ? "text-green-600" : "text-red-600")}>
                {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {isPositive ? "+" : ""}
                {stats.change.toFixed(2)} ({stats.changePercent.toFixed(2)}%)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">52W High</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.high52Week.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">52-week high</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">52W Low</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.low52Week.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">52-week low</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Volume</CardTitle>
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(stats.avgVolume / 1000).toFixed(0)}K</div>
              <p className="text-xs text-muted-foreground">Average daily volume</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Stock Price Trend (30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value}`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => [
                        `₹${Number(value).toFixed(2)}`,
                        name === "price" ? "Close Price" : name,
                      ]}
                      labelFormatter={(label, payload) => {
                        if (payload && payload[0]) {
                          return new Date(payload[0].payload.fullDate).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        }
                        return label
                      }}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Trading Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => [
                        `${Number(value).toLocaleString()}`,
                        name === "volume" ? "Volume" : name,
                      ]}
                      labelFormatter={(label, payload) => {
                        if (payload && payload[0]) {
                          return new Date(payload[0].payload.fullDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        }
                        return label
                      }}
                    />
                  }
                />
                <Line type="monotone" dataKey="volume" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="lg:col-span-1">
          <AIPredictionCard prediction={prediction} loading={predictionLoading} error={predictionError} />
        </div>
      </div>

      {/* Recent Trading Data */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Trading Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Date</th>
                  <th className="text-right p-2">Open</th>
                  <th className="text-right p-2">High</th>
                  <th className="text-right p-2">Low</th>
                  <th className="text-right p-2">Close</th>
                  <th className="text-right p-2">Volume</th>
                </tr>
              </thead>
              <tbody>
                {chartData
                  .slice(-7)
                  .reverse()
                  .map((data, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2">{new Date(data.fullDate).toLocaleDateString()}</td>
                      <td className="text-right p-2">₹{data.open.toFixed(2)}</td>
                      <td className="text-right p-2">₹{data.high.toFixed(2)}</td>
                      <td className="text-right p-2">₹{data.low.toFixed(2)}</td>
                      <td className="text-right p-2 font-medium">₹{data.price.toFixed(2)}</td>
                      <td className="text-right p-2">{data.volume.toLocaleString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
