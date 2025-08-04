'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Transaction {
  _id: string
  type: 'income' | 'expense'
  amount: number
  description: string
  category: string
  date: string
}

export default function TransactionSummary() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions?limit=5')
      const result = await response.json()
      
      if (result.success) {
        setTransactions(result.data)
      }
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Transaksi Terbaru</h2>
        <div className="text-center py-8 text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Transaksi Terbaru</h2>
      
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-2">Belum ada transaksi</p>
          <p className="text-sm">Mulai dengan menambahkan transaksi pertama Anda</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div 
              key={transaction._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  transaction.type === 'income' 
                    ? 'bg-green-500' 
                    : 'bg-red-500'
                }`}>
                  {transaction.type === 'income' ? '💰' : '💸'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {transaction.category} • {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              <div className={`font-semibold ${
                transaction.type === 'income' 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t">
        <Link 
          href="/transactions" 
          className="block w-full text-center text-blue-600 hover:text-blue-700 font-medium py-2"
        >
          Lihat Semua Transaksi →
        </Link>
      </div>
    </div>
  )
}
