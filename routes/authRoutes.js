const router=require("express").Router()

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
    res.render("login")
})

router.get("/reg-form",(req,res)=>{
    res.render("register")
})

router.get("/db",(req,res)=>{
    connection.query('insert into checks(name) value("pinku")', function (error, results, fields) {
        if (error) throw error;
        // connected!
        console.log(results);
      });
})
router.post("/post/reg",(req,res)=>{
    console.log(req.body);
    //insert into db
    connection.query('insert into student SET ?',
    {usn:req.body.usn,
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
      branch:req.body.branch,
      semester:req.body.semester
    },function(error,results,fields){
      if(error) throw error;
      //
      console.log("inserted");
    })

    res.redirect("/");
})


module.exports=router;