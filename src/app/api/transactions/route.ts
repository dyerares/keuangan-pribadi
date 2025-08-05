import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '../../../lib/db'
import Transaction from '../../../models/Transaction'

// Define TypeScript interfaces following project standards
interface ITransactionQuery {
  userId: string
  type?: 'income' | 'expense' | 'savings'
}

interface ITransactionBody {
  type: 'income' | 'expense' | 'savings'
  amount: number
  description: string
  category: string
  date: string
}

// GET - Fetch transactions
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || 'demo-user'
    const type = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '50') // Increase default limit
    
    // Build query with proper typing
    const query: ITransactionQuery = { userId }
    
    // FIX: Include 'savings' in type filter
    if (type && ['income', 'expense', 'savings'].includes(type)) {
      query.type = type as 'income' | 'expense' | 'savings'
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

    const body: ITransactionBody = await request.json()
    const { type, amount, description, category, date } = body

    // Input validation following project standards
    if (!type || !amount || !description || !category || !date) {
      return NextResponse.json(
        { success: false, error: 'Semua field wajib diisi' },
        { status: 400 }
      )
    }
    
    // Validate transaction type
    if (!['income', 'expense', 'savings'].includes(type)) {
      return NextResponse.json(
        { success: false, error: 'Jenis transaksi harus income, expense, atau savings' },
        { status: 400 }
      )
    }
    
    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Jumlah harus berupa angka lebih dari 0' },
        { status: 400 }
      )
    }

    // Validate description length
    if (description.trim().length === 0 || description.length > 200) {
      return NextResponse.json(
        { success: false, error: 'Deskripsi tidak boleh kosong dan maksimal 200 karakter' },
        { status: 400 }
      )
    }

    // Validate category length
    if (category.trim().length === 0 || category.length > 50) {
      return NextResponse.json(
        { success: false, error: 'Kategori tidak boleh kosong dan maksimal 50 karakter' },
        { status: 400 }
      )
    }

    // Validate date
    const transactionDate = new Date(date)
    if (isNaN(transactionDate.getTime())) {
      return NextResponse.json(
        { success: false, error: 'Format tanggal tidak valid' },
        { status: 400 }
      )
    }
    
    // Create transaction with proper typing
    const transaction = new Transaction({
      userId: 'demo-user',
      type,
      amount: Number(amount),
      description: description.trim(),
      category: category.trim(),
      date: transactionDate
    })
    
    const savedTransaction = await transaction.save()
    
    return NextResponse.json({
      success: true,
      data: savedTransaction,
      message: 'Transaksi berhasil disimpan'
    }, { status: 201 })

  } catch (error: any) {
    console.error('Error creating transaction:', error)
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({
        success: false,
        error: `Validasi gagal: ${errorMessages.join(', ')}`
      }, { status: 400 })
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        error: 'Transaksi duplikat terdeteksi'
      }, { status: 409 })
    }

    return NextResponse.json({
      success: false,
      error: 'Terjadi kesalahan internal server'
    }, { status: 500 })
  }
}
