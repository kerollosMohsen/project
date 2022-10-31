const router =require("express").Router()
const Order=require("../controllers/order.controller")
const Auth = require("../middelware/auth")


router.post("/creat",Order.create)
router.put("/editorder/:userId",Auth.auth,Order.edit)
router.delete("/deleteorder/:userId",Auth.auth,Auth.authAdmin,Order.del)
router.get("/order/:userId",Auth.auth,Order.showOrder)
router.get("/showAllorders",Auth.auth,Auth.authAdmin,Order.ShowAll)

module.exports=router