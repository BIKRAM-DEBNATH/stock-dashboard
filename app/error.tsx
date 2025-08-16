"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
          <p className="text-slate-600 max-w-md mx-auto">An unexpected error occurred while loading the dashboard.</p>
        </div>

        <div className="space-y-4">
          <Button onClick={reset} variant="outline">
            Try again
          </Button>
          <Button asChild>
            <a href="/">Return to Dashboard</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
