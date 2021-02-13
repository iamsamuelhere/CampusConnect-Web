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

router.get("/ranks",(req,res)=>{
  connection.query('select student.name,ranks.usn,student.branch,student.semester,ranks.cgpa from student inner join ranks on student.usn=ranks.usn order by ranks.cgpa desc;',function(error,results,fields){
    if(error) throw error
    res.render("ranks",{results:results})
  })

})
router.post("/ranks-data",(req,res)=>{
  console.log(req.body);
  cgpa=Number(req.body.cgpa)
//check exists or not
connection.query('select * from ranks where usn=? ',[req.body.usn],function(error,results,fields){
if(results.length==0){
  connection.query('insert into ranks SET ?',{usn:req.body.usn,cgpa:cgpa},function(error,results,fields){
    if(error) throw error;
  })
res.redirect("/ranks")
}
else{
res.redirect("/ranks")
}


})

})

router.get("/table",(req,res)=>{
  res.render("ranktable")
})


router.get("/requestProduct",(req,res)=>{
  res.render("sendRequest")
})

router.post("/requestProduct",(req,res)=>{
  console.log(req.body)
  var data = {
    from: 'tradex.supplychain@gmail.com',
    to: req.body.email,
    subject: req.body.pname,
    text: '<body><h1>Name:${req.body.name} is requesting ${req.body.pname} for Price ${req.body.price}Phone no:${req.body.ph no}</h1></body>'
  };
  mailgun.messages().send(data, function (error, body) {
    if (error)
    console.log(error);
    console.log(body+" sent");
  });
  res.redirect("/requestProduct")
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

// router.get("/:pid",(req,res)=>{
//   console.log(req.params.pid)
// connection.query('select * from product where pid=? ',[req.params.pid],function(error,results,fields){
//   if(error )throw error;
//   console.log("----------");
//   console.log(results);
//   res.render("Eachproduct",{results:results})
// })

// })







module.exports=router;