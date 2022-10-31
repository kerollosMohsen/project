const mongoose=require("mongoose")
const productModel = require("./product.model")


const orderSchema= new mongoose.Schema({
    items:[],
    userName:{
        type:String
    },
    totalPrice:{type:Number,required:true},
    quantity:{
        type:Number,
        default:1  },
    status:{type:String,default:"pending"}
  
},{timestamps:true})
module.exports=mongoose.model("order",orderSchema)