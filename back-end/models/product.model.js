const mongoose=require("mongoose")

const productSchema= new mongoose.Schema({
    title:{type:String,required:true,unique:true,},
    des:{type:String,required:true,},
    img:{type:String,required:true,},
    categories:{type:Array,},
    stars:{type:Number,default:0},
    favorite:{type:Boolean, default:false,required:true},
    price:{type:Number,required:true,required:true},
},{timestamps:true})
module.exports=mongoose.model("product",productSchema)