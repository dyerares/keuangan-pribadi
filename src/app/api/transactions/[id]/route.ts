import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '../../../../lib/db'
import Transaction from '../../../../models/Transaction'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    const { id } = params

    // Validasi ID
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID transaksi diperlukan'
      }, { status: 400 })
    }

    // Cari dan hapus transaksi
    const deletedTransaction = await Transaction.findByIdAndDelete(id)

    if (!deletedTransaction) {
      return NextResponse.json({
        success: false,
        error: 'Transaksi tidak ditemukan'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Transaksi berhasil dihapus',
      data: deletedTransaction
    })

  } catch (error) {
    console.error('Error deleting transaction:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    const { id } = params

    // Validasi ID
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID transaksi diperlukan'
      }, { status: 400 })
    }

    // Cari transaksi berdasarkan ID
    const transaction = await Transaction.findById(id)

    if (!transaction) {
      return NextResponse.json({
        success: false,
        error: 'Transaksi tidak ditemukan'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: transaction
    })

  } catch (error) {
    console.error('Error fetching transaction:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}
