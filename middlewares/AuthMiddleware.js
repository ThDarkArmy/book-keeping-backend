import JWT from 'jsonwebtoken';
import createError from 'http-errors';
import { PUBLIC_KEY_PATH } from '../constants/constants';
import fs from 'fs'

const PUBLIC_KEY=fs.readFileSync(PUBLIC_KEY_PATH, 'utf8')

const authenticateUser = async (req, res, next) => {
    const authToken = await req.headers['authorization']
    if(!authToken) return createError.Unauthorized("Please login!")
    var token = authToken.split(" ")[1]
    JWT.verify(token,PUBLIC_KEY, {algorithms: ['RS256']}, (err, payload)=> {
        if(err){
            if(err.name === "jsonWebTokenError"){
                return next(createError.Unauthorized())
            }else{
                return next(createError.Unauthorized(err.message))
            }
        }

        req.user=payload
        next()

    } )


}


export default authenticateUser;