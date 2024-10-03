const express=require("express")
const app=express()
app.get("/hello",(req,res)=>{
    res.send("hellow from the hello  ")
})
app.post("/",(req,res)=>{
    res.send({firstName:"Anit Maurya",age:"22"})
})

app.use("/namste",(req,res)=>{
    res.send("hellow from the namste  ")
})
app.listen(5050,()=>{ 
    console.log("server is created on port 5050....")
})
