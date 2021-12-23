import { model, Schema, SchemaTypes } from "mongoose";

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
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    debitCreditHolder: {
      type: SchemaTypes.ObjectId,
      ref: "DebitCreditHolder",
    },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
