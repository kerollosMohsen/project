const userModel =require("../models/user.model")
const jwt= require("jsonwebtoken")
const { resBuilder } = require("../helper/helper")
class Auth{
    static auth= async(req,res,next)=>{
        try{
            const token =req.header("Authorization").replace("Bearer ","")
            const decoded=jwt.verify(token,process.env.Key)
            const userData= await userModel.findOne({
                _id:decoded._id,
                "tokens.token":token
            })
            if(!userData) throw new Error("unathorezed")
            req.token=token
            req.user=userData
            next()
        }
        catch(e){
            resBuilder(res,false,e,e.message)            
        }
    }   
    static authAdmin = async(req,res, next)=>{
        try{
            if(!req.user.isAdmin) throw new Error("not an admin")
            next()
         }
         catch(e){
            resBuilder(res,false, e, e.message)
         }
        
    }
    static authUser = async(req,res, next)=>{
        try{
            console.log(req.user._id)
            if(req.user._id.toHexString()!==req.params.id) throw new Error("Can't procces request")
            if(req.user.isAdmin) throw new Error("not a user")
            // console.log(!req.user.isAdmin)
            next()
         }
         catch(e){
            resBuilder(res,false, e, e.message)
         }
        
    
    }   
}

module.exports=Auth