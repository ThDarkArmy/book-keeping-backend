import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import dotenv from 'dotenv'
import { PORT } from './constants/constants'

dotenv.config({ silent: process.env.NODE_ENV === 'production' });
import './config/database'


const app = express()

const port = 5000 | PORT

// middleware
app.use(express.static(__dirname))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use(morgan('dev'))


app.get('/', (req, res, next)=>{
    try{
        res.status(200).json("Home")
    }catch(error){
        next(error)
    }
})


// routes
import users from './routes/users'


app.use('/api/v1/users', users)


app.use(async(req, res, next)=>{
    next(createError.NotFound())
})

app.use((err, req, res, next)=>{
    res.status(err.status|| 500).json({
            success: false,
            message: err.message,
            error: err
    })
})



app.listen(PORT, ()=>console.log("Server is listening on port: ", port))