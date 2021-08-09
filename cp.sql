create database campus;
use campus;
-- Students table
create table Student
(
 usn varchar(15) primary key,
 name varchar(100),
 email varchar(100),
 password varchar(200),
 branch varchar(3),
 semester int,
 created_on datetime default now()
);
select * from Student;
delete from Student;
delete from Product;
select * from Product;
delete from Ranks;

create table Product 
( pid int primary key auto_increment,
 usn varchar(15),
  prod_name varchar(100),
  prod_desc varchar(200),
  phno bigint,
  price smallint,
  posted_on datetime default now(),
  img varchar(200),
  foreign key(usn) references Student(usn)
  );
  create table ranks
  ( 
  rid int primary key auto_increment,
  usn varchar(15),
  cgpa decimal(2,1)
  );
  select * from ranks;
  
  
  
  
  
  select * from product;
  select * from student;
  drop table product;
  
  select student.name, product.usn from student inner join product on product.usn=student.usn;
  
  select student.name,student.email,product.img,product.prod_name,product.prod_desc,product.posted_on,product.phno,product.price
  from student inner join product on student.usn=product.usn;

select student.name,ranks.usn,student.branch,student.semester,ranks.cgpa from student
inner join ranks on student.usn=ranks.usn
order by ranks.cgpa ;

select * from ranks;

insert into ranks(usn,cgpa)
values("1ep");
