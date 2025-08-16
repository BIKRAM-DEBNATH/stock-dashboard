import { NextResponse } from "next/server"
import { getStockPrices } from "@/lib/database"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const companyId = Number.parseInt(params.id)

    if (isNaN(companyId)) {
      return NextResponse.json({ error: "Invalid company ID" }, { status: 400 })
    }

    const stockPrices = await getStockPrices(companyId)
    return NextResponse.json(stockPrices)
  } catch (error) {
    console.error("Error fetching stock prices:", error)
    return NextResponse.json({ error: "Failed to fetch stock prices" }, { status: 500 })
  }
}
