const express = require('express');
path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser=require("body-parser");
mongoDb = require("./database/db");
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{console.log("Database comnnected")},
error=>{
  console.log("Database connection error",+error);
})


const bookRoute = require("./routes/bookroutes");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:false
}));

app.use(cors());
app.use(express.static(path.join(__dirname,'dist/Bookstore')));

app.use('/api',bookRoute);
const port = process.env.port || 8000;

app.listen(port,()=>{
  console.log("listening on",+port);
})

app.use((req,res,next)=>{
  next(createError(404));
});

app.get("/",(req,res)=>{
  res.send('invalid endpoint');
});

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,'dist/Bookstore/index.html'));
});

app.use(function(err,req,res,next){
  console.log(err.message);
   if(!err.statusCode) err.statusCode=500;
   res.status(err.statusCode).send(err.message);
})
