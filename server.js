 const express=require('express')
 const app=express();
 require('dotenv').config();
  const db= require('./db');
 const bodyparser= require('body-parser');
 app.use(bodyparser.json());// req .body 
 const PORT=process.env.PORT || 3000;
 const userroutes= require('./userroutes');
  const candidateroutes=require('./candidateroutes');

 app.use('/user',userroutes);
 app.use('/candidate', candidateroutes);
 app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  })