import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Transaction } from '@/models'

// GET - Fetch transactions
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'demo-user' // For demo purposes
    const type = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    let query: any = { userId }
    if (type && (type === 'income' || type === 'expense')) {
      query.type = type
    }
    
    const transactions = await Transaction
      .find(query)
      .sort({ date: -1, createdAt: -1 })
      .limit(limit)
      .lean()
    
    return NextResponse.json({
      success: true,
      data: transactions
    })
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}

// POST - Create new transaction
export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { type, amount, description, category, date, userId = 'demo-user' } = body
    
    // Validation
    if (!type || !amount || !description || !category || !date) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    if (type !== 'income' && type !== 'expense') {
      return NextResponse.json(
        { success: false, error: 'Type must be income or expense' },
        { status: 400 }
      )
    }
    
    if (amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Amount must be greater than 0' },
        { status: 400 }
      )
    }
    
    const transaction = new Transaction({
      userId,
      type,
      amount: parseFloat(amount),
      description: description.trim(),
      category: category.trim(),
      date: new Date(date)
    })
    
    await transaction.save()
    
    return NextResponse.json({
      success: true,
      data: transaction
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
}
