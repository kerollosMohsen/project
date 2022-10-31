const { resBuilder } = require("../helper/helper")
const Cart=require("../models/cart.model")
const jwt=require("jsonwebtoken")
const userModel=require("../models/user.model")


class Carts {
    static create =async(req,res)=>{
        const newCurt =new Cart(req.body)
        const userId=req.body.userId

        try{
          const savedCurt=await newCurt.save()
          const user =await userModel.findByIdAndUpdate(userId,{cart:savedCurt})

            
            
        resBuilder(res,true,savedCurt,"Curt Created")

        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
    } 
    static edit=async(req,res)=>{
        try{
         
          const updateCart= await Cart.findByIdAndUpdate(req.params.id,{
              $set:req.body
          },{new:true})
          resBuilder(res,true,updateCart,"Cart Updeated")
        }
        catch(e){
          resBuilder(res,false, e, e.message)
          
        }
      }
      static showCart=async(req,res)=>{
        try{
          const cart=  await Cart.findOne({userId:req.params.userId})
            resBuilder(res,true, {cart},"cart found")
        }
        catch(e){
        resBuilder(res,false, e, e.message)

        }
    }
    static ShowAll=async(req,res)=>{
        try{
            const carts=await Cart.find()
            resBuilder(res,true, {carts},"carts found")

        }
        catch(e){
        resBuilder(res,false, e, e.message)
        }
    }
    static del=async(req,res)=>{
        try{
          const cart=  await Cart.findByIdAndDelete(req.params.id)
            resBuilder(res,true, {cart},"product deleted")
        }
        catch(e){
        resBuilder(res,false, e, e.message)

        }
    }
}

module.exports=Carts