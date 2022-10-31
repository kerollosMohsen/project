const { resBuilder } = require("../helper/helper")
const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")
// const User = require("../models/user.model")
const Cart=require("../models/cart.model")

class user{
    static register =async(req,res)=>{
        try{
            const userData =new userModel(req.body)
const userCart= new Cart(req.body)

userData.cart.push(userCart)
        userData.isAdmin=false
        await userData.save()
        resBuilder(res,true,userData,"added")
        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
    }
    static login = async(req,res)=>{
        try{
            const userData = await userModel.login(req.body.userName, req.body.password)
            // console.log(userData)
            const token = await userData.token()
            resBuilder(res,true, {userData,token}, "logged in")
        }
        catch(e){
            resBuilder(res,false, e, e.message)
        }
    }
    
    static edit=async(req,res)=>{
      try{
        if(req.body.password){
            req.body.password=password=await bcrypt.hash(this.password, 12)
        }
        const updateUser= await userModel.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        resBuilder(res,true,updateUser,"userUpdeated")
      }
      catch(e){
        resBuilder(res,false, e, e.message)
        
      }
    }
    static showUser=async(req,res)=>{
        try{
          const user=  await userModel.findById(req.params.id)
            resBuilder(res,true, {user},"user found")
        }
        catch(e){
        resBuilder(res,false, e, e.message)

        }
    }
    static ShowAll=async(req,res)=>{
        try{
            const user=  await userModel.find()
              resBuilder(res,true, {user},"users found")
          }
          catch(e){
          resBuilder(res,false, e, e.message)
  
          }
    }
    static del=async(req,res)=>{
        try{
          const user=  await userModel.findByIdAndDelete(req.params.id)
            resBuilder(res,true, {user},"user deleted")
        }
        catch(e){
        resBuilder(res,false, e, e.message)

        }
    }
}
module.exports=user