import { model, Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      // DEBIT OR CREDIT
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    debitCreditHolder: {
      type: Schema.Types.ObjectId,
      ref: "DebitCreditHolder",
    },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
