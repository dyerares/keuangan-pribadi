'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import DashboardCard from '@/components/DashboardCard'
import TransactionSummary from '@/components/TransactionSummary'

export default function Home() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    savings: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSummary()
  }, [])

  const fetchSummary = async () => {
    try {
      const response = await fetch('/api/summary')
      const result = await response.json()
      
      if (result.success) {
        const data = result.data.summary
        setSummary({
          totalIncome: data.totalIncome,
          totalExpense: data.totalExpense,
          balance: data.balance,
          savings: Math.max(0, data.balance * 0.2) // 20% dari balance sebagai target saving
        })
      }
    } catch (error) {
      console.error('Error fetching summary:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Keuangan Pribadi
        </h1>
        <p className="text-gray-600">
          Kelola keuangan Anda dengan mudah dan efisien
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Saldo"
          amount={summary.balance}
          type="balance"
          icon="💰"
        />
        <DashboardCard
          title="Pemasukan Bulan Ini"
          amount={summary.totalIncome}
          type="income"
          icon="📈"
        />
        <DashboardCard
          title="Pengeluaran Bulan Ini"
          amount={summary.totalExpense}
          type="expense"
          icon="📉"
        />
        <DashboardCard
          title="Target Tabungan"
          amount={summary.savings}
          type="savings"
          icon="🎯"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link 
              href="/transactions/add" 
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 text-center"
            >
              Tambah Pemasukan
            </Link>
            <Link 
              href="/transactions/add" 
              className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200 text-center"
            >
              Tambah Pengeluaran
            </Link>
            <Link 
              href="/budget" 
              className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200 text-center"
            >
              Atur Budget
            </Link>
          </div>
        </div>

        <TransactionSummary />
      </div>
    </div>
  )
}
