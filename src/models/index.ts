// File ini sudah tidak digunakan, semua model sudah dipindah ke file terpisah
// Silakan gunakan import langsung: import Transaction from '@/models/Transaction'
export {};
  createdAt: Date
  updatedAt: Date
}

// Transaction Schema
const TransactionSchema = new Schema<ITransaction>({
  userId: {
    type: String,
    required: true,
    index: true
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense']
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
})

// Budget Schema
export interface IBudget extends Document {
  userId: string
  category: string
  amount: number
  spent: number
  month: number
  year: number
  createdAt: Date
  updatedAt: Date
}

const BudgetSchema = new Schema<IBudget>({
  userId: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  spent: {
    type: Number,
    default: 0,
    min: 0
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  year: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

// Create unique index for user + category + month + year
BudgetSchema.index({ userId: 1, category: 1, month: 1, year: 1 }, { unique: true })

// User Schema (simplified for this example)
export interface IUser extends Document {
  email: string
  name: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// Export models
export const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema)
export const Budget = mongoose.models.Budget || mongoose.model<IBudget>('Budget', BudgetSchema)
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
