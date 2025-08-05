import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/db'
import Transaction from '../../../models/Transaction'

interface ISummaryResult {
  totalIncome: number
  totalExpense: number
  totalSavings: number
  totalTransactions: number
  balance: number
}

export async function GET() {
  try {
    await dbConnect()

    // Aggregate transactions by type
    const aggregateResult = await Transaction.aggregate([
      {
        $match: {
          userId: 'demo-user'
        }
      },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ])

    // Initialize summary object
    const summary: ISummaryResult = {
      totalIncome: 0,
      totalExpense: 0,
      totalSavings: 0,
      totalTransactions: 0,
      balance: 0
    }

    // Process aggregation results
    aggregateResult.forEach(item => {
      switch (item._id) {
        case 'income':
          summary.totalIncome = item.total
          break
        case 'expense':
          summary.totalExpense = item.total
          break
        case 'savings':
          summary.totalSavings = item.total
          break
      }
      summary.totalTransactions += item.count
    })

    // Calculate balance (income - expense, savings separate)
    summary.balance = summary.totalIncome - summary.totalExpense

    // Get recent transactions
    const recentTransactions = await Transaction
      .find({ userId: 'demo-user' })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()

    return NextResponse.json({
      success: true,
      data: {
        summary,
        recentTransactions
      }
    })

  } catch (error) {
    console.error('Error fetching summary:', error)
    return NextResponse.json({
      success: false,
      error: 'Gagal mengambil ringkasan data'
    }, { status: 500 })
  }
}
