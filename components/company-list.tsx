"use client"
import { useCompanies } from "@/lib/api-client"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Company {
  id: string
  name: string
  symbol: string
  sector: string
  market_cap: number
}

interface CompanyListProps {
  selectedCompanyId: string | null
  onCompanySelect: (companyId: string) => void
}

export function CompanyList({ selectedCompanyId, onCompanySelect }: CompanyListProps) {
  const { data: companies, isLoading, error } = useCompanies()

  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Companies</h2>
        <div className="space-y-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Companies</h2>
        <div className="text-center py-8">
          <p className="text-red-600 mb-2">Failed to load companies</p>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">Companies</h2>
        <p className="text-sm text-slate-600">{companies?.length || 0} stocks available</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {companies?.map((company: Company) => (
            <button
              key={company.id}
              onClick={() => onCompanySelect(company.id)}
              className={`w-full p-3 rounded-lg text-left transition-colors ${
                selectedCompanyId === company.id
                  ? "bg-blue-50 border border-blue-200"
                  : "hover:bg-slate-50 border border-transparent"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-slate-900 truncate">{company.symbol}</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{company.sector}</span>
                  </div>
                  <p className="text-sm text-slate-600 truncate mt-1">{company.name}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Market Cap: ₹{(company.market_cap / 10000000).toFixed(1)}Cr
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
