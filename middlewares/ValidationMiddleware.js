import { validationResult } from "express-validator";


const validationMiddleware = async (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(500).json({
            success: false,
            message: "Validation Error",
            errors: errors.array()
        })
    }

    next()
}


export default validationMiddleware;