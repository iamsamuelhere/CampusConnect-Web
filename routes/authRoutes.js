const router=require("express").Router()
const bcrypt = require('bcrypt');

//my sql
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'samuel9742828481.',
    database : 'Campus',
    multipleStatements:true
  });
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });

//routes
router.get("/",(req,res)=>{
    res.render("login",{error:0,msg:"",color:""})
})

router.post("/post-login",(req,res)=>{
   console.log(req.body)
  
  connection.query('SELECT password from student where email=?',[req.body.email], function (error, results, fields) {
    if (error) throw error;

    if(results.length==0)
    //user not registered
    res.render("login",{error:1,msg:"User not Registered. Kindly register!",color:"danger"})
    else{
      HashPassDb=results[0].password
      req.body.password;
      bcrypt.compare(req.body.password,HashPassDb).then(function(result) {
        if(result==true)
        res.redirect("/home")
        else{
          res.render("login",{error:1,msg:"Wrong password.Login with correct credentials",color:"danger"})
        }
    });
    }
  });
 
})

//home
router.get("/home",(req,res)=>{
  res.render("home")
})

//regester routes
router.get("/reg-form",(req,res)=>{
  res.render("register")
})
//regester data 
router.post("/post-reg",(req,res)=>{
    console.log(req.body);
    let password=req.body.password;
    const saltRounds = 10;
    
    bcrypt.hash(password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      if(err) throw err;
      
      hashed_password=hash;
  //insert into db

    connection.query('insert into student SET ?',
    {usn:req.body.usn,
      name:req.body.name,
      email:req.body.email,
      password:hashed_password,
      branch:req.body.branch,
      semester:req.body.semester
    },function(error,results,fields){
      if(error) throw error;
      //status
      console.log("inserted");
    })

  });

//on success 
    res.render("login",{error:1,msg:"Successfully registered!. Kindly login with the same credentials",color:"success"})
})


module.exports=router;