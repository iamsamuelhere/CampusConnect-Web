const router=require('express').Router();

var multer  = require('multer')
const path = require('path')

var storage=multer.diskStorage({
    destination:"./public/upload",
    filename:function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname) )
    }
})
var upload=multer({storage:storage,limits: { fileSize: 1000000 },  
}).single('img')

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

router.get("/createProduct",(req,res)=>{
    res.render("product")
})

router.post("/product-form",(req,res)=>{
    console.log(req.body);
    // upload(req, res, function (err) {
    //     if (err) {
    //      console.log(err);
    //     } else  {
    //         console.log(req.file)
    //         img='/upload/'+req.file.filename;
            
    //         connection.query('insert into Product SET ?',{
    //             usn:req.body.
    //         })


    //         res.render("img",{img:img})
            
    //     }
    
      
    //   })
   
})







module.exports=router;