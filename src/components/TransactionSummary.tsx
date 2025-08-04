'use client'

import { useState, useEffect } from 'react'

interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  description: string
  category: string
  date: string
}

export default function TransactionSummary() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // Untuk demo, kita akan menggunakan data dummy
  // Nanti akan diganti dengan data dari database
  useEffect(() => {
    const dummyTransactions: Transaction[] = [
      {
        id: '1',
        type: 'income',
        amount: 5000000,
        description: 'Gaji Bulan Ini',
        category: 'Salary',
        date: '2025-08-01'
      },
      {
        id: '2',
        type: 'expense',
        amount: 500000,
        description: 'Belanja Groceries',
        category: 'Food',
        date: '2025-08-03'
      },
      {
        id: '3',
        type: 'expense',
        amount: 200000,
        description: 'Bensin Motor',
        category: 'Transportation',
        date: '2025-08-02'
      }
    ]
    setTransactions(dummyTransactions)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Transaksi Terbaru</h2>
      
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          Belum ada transaksi
        </p>
      ) : (
        <div className="space-y-3">
          {transactions.slice(0, 5).map((transaction) => (
            <div 
              key={transaction.id}
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
                    {transaction.category} • {new Date(transaction.date).toLocaleDateString('id-ID')}
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
        <button className="w-full text-blue-600 hover:text-blue-700 font-medium">
          Lihat Semua Transaksi →
        </button>
      </div>
    </div>
  )
}
