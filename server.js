// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:date_string',(req,res)=>{
  var regex = /([\d]{4})-([\d]{2})-([\d]{2})/g;
  var regex2 = /^[\d]*$/g;
  if(regex.test(req.params.date_string) ){
    var date = new Date(req.params.date_string);
    res.send({"unix":date.getTime(),"utc":date.toUTCString()});
  }
  else if(regex2.test(req.params.date_string)){
    var date = new Date(parseInt(req.params.date_string));
    res.send({"unix":date.getTime(),"utc":date.toUTCString()});
  }
  else{
    res.send({"error":"Invalid Date"});
  }
  
});

app.get('/api/timestamp/',(req,res)=>{
    var date = new Date(Date.now());
    res.send({"unix":date.getTime(),"utc":date.toUTCString()});
  });

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
