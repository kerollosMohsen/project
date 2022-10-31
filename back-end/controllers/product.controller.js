const { resBuilder } = require("../helper/helper")
const Products=require("../models/product.model")
const jwt=require("jsonwebtoken")
const cartModel=require("../models/cart.model")
const User = require("../models/user.model")
class Product {
    static create =async(req,res)=>{
        const newProduct =new Products(req.body)

        try{
            const savedProduct=await newProduct.save()
            console.log("here")
            
        resBuilder(res,true,savedProduct,"product added")

        }
        catch(e){
            resBuilder(res,false,e,e.message)
        }
    } 
    static edit=async(req,res)=>{
        try{
         
          const updateProduct= await Products.findByIdAndUpdate(req.params.id,{
              $set:req.body
          },{new:true})
          resBuilder(res,true,updateProduct,"product Updeated")
        }
        catch(e){
          resBuilder(res,false, e, e.message)
          
        }
      }
      static showUser=async(req,res)=>{
        try{
          const product=  await Products.findById(req.params.id)
            resBuilder(res,true, {product},"product found")
        }
        catch(e){
        resBuilder(res,false, e, e.message)

        }

    }
    static addImg = async(req,res)=>{
        try{
           
           req.user.profileImage = req.file.path.replace("static\\", "")
           await req.user.save()
           resBuilder(res, true, req.user, "done")
        }
        catch(e){
           resBuilder(res, false, e, e.message)
        }
       }
    static ShowAll=async(req,res)=>{
        const newP =req.query.new
        const catigory=req.query.category
        try{
            let products  
            if(newP){
                products =await Products.find().sort({createdat:-1}).limit(5)
            }else if (catigory){
                console.log(  await Products.find({categories:{
                    $in:{catigory}
                }}))
                products= await Products.find({categories:{
                    $in:[catigory]
                }})
            }else{
                products =await Products.find()
                const x=products
            }
              resBuilder(res,true, {products},"products found")
          }
          catch(e){
          resBuilder(res,false, e, e.message)
  
          }
    }

    static search=async(req,res)=>{
       const search =req.params.search
       try{const product=await Products.find()
        
        const found=    product.filter(produ=>produ.title.toLowerCase().includes(search.toLowerCase()))
        console.log( product.filter(produ=>produ.title.toLowerCase().includes(search.toLowerCase())))

        //   console.log(Products)
        //   res.send(found)
          resBuilder(res,true,{found},"found")
       }
       catch(e){}
    }
    static del=async(req,res)=>{
        try{
          const product=  await Products.findByIdAndDelete(req.params.id)
            resBuilder(res,true, {product},"product deleted")
        }
        catch(e){
        resBuilder(res,false, e, e.message)

        }
    }
}

module.exports=Product