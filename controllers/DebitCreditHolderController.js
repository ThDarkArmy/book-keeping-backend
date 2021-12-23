import DebitCreditHolder from "../model/DebitCreditHolder";
import createError from "http-errors";


// get all debitCreditHolder
export const getAllDebitCreditHolder = async (req, res, next)=> {
    try{
        const debitCreditHolders = await DebitCreditHolder({user: req.user._id}).populate("transactions", "-__v")
        res.status(200).json({
            success: true,
            message: "All transactions",
            body: debitCreditHolders
        })
    }catch(err){
        next(err)
    }
}

// create a debitCreditHolder
export const createDebitCreditHolder = async (req, res, next)=> {
    try{
        const { name, mobile} = req.body
        let debitCreditHolder = await DebitCreditHolder.findOne({mobile: mobile, user: req.user._id})
        if(debitCreditHolder) throw createError.BadRequest("Debit or Credit holder already exists")

        debitCreditHolder = await new DebitCreditHolder({
            name, 
            mobile,
            user: req.user._id
        })

        await debitCreditHolder.save()

        res.status(201).json({
            success: true,
            message: "DebitCredtHolder created successfully",
            body: debitCreditHolder
        })

    }catch(err){
        next(err)
    }
}

// update a debitCreditHolder
export const updateDebitCreditHolder = (req, res, next)=> {
    try{
        let debitCreditHolder = await DebitCreditHolder.findById(req.params.id)
        if(!debitCreditHolder) throw createError.BadRequest("Debit or Credit holder does not exists")
        
        const { name, mobile} = req.body

        debitCreditHolder.name = name
        debitCreditHolder.mobile = mobile

        await debitCreditHolder.save()

        res.status(201).json({
            success: true,
            message: "DebitCredtHolder updated successfully",
            body: debitCreditHolder
        })

    }catch(err){
        next(err)
    }
}


// delete a debitCreditHolder
export const deleteDebitCreditHolder = (req, res, next)=> {
    try{
        await DebitCreditHolder.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success: true,
            message: "DebitCredtHolder deleted successfully",
        })

    }catch(err){
        next(err)
    }
}