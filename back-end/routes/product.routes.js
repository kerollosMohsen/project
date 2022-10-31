const router =require("express").Router()
const product=require("../controllers/product.controller")
const Auth = require("../middelware/auth")


router.post("/add",product.create)
router.put("/editProducts/:id",Auth.auth,Auth.authAdmin,product.edit)
router.delete("/deleteproduct/:id",Auth.auth,Auth.authAdmin,product.del)
router.get("/findproduct/:id",product.showUser)
router.get("/showAllProducts",product.ShowAll)
router.get("/search/:search",product.search)


const upload=require("../middelware/fileUpload.middleware")
router.post("/imgUpload",upload.single("img"), product.addImg)
module.exports=router