const mongoose= require('mongoose')
// define mongodb connection url
 const mongourl='mongodb://localhost:27017/voting'  // connected to local databse (mongodb compass)
 //const mongourl='mongodb+srv://soniashish37066:ashi1470@cluster0.nl59he3.mongodb.net/' // connected to global database (mongodb atlas)
  //const mongoURL=process.env.MONGODB_URL;
 const mongoURL= process.env.MONGODB_URL_LOCAL
// set up mongodb connection
mongoose.connect(mongourl,{
    usenewurlparser:true,
    useunifiedtopology:true
})
 const db= mongoose.connection;
  db.on('connected',()=>{
    console.log('connected  to mongodb server');
  });
  db.on('disconnected',()=>{
    console.log('mongodb disconnected');
  });

   module.exports=db;