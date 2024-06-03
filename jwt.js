const jwt= require('jsonwebtoken');
  const jwtauthmiddleware=(req,res,next) => {
   //extract jwt token from request header 
    const token=req.headers.authorization.split(' ')[1];
     if(!token)  return res.status(401).json({error:'unauthorize'});
     try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
         req.user=decoded
         next();
     }catch(err){
        console.error(err);
        res.status(401).json({error:'invalid token'});
     }
  }
  // function to generate token
   const generatetoken=(userdata)=>{
     return jwt.sign(userdata,process.env.JWT_SECRET);
   }
  module.exports={jwtauthmiddleware,generatetoken};