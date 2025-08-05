import mongoose, { Document, Schema } from 'mongoose'

export interface ITransaction extends Document {
  type: 'income' | 'expense' | 'savings' // Tambahkan 'savings'
  amount: number
  description: string
  category: string
  date: Date
  userId: string
  createdAt: Date
  updatedAt: Date
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: String,
      required: true,
      default: 'demo-user'
    },
    type: {
      type: String,
      required: true,
      enum: ['income', 'expense', 'savings'],  // PASTIKAN 'savings' ADA DI SINI
      validate: {
        validator: function(value: string) {
          return ['income', 'expense', 'savings'].includes(value)
        },
        message: 'Type must be income, expense, or savings'  // UPDATE PESAN ERROR
      }
    },
    amount: {
      type: Number,
      required: true,
      min: [0, 'Amount must be greater than 0']
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: [200, 'Description cannot exceed 200 characters']
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxLength: [50, 'Category cannot exceed 50 characters']
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: 'transactions'
  }
)

// Index untuk performance
TransactionSchema.index({ userId: 1, date: -1 })
TransactionSchema.index({ type: 1 })

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema)
