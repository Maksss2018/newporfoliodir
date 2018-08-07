const GoogleRecaptcha = require('google-recaptcha')
const googleRecaptcha = new GoogleRecaptcha({secret: '6Lfr9U0UAAAAAK63Ulk03tVjfSFhAzADfUDaaTP1'})
//var http = require('http');
var path = require('path');
//var async = require('async');
var fs = require('fs');
//var socketio = require('socket.io');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var content = require('./content.json');
var db = require('./dbconnection.json');
var app = express();
var unwrapp = require('striptags');
var con = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'max1236',
  password : '',
  database : 'c9'
});
  // con.connect();
/* nmcli connection modify 'Wired connection 1' connection.autoconnect yes ipv4.method manual ipv4.address 192.168.0.179/24 ipv4.gateway 192.168.0.1 ipv4.dns 192.168.0.1
var server = http.createServer(router);
var io = socketio.listen(server);
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'client')));
app.use(express.static(path.resolve(__dirname, 'node_modules/jquery-validation/dist')));
app.set('view engine', 'ejs');
app.get('/',function(req, res){
  res.render('pages/index', {
    pageTitel:"M.G. porfolio",
    headerImg: content.headerImg,
    data:content
  });
});

// Some pseudo server code: 
 /*
app.on('POST', (req, res) => {
    const recaptchaResponse = req.body['g-recaptcha-response'];
     console.log(" recaptchaResponse == "+recaptchaResponse);
    googleRecaptcha.verify({response: recaptchaResponse}, (error) => {
    if (error) {
          console.log("recaptcha ERORR!");
     res.send({isHuman: false})
    }
   console.log("SUCCESS!!!!");
     res.send({isHuman: true})
  })
})*/
/* validation for registration form  START
app.post('/validate_email',function(req, res){
/*var email = req.body.data;
  con.query('SELECT id WHERE  email='+email+'', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 con.end();
  
  res.send("response from DataBase sever");
});

validation for registration form  END*/
app.post('/message',function(req, res){
   var data = req.body;
   var valid = data.validate;
   var text =req.body.message;
     if(req.body.recaptcha === undefined || req.body.recaptcha === '' || req.body.recaptcha === null) {
     res.json({"responseCode" : 1,"responseDesc" : false});
  }
   var secretKey = "6Lfr9U0UAAAAAK63Ulk03tVjfSFhAzADfUDaaTP1";
   var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.recaptcha/*req.body['g-recaptcha-response']*/ + "&remoteip=" + req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  request(verificationUrl,function(error,response,body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if(body.success !== undefined && !body.success) {
      return res.json({"responseCode" : 1,"responseDesc" : false});
    }
    res.json({"responseCode" : 0,"responseDesc" : true});
  });
});
/*---------Googlerecaptcha START*/
app.post('/message_notbot',function(req, res){
    var data = req.body;
    var date = new Date();
    var valid = data.validate;
    var text =req.body.message;
       if(valid!=false){
  /*con.query("INSERT INTO users (name, email, message, date_of_publication ) VALUES ('"+req.body.name+"', '"+req.body.email+"', '"+unwrapp(text, [], '\n')+"', '"+new Date()+"')", function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
     });*/
    msg = "I wil unswear you as soon as I can.";
     fs.appendFileSync('message.json', '{ "name":"'+req.body.name+'", "email":"'+req.body.email+'", "meassage":"'+unwrapp(text, [], '\n')+'", "date":"'+new Date()+'"}, ');
}else{
    msg = "you enterd not valid data. Please try again.";
};
  console.log("msg === "+msg);
  res.send(msg);
});
/*---------Googlerecaptcha END*/

app.listen(8080);
console.log('Server is ON');
