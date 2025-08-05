'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Transaction {
  _id: string
  type: 'income' | 'expense' | 'savings'  // Tambahkan 'savings'
  amount: number
  description: string
  category: string
  date: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'income' | 'expense' | 'savings'>('all')  // Tambahkan 'savings'

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions')
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

  const deleteTransaction = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
      return
    }

    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        setTransactions(prev => prev.filter(t => t._id !== id))
      } else {
        alert('Error: ' + result.error)
      }
    } catch (error) {
      console.error('Error deleting transaction:', error)
      alert('Terjadi kesalahan saat menghapus transaksi')
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

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true
    return transaction.type === filter
  })

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalSavings = transactions
    .filter(t => t.type === 'savings')
    .reduce((sum, t) => sum + t.amount, 0)

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Semua Transaksi</h1>
          <p className="text-gray-600 mt-1">
            Kelola dan pantau semua transaksi keuangan Anda
          </p>
        </div>
        <Link
          href="/transactions/add"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          + Tambah Transaksi
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Total Pemasukan</div>
          <div className="text-2xl font-bold text-green-600 mt-1">
            {formatCurrency(totalIncome)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Total Pengeluaran</div>
          <div className="text-2xl font-bold text-red-600 mt-1">
            {formatCurrency(totalExpense)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Total Tabungan</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">
            {formatCurrency(totalSavings)}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="text-sm font-medium text-gray-500">Saldo Bersih</div>
          <div className={`text-2xl font-bold mt-1 ${
            totalIncome - totalExpense >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {formatCurrency(totalIncome - totalExpense)}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex flex-wrap gap-1 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
              filter === 'all'
                ? 'bg-gray-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Semua ({transactions.length})
          </button>
          <button
            onClick={() => setFilter('income')}
            className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
              filter === 'income'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            💰 Pemasukan ({transactions.filter(t => t.type === 'income').length})
          </button>
          <button
            onClick={() => setFilter('expense')}
            className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
              filter === 'expense'
                ? 'bg-red-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            💸 Pengeluaran ({transactions.filter(t => t.type === 'expense').length})
          </button>
          <button
            onClick={() => setFilter('savings')}
            className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
              filter === 'savings'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🏦 Tabungan ({transactions.filter(t => t.type === 'savings').length})
          </button>
        </div>

        {/* Transactions List */}
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-lg mb-2">Belum ada transaksi</p>
            <p className="text-sm">
              {filter === 'all' 
                ? 'Mulai dengan menambahkan transaksi pertama Anda'
                : `Belum ada transaksi ${
                    filter === 'income' ? 'pemasukan' : 
                    filter === 'expense' ? 'pengeluaran' : 'tabungan'
                  }`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((transaction) => (
              <div 
                key={transaction._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                    transaction.type === 'income' ? 'bg-green-500' : 
                    transaction.type === 'expense' ? 'bg-red-500' : 'bg-blue-500'
                  }`}>
                    {transaction.type === 'income' ? '💰' : 
                     transaction.type === 'expense' ? '💸' : '🏦'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.category} • {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`font-bold text-lg ${
                    transaction.type === 'income' ? 'text-green-600' : 
                    transaction.type === 'expense' ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {transaction.type === 'expense' ? '-' : '+'}
                    {formatCurrency(transaction.amount)}
                  </div>
                  <button
                    onClick={() => deleteTransaction(transaction._id)}
                    className="text-red-600 hover:text-red-700 p-2"
                    title="Hapus transaksi"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
