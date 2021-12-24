import Transaction from "../model/Transaction";
import DebitCreditHolder from "../model/DebitCreditHolder";
import createError from "http-errors";


// create transaction
export const createTransaction = async (req, res, next)=> {
    try{
        const { id, amount, type} = req.body
        let debitCreditHolder = await DebitCreditHolder.findById(id)
        if(!debitCreditHolder) throw createError.NotFound("Debit Credit holder not found")
        let transaction = new Transaction({
            amount: amount,
            type: type,
            debitCreditHolder: id,
            user: req.user.id
        })

        await transaction.save()
        let transactionData = debitCreditHolder.transactions
        transactionData.push(transaction)

        debitCreditHolder.transactions = transactionData
        await debitCreditHolder.save()

        
        res.status(201).json({
            success: true,
            message: "Transaction created",
            body: transaction
        })

    }catch(err){
        next(err)
    }
}


// get transaction
export const getAllTransactionsByUser = async (req, res)=> {
    try{
        const transactions = await Transaction.find({debitCreditHolder: req.params.id})
        res.status(201).json({
            success: true,
            message: "All transactions",
            body: transactions
        })
    }catch(err){
        next(err)
    }
}

// delete transaction
export const deleteTransaction = async (req, res)=> {
    try{
        await Transaction.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success: true,
            message: "Transaction deleted successfully"
        })
    }catch(err){
        next(err)
    }
}