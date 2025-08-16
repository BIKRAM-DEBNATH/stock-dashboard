"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { CompanyList } from "@/components/company-list"
import { ChartArea } from "@/components/chart-area"

export default function Dashboard() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="w-80 bg-white border-r border-slate-200 overflow-hidden">
          <CompanyList selectedCompanyId={selectedCompanyId} onCompanySelect={setSelectedCompanyId} />
        </div>

        <div className="flex-1 overflow-hidden">
          <ChartArea selectedCompanyId={selectedCompanyId} />
        </div>
      </div>
    </div>
  )
}
