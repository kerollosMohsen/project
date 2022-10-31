const router =require("express").Router()
const Curt=require("../controllers/cart.controller")
const Auth = require("../middelware/auth")


router.post("/creat",Auth.auth,Curt.create)
router.put("/editCart/:userId",Auth.auth,Curt.edit)
router.delete("/deletecart/:userId",Auth.auth,Auth.authAdmin,Curt.del)
router.get("/cart/:userId",Auth.auth,Curt.showCart)
router.get("/showAllCarts",Auth.auth,Auth.authAdmin,Curt.ShowAll)

module.exports=router