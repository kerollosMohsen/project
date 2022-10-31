const express=require("express")
const path=require("path")
const app=express()
const cors = require("cors")

const bodyParser = require('body-parser')



require("dotenv").config()
require("./db/connect")



const Port=process.env.Port ||3000
app.use(cors())

const userRouter=require("./routes/user.routes")
const cartRouter=require("./routes/cart.routes")
const productRouter=require("./routes/product.routes")
const orderRouter=require("./routes/order.routes.js")
app.use(express.static(path.join(__dirname, "./")))


app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))
app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/product",productRouter)
app.use("/api/order",orderRouter)

app.listen(Port,()=>{console.log(`localhost:${Port}`)})