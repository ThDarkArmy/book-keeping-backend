import { Schema, SchemaTypes, model } from "mongoose";

const debitCreditHolderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },

    user: {
        type: SchemaTypes.ObjectId,
        ref: "User"
    },
    transactions: [{
        type: SchemaTypes.ObjectId,
        ref: "Transactions"
    }]

}, {timestamps: true})


const DebitCreditHolder = model("DebitCreditHolder", debitCreditHolderSchema)


export default DebitCreditHolder