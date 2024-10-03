const express=require("express")
const app=express()
app.use("/hellow",(req,res)=>{
    res.send("hellow from the  ")
})
app.listen(5050,()=>{
    console.log("server is created on port 5050....")
})
