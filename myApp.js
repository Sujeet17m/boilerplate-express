// const { config } = require('dotenv');
// let express = require('express');
// const { log } = require('fcc-express-bground');
// let app = express();
// require('dotenv').config();

// console.log("Hello World");

// app.get('/',function(req,res){
//     res.sendFile(__dirname+'/views/index.html');
// });

// app.use('/public',express.static(__dirname + '/public'))
// app.get('/json',function(req,res){
//     let message = "Hello json";
//     if(process.env.MESSAGE_STYLE === 'uppercase'){
//         message = message.toUpperCase();
//     }
//     res.json({message: message});
// });
// app.use(function(req,res,next){
//     console.log(`${req.method}${req.path}-${req.ip}`);
//     next();
// });

const { time } = require('console');
let express = require('express');
let app = express();
let path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
// ✅ Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// ✅ Static assets
app.use('/public', express.static(__dirname + '/public'));

// ✅ Home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// ✅ JSON route with environment variable support
app.get('/json', (req, res) => {
  let message = 'Hello json';
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }
  res.json({ message: message });
});
app.get('/now',function(req,res,next){
    req.time=new Date().toString();
    next();
},
function(req,res){
    res.json({time: req.time});
});

app.get('/:word/echo',function(req,res){
    const word= req.params.word;
    res.json({ echo:word});
});

app.get('/name',(req,res)=>{
  const firstName = req.query.first;
  const lastName = req.query.last;
  res.json({ name: `${firstName} ${lastName}` });
    
})
// app.route('/name').get((req,res)=>{
//     res.json({name : 'firstname lastname'})

// }).post(req.query = req.query());
app.post('/name',(req,res)=>{
    const firstName = req.body.first;
    const lastName = req.body.last;
    res.json({ name : `${firstName} ${lastName}`});
});



































 module.exports = app;
