import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema(
  {
    stockName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    stockSymbol: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
      maxlength: 20,
    },
    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    market: {
      type: String,
      trim: true,
      default: '',
    },
    sector: {
      type: String,
      trim: true,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

stockSchema.index({ stockName: 'text', stockSymbol: 'text' });

export default mongoose.models.Stock || mongoose.model('Stock', stockSchema);
