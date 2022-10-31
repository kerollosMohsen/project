const router =require("express").Router()
const User=require("../controllers/user.controller")
const Auth = require("../middelware/auth")

router.post("/register",User.register)
router.post("/login",User.login)
router.put("/:id",Auth.auth,Auth.authUser,User.edit)
router.delete("/delete/:id",Auth.auth,Auth.authUser,User.del)
router.delete("/Admindelete/:id",Auth.auth,Auth.authAdmin,User.del)
router.get("/find/:id",Auth.auth,Auth.authAdmin,User.showUser)
router.get("/showAll",Auth.auth,Auth.authAdmin,User.ShowAll)

module.exports=router