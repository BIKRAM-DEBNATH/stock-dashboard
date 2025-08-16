import { NextResponse } from "next/server"
import { getCompanies } from "@/lib/database"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const companyId = Number.parseInt(params.id)

    if (isNaN(companyId)) {
      return NextResponse.json({ error: "Invalid company ID" }, { status: 400 })
    }

    const companies = await getCompanies()
    const company = companies.find((c) => c.id === companyId)

    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 })
    }

    return NextResponse.json(company)
  } catch (error) {
    console.error("Error fetching company:", error)
    return NextResponse.json({ error: "Failed to fetch company" }, { status: 500 })
  }
}
