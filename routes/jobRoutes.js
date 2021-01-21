const router=require('express').Router();

var multer  = require('multer')
const path = require('path')

//mysql
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







router.get("/job",(req,res)=>{
    res.render("job")
})


    router.get("/all",(req,res)=>{
        connection.query('select Student.name,Student.email,Student.branch,Student.semester,job.phno,job.job_description,job.res,job.posted_on from Student,job where Student.usn=job.usn;',function(error,results,fields){
          if (error) throw error;
          console.log("--------------------");
          console.log(results);
        res.render("alljobs",{results:results})
 
        
      
        })
        
      })
    


var storage=multer.diskStorage({
    destination:"./public/resume",
    filename:function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname) )
    }
})
var upload=multer({storage:storage,  
}).single('res')


router.post("/job-form",(req,res)=>{
    upload(req, res, function (err) {
        if (err) {
         console.log(err);
        } else  {

        resume='resume/'+req.file.filename;
        console.log(req.body)
        connection.query('INSERT INTO job SET ?', {
        usn:req.body.usn,
        phno:req.body.phno,
        job_description:req.body.desc,
        res:resume
        }, function (error, results, fields) {
          if (error) throw error;
          console.log("inserted");
          res.redirect("/home")
        });           
        }
      })
})

module.exports=router;