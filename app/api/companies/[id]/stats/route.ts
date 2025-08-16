import { NextResponse } from "next/server"
import { getCompanyStats } from "@/lib/database"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const companyId = Number.parseInt(params.id)

    if (isNaN(companyId)) {
      return NextResponse.json({ error: "Invalid company ID" }, { status: 400 })
    }

    const stats = await getCompanyStats(companyId)

    if (!stats) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 })
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching company stats:", error)
    return NextResponse.json({ error: "Failed to fetch company stats" }, { status: 500 })
  }
}
