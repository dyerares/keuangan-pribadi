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
      required: [true, 'User ID is required'],
      default: 'demo-user'
    },
    type: {
      type: String,
      enum: ['income', 'expense', 'savings'], // Tambahkan 'savings'
      required: [true, 'Type is required'],
      validate: {
        validator: function(value: string) {
          return ['income', 'expense', 'savings'].includes(value)
        },
        message: 'Type must be income, expense, or savings'
      }
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount must be positive']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [100, 'Description cannot exceed 100 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: 'transactions'
  }
)

// Index untuk performa query
TransactionSchema.index({ userId: 1, date: -1 })
TransactionSchema.index({ userId: 1, type: 1 })

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema)
