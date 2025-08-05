import { NextResponse } from 'next/server'
import dbConnect from '../../../lib/db'
import Transaction from '../../../models/Transaction'

export async function GET() {
  try {
    await dbConnect()

    // Aggregate data untuk summary
    const summary = await Transaction.aggregate([
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ])

    // Format hasil
    const result = {
      totalIncome: 0,
      totalExpense: 0,
      totalSavings: 0,  // TAMBAHKAN TOTAL SAVINGS
      totalTransactions: 0,
      balance: 0
    }

    summary.forEach(item => {
      if (item._id === 'income') {
        result.totalIncome = item.total
      } else if (item._id === 'expense') {
        result.totalExpense = item.total
      } else if (item._id === 'savings') {  // TAMBAHKAN CASE SAVINGS
        result.totalSavings = item.total
      }
      result.totalTransactions += item.count
    })

    // Hitung balance (income - expense, savings tidak mempengaruhi balance utama)
    result.balance = result.totalIncome - result.totalExpense

    // Get recent transactions
    const recentTransactions = await Transaction.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()

    return NextResponse.json({
      success: true,
      data: {
        summary: result,
        recentTransactions
      }
    })

  } catch (error) {
    console.error('Error fetching summary:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch summary'
    }, { status: 500 })
  }
}
