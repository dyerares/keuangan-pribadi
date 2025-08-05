'use client'

interface DashboardCardProps {
  title: string
  amount: number
  type: 'balance' | 'income' | 'expense' | 'savings'
  icon: string
}

export default function DashboardCard({ title, amount, type, icon }: DashboardCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getCardStyles = () => {
    switch (type) {
      case 'income':
        return {
          border: 'border-l-4 border-green-500',
          background: 'bg-green-50',
          textColor: 'text-green-700'
        }
      case 'expense':
        return {
          border: 'border-l-4 border-red-500',
          background: 'bg-red-50',
          textColor: 'text-red-700'
        }
      case 'savings':
        return {
          border: 'border-l-4 border-blue-500',
          background: 'bg-blue-50',
          textColor: 'text-blue-700'
        }
      case 'balance':
        return {
          border: 'border-l-4 border-purple-500',
          background: amount >= 0 ? 'bg-purple-50' : 'bg-red-50',
          textColor: amount >= 0 ? 'text-purple-700' : 'text-red-700'
        }
      default:
        return {
          border: 'border-l-4 border-gray-500',
          background: 'bg-gray-50',
          textColor: 'text-gray-700'
        }
    }
  }

  const cardStyles = getCardStyles()

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 ${cardStyles.border} hover:shadow-lg transition-shadow duration-200`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${cardStyles.textColor}`}>
            {formatCurrency(amount)}
          </p>
        </div>
        <div className={`text-4xl p-3 rounded-full ${cardStyles.background}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
