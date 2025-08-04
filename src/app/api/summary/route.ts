import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Transaction } from '@/models'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'demo-user'
    const month = parseInt(searchParams.get('month') || new Date().getMonth().toString())
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString())
    
    // Calculate date range for the month
    const startDate = new Date(year, month, 1)
    const endDate = new Date(year, month + 1, 0)
    
    // Get transactions for the month
    const transactions = await Transaction.find({
      userId,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    }).lean()
    
    // Calculate totals
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const balance = totalIncome - totalExpense
    
    // Get expense by category
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {} as Record<string, number>)
    
    // Get income by category
    const incomeByCategory = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {} as Record<string, number>)
    
    return NextResponse.json({
      success: true,
      data: {
        period: { month, year },
        summary: {
          totalIncome,
          totalExpense,
          balance
        },
        breakdown: {
          expensesByCategory,
          incomeByCategory
        },
        transactionCount: transactions.length
      }
    })
  } catch (error) {
    console.error('Error fetching summary:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch summary' },
      { status: 500 }
    )
  }
}
