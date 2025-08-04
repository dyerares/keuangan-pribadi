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

  const getCardColor = () => {
    switch (type) {
      case 'income':
        return 'border-l-4 border-green-500'
      case 'expense':
        return 'border-l-4 border-red-500'
      case 'balance':
        return 'border-l-4 border-blue-500'
      case 'savings':
        return 'border-l-4 border-yellow-500'
      default:
        return 'border-l-4 border-gray-500'
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 ${getCardColor()}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(amount)}
          </p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  )
}
