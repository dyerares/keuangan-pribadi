'use client'

import { useState, useEffect } from 'react'
import DashboardCard from '@/components/DashboardCard'
import TransactionSummary from '@/components/TransactionSummary'

// Define TypeScript interfaces following project standards
interface ISummaryData {
  totalIncome: number
  totalExpense: number
  totalSavings: number
  totalTransactions: number
  balance: number
}

interface ITransaction {
  _id: string
  type: 'income' | 'expense' | 'savings'
  amount: number
  description: string
  category: string
  date: string
  createdAt: string
}

interface IDashboardData {
  summary: ISummaryData
  recentTransactions: ITransaction[]
}

export default function Dashboard() {
  const [data, setData] = useState<IDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/summary', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      
      if (result.success && result.data) {
        setData(result.data)
      } else {
        throw new Error(result.error || 'Data tidak tersedia')
      }
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error)
      setError(error.message || 'Terjadi kesalahan jaringan')
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state with skeleton
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="h-8 bg-gray-200 rounded w-96 mx-auto mb-2 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-80 mx-auto animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2 w-24"></div>
                  <div className="h-8 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Error state with retry option
  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Keuangan Pribadi
          </h1>
          <p className="text-gray-600">
            Kelola keuangan Anda dengan mudah dan efisien
          </p>
        </div>
        
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md mx-auto">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-red-500">⚠️</span>
            <p className="font-medium">Gagal memuat data</p>
          </div>
          <p className="text-sm mb-3">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition duration-200"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  // No data state
  if (!data) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Keuangan Pribadi
          </h1>
          <p className="text-gray-600">
            Kelola keuangan Anda dengan mudah dan efisien
          </p>
        </div>
        
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-gray-500 text-lg mb-2">Tidak ada data tersedia</p>
          <p className="text-gray-400 text-sm mb-4">Silakan tambah transaksi pertama Anda</p>
          <a
            href="/transactions/add"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Tambah Transaksi Pertama
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Keuangan Pribadi
        </h1>
        <p className="text-gray-600">
          Kelola keuangan Anda dengan mudah dan efisien
        </p>
      </div>

      {/* Dashboard Cards - 4 Cards dengan data real dari transaksi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Pemasukan Bulan Ini"
          amount={data.summary.totalIncome}
          type="income"
          icon="💰"
        />
        <DashboardCard
          title="Pengeluaran Bulan Ini"
          amount={data.summary.totalExpense}
          type="expense"
          icon="💸"
        />
        <DashboardCard
          title="Saldo Tabungan"
          amount={data.summary.totalSavings}
          type="savings"
          icon="🏦"
        />
        <DashboardCard
          title="Total Saldo"
          amount={data.summary.balance}
          type="balance"
          icon="💼"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/transactions/add"
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg text-center transition duration-200 block"
          >
            💰 Tambah Pemasukan
          </a>
          <a
            href="/transactions/add"
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg text-center transition duration-200 block"
          >
            💸 Tambah Pengeluaran
          </a>
          <a
            href="/transactions/add"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg text-center transition duration-200 block"
          >
            🏦 Tambah Tabungan
          </a>
        </div>
      </div>

      {/* Transaction Summary - Conditional rendering */}
      <TransactionSummary 
        recentTransactions={data.recentTransactions || []}
        onTransactionUpdate={fetchDashboardData}
      />

      {/* Enhanced Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Statistik Keuangan</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Transaksi</span>
              <span className="font-semibold text-blue-600">{data.summary.totalTransactions}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Rasio Tabungan</span>
              <span className="font-semibold text-green-600">
                {data.summary.totalIncome > 0 
                  ? `${((data.summary.totalSavings / data.summary.totalIncome) * 100).toFixed(1)}%`
                  : '0%'
                }
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Cash Flow</span>
              <span className={`font-semibold ${
                (data.summary.totalIncome - data.summary.totalExpense) >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {(data.summary.totalIncome - data.summary.totalExpense) >= 0 ? 'Surplus' : 'Defisit'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status Tabungan</span>
              <span className={`font-semibold ${
                data.summary.totalSavings > 0 ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {data.summary.totalSavings > 0 ? 'Aktif Menabung' : 'Belum Menabung'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Tips Keuangan</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <span className="text-blue-500">🎯</span>
              <p>Sisihkan minimal 20% dari pemasukan untuk tabungan darurat</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500">📈</span>
              <p>Review pengeluaran bulanan untuk identifikasi area penghematan</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-500">⚡</span>
              <p>Catat setiap transaksi untuk kontrol keuangan yang lebih baik</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-purple-500">🏦</span>
              <p>Gunakan fitur Tambah Tabungan untuk melacak progress menabung</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
