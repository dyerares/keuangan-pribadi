'use client'

// TypeScript interfaces sesuai Copilot Instructions
interface ITransaction {
  _id: string
  type: 'income' | 'expense' | 'savings'
  amount: number
  description: string
  category: string
  date: string
  createdAt: string
}

interface TransactionSummaryProps {
  recentTransactions: ITransaction[]
  onTransactionUpdate: () => void
}

export default function TransactionSummary({ 
  recentTransactions, 
  onTransactionUpdate 
}: TransactionSummaryProps) {
  
  // Indonesian currency formatting sesuai project standards
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Indonesian date formatting
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getTypeStyle = (type: string): string => {
    switch (type) {
      case 'income':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'expense':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'savings':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeLabel = (type: string): string => {
    switch (type) {
      case 'income':
        return 'Pemasukan'
      case 'expense':
        return 'Pengeluaran'
      case 'savings':
        return 'Tabungan'
      default:
        return type
    }
  }

  const getTypeIcon = (type: string): string => {
    switch (type) {
      case 'income':
        return '💰'
      case 'expense':
        return '💸'
      case 'savings':
        return '🏦'
      default:
        return '📄'
    }
  }

  const getAmountColor = (type: string): string => {
    switch (type) {
      case 'income':
        return 'text-green-600'
      case 'expense':
        return 'text-red-600'
      case 'savings':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  // Handle empty state
  if (!recentTransactions || recentTransactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Transaksi Terbaru</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📄</div>
          <p className="text-gray-500 mb-2">Belum ada transaksi</p>
          <p className="text-gray-400 text-sm mb-4">Transaksi terbaru akan muncul di sini</p>
          <a
            href="/transactions/add"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition duration-200"
          >
            Tambah Transaksi
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">📋 Transaksi Terbaru</h3>
        <a
          href="/transactions"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition duration-200"
        >
          Lihat Semua →
        </a>
      </div>
      
      <div className="space-y-3">
        {recentTransactions.map((transaction) => (
          <div
            key={transaction._id}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition duration-200"
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">
                {getTypeIcon(transaction.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getTypeStyle(transaction.type)}`}>
                    {getTypeLabel(transaction.type)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(transaction.date)}
                  </span>
                </div>
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-600">{transaction.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${getAmountColor(transaction.type)}`}>
                {transaction.type === 'expense' ? '-' : '+'}
                {formatCurrency(transaction.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
