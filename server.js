const express=require("express");
const ejs=require("ejs");
const bodyParser = require("body-parser");
const app=express();

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

//routes
const authRoutes=require("./routes/authRoutes");
app.use(authRoutes);

const homeRoutes=require("./routes/homeRoute");
app.use(homeRoutes);





app.listen(3000,()=>{
    console.log("Server Started.")
})