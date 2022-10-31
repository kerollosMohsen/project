const mongoose=require("mongoose")
const connect=async()=>{
    try {await mongoose.connect(process.env.DBURl)
    console.log("connected") 
    }
    catch(e){
    console.log(e.message)
    }
    }
    connect()