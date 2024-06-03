const express= require('express')
const router= express.Router();
//  const Person = require('./../models/person');
 const user= require('./user');
 const {jwtauthmiddleware,generatetoken}= require('./jwt');
router.post('/signup', async (req,res)=>{
   try{
    const  data= req.body //assuming  the request body contains the person data
    // create a new person document using the mongoose model
     const newuser= new user(data);
     //  save the person  to the database 
      const response= await newuser.save();
      console.log('data saved');
       const payload={
        id:response.id
       }
       console.log(JSON.stringify(payload));
       const token= generatetoken(payload);
       console.log("token is :",token);
      res.status(200).json({response:response,token:token});
   }
   catch(err){
      console.log(err);
      res.status(500).json({error:'internal server error'});
   }
 })
 router.post('/login', async (req,res)=>{
    try{
      const {aadharcardnumber,password}=req.body;
      const user= await person.findOne({aadharcardnumber:aadharcardnumber});
      if(!user || !(await user.comparePassword(password))){
        return res.status(401),json({error:'invalid username or password'});
      }
        const payload={
         id:user.id
        }
        const token= generateToken(payload);
       res.json(token);
    }
    catch(err){
       console.log(err);
       res.status(500).json({error:'internal server error'});
    }
  })
 
 router.get('/profile',jwtauthmiddleware, async (req,res)=>{
   try{
   const userdata=req.user;
   const userid=userdata.id;
   const user=await user.findOne(userid);
   res.status(200).json(user);
   }
   catch(err){
     console.log(err);
     res.status(500).json({error:'internal server error'});
   }
 })
 
   router.put('/profile/password',jwtauthmiddleware,async (req,res)=>{
       try{
             const userid= req.user.id;
              const {currentpassword, newpassword}=req.body;
               const user= await user.findById(userid);
               if(!(await user.comparePassword(currentpassword))){
                return res.status(401),json({error:'invalid username or password'});
              }
              user.password= newpasword;
              await user.save();
             console.log('password changed successfully');
             res.status(200).json({message:'password updated'});
       }catch(err){
           console.log(err);
           res.status(500).json({error:'internal server error'});
       }
   })
module.exports=router;