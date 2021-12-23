import mongoose from "mongoose";
import {MONGO_URI } from '../constants/constants'


mongoose.connect(MONGO_URI, {
}).then(()=> console.log("Connectedv to the database"))
.catch((err)=> console.log("Could not connect to the database", err))



mongoose.connection.on('connected', ()=>{
    console.log('Mongoose connected to db.')
})

mongoose.connection.on('error', (err)=>{
    console.log(err.message)
})

mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose connection is disconnected.')
})

process.on('SIGINT', async ()=>{
    await mongoose.connection.close()
    process.exit(0)
})
