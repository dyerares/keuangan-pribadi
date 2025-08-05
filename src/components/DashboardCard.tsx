"use client";

interface DashboardCardProps {
  title: string;
  amount: number;
  type: "balance" | "income" | "expense" | "savings";
  icon: string;
}

export default function DashboardCard({
  title,
  amount,
  type,
  icon,
}: DashboardCardProps) {
  // Indonesian currency formatting sesuai project instructions
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCardStyles = () => {
    switch (type) {
      case "income":
        return {
          borderLeft: "border-l-4 border-l-green-500",
          borderOther: "border-t border-r border-b border-gray-200",
          background: "bg-green-50",
          textColor: "text-green-700",
          iconBg: "bg-green-100",
        };
      case "expense":
        return {
          borderLeft: "border-l-4 border-l-red-500",
          borderOther: "border-t border-r border-b border-gray-200",
          background: "bg-red-50",
          textColor: "text-red-700",
          iconBg: "bg-red-100",
        };
      case "savings":
        return {
          borderLeft: "border-l-4 border-l-blue-500",
          borderOther: "border-t border-r border-b border-gray-200",
          background: "bg-blue-50",
          textColor: "text-blue-700",
          iconBg: "bg-blue-100",
        };
      case "balance":
        return {
          borderLeft:
            amount >= 0
              ? "border-l-4 border-l-purple-500"
              : "border-l-4 border-l-red-500",
          borderOther: "border-t border-r border-b border-gray-200",
          background: amount >= 0 ? "bg-purple-50" : "bg-red-50",
          textColor: amount >= 0 ? "text-purple-700" : "text-red-700",
          iconBg: amount >= 0 ? "bg-purple-100" : "bg-red-100",
        };
      default:
        return {
          borderLeft: "border-l-4 border-l-gray-500",
          borderOther: "border-t border-r border-b border-gray-200",
          background: "bg-gray-50",
          textColor: "text-gray-700",
          iconBg: "bg-gray-100",
        };
    }
  };

  const cardStyles = getCardStyles();

  return (
    <div
      className={`rounded-lg shadow-md p-6 ${cardStyles.borderLeft} ${cardStyles.borderOther} ${cardStyles.background} hover:shadow-lg transition-all duration-200`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${cardStyles.textColor}`}>
            {formatCurrency(amount)}
          </p>
        </div>
        <div className={`text-3xl p-3 rounded-full ${cardStyles.iconBg}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
