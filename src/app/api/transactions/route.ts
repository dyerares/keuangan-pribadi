import { NextRequest, NextResponse } from 'next/server'

// Demo data storage (in-memory untuk demo)
let demoTransactions: any[] = [
  {
    id: '1',
    type: 'income',
    amount: 5000000,
    description: 'Gaji Bulan Ini',
    category: 'Salary',
    date: '2025-08-01',
    userId: 'demo-user'
  },
  {
    id: '2',
    type: 'expense',
    amount: 500000,
    description: 'Belanja Groceries',
    category: 'Food & Dining',
    date: '2025-08-03',
    userId: 'demo-user'
  }
]

// GET - Fetch transactions
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: demoTransactions
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}

// POST - Create new transaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, amount, description, category, date } = body
    
    // Validation
    if (!type || !amount || !description || !category || !date) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create new transaction
    const newTransaction = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      description: description.trim(),
      category: category.trim(),
      date,
      userId: 'demo-user'
    }
    
    // Add to demo storage
    demoTransactions.push(newTransaction)
    
    return NextResponse.json({
      success: true,
      data: newTransaction
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
}
