const mongoose= require('mongoose');
const bcrypt=require('bcrypt');
// defining  schema 
const  userschema = new mongoose.Schema({
   name:{
      type:String,
      required:true
   },
   age:{
      type:Number,
      required:true
   },
   email:{
    type:String
 },
   mobile:{
      type:String
   },
   
   address:{
      type:String,
      required:true
   },
   aadharcardnumber:{
    required:true,
    type:Number,
    unique:true
   },
   password:{
    required:true,
    type:String
   },
   role:{
    type:String,
    enum:['voter','admin'],
    default:'voter'
   },
   isvoted:{
    type:Boolean,
  default:false
   }
});
userschema.pre('save',async function(next){
    const user=this;
     if(!user.isModified('password')) return next();
    try{
     // hash password generation
     const salt = await bcrypt.genSalt(10);
     // hash password
      const hashedpassword= await bcrypt.hash(user.password,salt);
      user.password= hashedpassword;
    next();
    }catch(err){
      return next(err);
    }
 })
 userschema.methods.comparepassword= async function(candidatepassword){
  try{
      const ismatch= await bcrypt.compare(candidatepassword,this.password);
       return ismatch;
  }catch(err){
      throw err;
  }
 }
// creating modal
 const user= mongoose.model('user', userschema);
 module.exports= user;