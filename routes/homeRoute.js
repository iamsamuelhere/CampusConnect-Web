const router=require('express').Router();

var multer  = require('multer')
const path = require('path')

var storage=multer.diskStorage({
    destination:"./public/upload",
    filename:function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname) )
    }
})
var upload=multer({storage:storage,  
}).single('img')

//my sql
var mysql      = require('mysql');
const { route } = require('./authRoutes');
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

router.get("/createProduct",(req,res)=>{
    res.render("product")
})

router.post("/product-form",(req,res)=>{
    upload(req, res, function (err) {
        if (err) {
         console.log(err);
        } else  {

        img='upload/'+req.file.filename;
        console.log(req.body)
        connection.query('INSERT INTO product SET ?', {
        usn:req.body.usn,
        prod_name:req.body.productname,
        prod_desc:req.body.description,
        phno:req.body.phno,
        img:img,
        price:req.body.price
        }, function (error, results, fields) {
          if (error) throw error;
          console.log("inserted");
          res.redirect("/home")
        });           
        }
      })
})

router.get("/:pid",(req,res)=>{
connection.query('select * from product where pid=? ',[req.params.pid],function(error,results,fields){
  if(error )throw error;
  console.log("----------");
  console.log(results);
  res.render("Eachproduct",{results:results})
})

})


module.exports=router;