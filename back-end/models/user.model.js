const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const validator=require("validator")
const jwt = require("jsonwebtoken")
const user = require("../controllers/user.controller")
const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate:function(value){
            if(!validator.isEmail(value)) throw new Error("invalid email")
        }
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    tokens:[{
        token:{type:String, required:true}
    }],
    cart:[],


},{timestamps:true})
userSchema.methods.toJSON = function(){
    const userData = this.toObject()
    delete userData.__v
    delete userData.password
    delete userData.tokens
    return userData
}
userSchema.pre("save",async function(next){
    try{
        if(this.isModified("password")) this.password=await bcrypt.hash(this.password, 12)    }
    catch(err){
        next(err)
    }
})
userSchema.statics.login=async(userName,password)=>{
const userData=await User.findOne({userName})
if(!userData) throw new Error("username is not found")
const isValid=await bcrypt.compare(password,userData.password)
if(!isValid) throw new Error("password is not correct")
return userData

}
userSchema.methods.token=async function(){
    const user = this
    const token = jwt.sign({_id:user._id}, process.env.Key)
    user.tokens.push({token})
    await user.save()
    return token
}
const User=mongoose.model("user",userSchema)
module.exports=User