import { NextResponse } from 'next/server'

// Demo summary data
export async function GET() {
  try {
    // Demo data untuk summary
    const demoSummary = {
      period: { 
        month: new Date().getMonth(), 
        year: new Date().getFullYear() 
      },
      summary: {
        totalIncome: 8000000,
        totalExpense: 3000000,
        balance: 5000000
      },
      breakdown: {
        expensesByCategory: {
          'Food & Dining': 1500000,
          'Transportation': 800000,
          'Shopping': 700000
        },
        incomeByCategory: {
          'Salary': 7000000,
          'Freelance': 1000000
        }
      },
      transactionCount: 15
    }
    
    return NextResponse.json({
      success: true,
      data: demoSummary
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch summary' },
      { status: 500 }
    )
  }
}
