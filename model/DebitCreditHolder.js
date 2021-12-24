import { Schema, model } from "mongoose";

const debitCreditHolderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  { timestamps: true }
);

const DebitCreditHolder = model("DebitCreditHolder", debitCreditHolderSchema);

export default DebitCreditHolder;
