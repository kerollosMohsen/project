const { resBuilder } = require("../helper/helper")
const Order=require("../models/order.model")


class orders {
    static create =async(req,res)=>{
        const newOrder =new Order(req.body)
        console.log(newOrder)
        try{
            const savedOrder=await newOrder.save()
        resBuilder(res,true,savedOrder,"Order Created")

        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
    } 
    static edit=async(req,res)=>{
        try{
         
          const updateOrder= await Order.findByIdAndUpdate(req.params.id,{
              $set:req.body
          },{new:true})
          resBuilder(res,true,updateOrder,"Order Updeated")
        }
        catch(e){
          resBuilder(res,false, e, e.message)
          
        }
      }
      static showOrder=async(req,res)=>{
        try{
          const orders=  await Order.find({userId:req.params.userId})
            resBuilder(res,true, {orders},"orders found")
        }
        catch(e){
        resBuilder(res,false, e, e.message)

        }
    }
    static ShowAll=async(req,res)=>{
        try{
            const orders=await Order.find()
            resBuilder(res,true, {orders},"carts found")

        }
        catch(e){
        resBuilder(res,false, e, e.message)
        }
    }
    static del=async(req,res)=>{
        try{
          const order=  await Order.findByIdAndDelete(req.params.id)
            resBuilder(res,true, {order},"product deleted")
        }
        catch(e){
        resBuilder(res,false, e, e.message)

        }
    }
}

module.exports=orders