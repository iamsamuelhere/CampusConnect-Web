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
  connection.query('select count(*)as users from student;select count(*)as products from product',function(err,results,fields){
    if(err)console.log(err);
    console.log(results)
    res.render("login",{error:0,msg:"",color:"",count:results})
  })
    
})

router.post("/post-login",(req,res)=>{
   console.log(req.body)
  
  connection.query('SELECT password from student where email=?',[req.body.email], function (error, results, fields) {
    if (error) throw error;

    if(results.length==0)
    //user not registered
    res.render("login",{error:1,msg:"User not Registered. Kindly register!",color:"danger",count:[[{users:""}],[{products:""}]]})
    else{
      HashPassDb=results[0].password
      req.body.password;
      bcrypt.compare(req.body.password,HashPassDb).then(function(result) {
        if(result==true)
        res.redirect("/home")
        else{
          res.render("login",{error:1,msg:"Wrong password.Login with correct credentials",color:"danger",count:""})
        }
    });
    }
  });
 
})

//home
router.get("/home",(req,res)=>{
  connection.query('select product.pid,student.name,student.email,product.img,product.prod_name,product.prod_desc,product.posted_on,product.phno,product.price from student inner join product on student.usn=product.usn;',function(error,results,fields){
    if (error) throw error;
    console.log(results);
  res.render("home",{results:results})


  })
  
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

router.get("/ji",(req,res)=>{
  res.render("test")
})
router.post("/ji",(req,res)=>{
   name=req.body.name;
})
router.get("/content",(req,res)=>{
  console.log(req.query);
  res.redirect("/ji");
})
module.exports=router;