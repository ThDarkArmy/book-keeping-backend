import User from '../model/User'


export const getLoggedInUser = (req, res, next) => {
    try{

    }catch(err){
        next(err)
    }
}



export const register = (req, res, next) => {
    try{
        const { name, email, password } = req.body;

    }catch(err){
        next(err)
    }
}


export const verifyAccount = (req, res, next) => {
    try{

    }catch(err){
        next(err)
    }
}


export const login = (req, res, next) => {
    try{

    }catch(err){
        next(err)
    }
}


export const updateAccount = (req, res, next) => {
    try{

    }catch(err){
        next(err)
    }
}


export const deleteAccount = (req, res, next) => {
    try{

    }catch(err){
        next(err)
    }
}