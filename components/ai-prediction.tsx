import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, TrendingDown, Target, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AIPrediction } from "@/lib/api-client"

interface AIPredictionProps {
  prediction: AIPrediction | null
  loading: boolean
  error: string | null
}

export function AIPredictionCard({ prediction, loading, error }: AIPredictionProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Price Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-8 bg-muted rounded w-2/3"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-16 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !prediction) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Price Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">{error || "No prediction available"}</div>
        </CardContent>
      </Card>
    )
  }

  const isPositive = prediction.change >= 0

  return (
    <Card className="border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-accent" />
          AI Price Prediction
          <Badge variant="secondary" className="ml-auto">
            {prediction.confidence}% Confidence
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Prediction */}
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground">₹{prediction.predictedPrice.toFixed(2)}</div>
          <div
            className={cn(
              "flex items-center justify-center gap-1 text-sm",
              isPositive ? "text-green-600" : "text-red-600",
            )}
          >
            {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {isPositive ? "+" : ""}
            {prediction.change.toFixed(2)} ({prediction.changePercent.toFixed(2)}%)
          </div>
          <p className="text-xs text-muted-foreground mt-1">Next trading day forecast</p>
        </div>

        {/* Prediction Range */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Prediction Range</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Low: ₹{prediction.range.low}</span>
            <span>High: ₹{prediction.range.high}</span>
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="text-xs text-muted-foreground">
          <div className="flex items-center gap-1 mb-1">
            <BarChart3 className="h-3 w-3" />
            <span className="font-medium">Algorithm:</span>
          </div>
          <p>{prediction.algorithm}</p>
        </div>

        {/* Key Factors */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-muted/30 rounded p-2">
            <div className="font-medium text-muted-foreground">Trend Factor</div>
            <div className={cn("font-mono", prediction.factors.trendFactor > 0 ? "text-green-600" : "text-red-600")}>
              {prediction.factors.trendFactor > 0 ? "+" : ""}
              {prediction.factors.trendFactor.toFixed(2)}%
            </div>
          </div>
          <div className="bg-muted/30 rounded p-2">
            <div className="font-medium text-muted-foreground">Volatility</div>
            <div className="font-mono">{prediction.factors.volatility.toFixed(2)}%</div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          ⚠️ This is a demo prediction for educational purposes only
        </div>
      </CardContent>
    </Card>
  )
}
