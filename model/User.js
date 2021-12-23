import { Schema, model } from "mongoose"
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { randomBytes } from 'crypto'
import { pick } from 'lodash'
import fs from 'fs'


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   
    verified:{
        type: Boolean,
        default: false
    },
    verificationCode:{
        type: String,
        required: false,
        default: undefined
    },
    resetPassword: {
        type: String,
        required: false,
        default: undefined
    },
    resetPasswordToken:{
        type: String,
        required: false
    },
}, { timestamps: true})


UserSchema.pre('save', async function(next){
    let user = this
    if(!user.isModified('password')) return next()
    user.password = await hash(user.password, 10)
    next()
})

UserSchema.methods.comparePassword = async function(password){
    return await compare(password, this.password)
}

UserSchema.methods.generateJwt = async function(){
    const PRIV_KEY = fs.readFileSync("\D:\\Node Js\\VideoStreamingServer\\crypto\\id_rsa_priv.pem", 'utf8')

    let payload = {
        id: this._id,
        name: this.name,
        email: this.email,
    }
    const options = {
        expiresIn: '200h',
        issuer: this.name,
        audience: this._id.toString(),
        algorithm: 'RS256'
    }


    return sign(payload, PRIV_KEY, options)
}

UserSchema.methods.generatePasswordResetToken = function(){
    this.resetPasswordTokenExpiresIn = Date.now() + 36000000
    this.resetPasswordToken = randomBytes(20).toString('hex')
}

UserSchema.methods.getUserInfo = function(){
    return pick(this, ["_id", "name", "email"])
}


export default model("User", UserSchema)


