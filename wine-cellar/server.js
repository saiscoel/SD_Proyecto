/*var http = require('http'); 
http.createServer(function (req, res) { 
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    res.end('Hello World\n'); 
}).listen(3000, '127.0.0.1'); 
console.log('Server running at http://127.0.0.1:3000/');*/

var path = require('path');
var morgan = require('morgan');
const mongoose=require('mongoose');
var express = require('express'),
    wine=require('./routes/wines');

var app = express();

app.configure(function () {     
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */ 
    app.use(express.bodyParser()); 
});

app.get('/wines', wine.findAll); 
app.get('/wines/:id', wine.findById); 
app.post('/wines', wine.addWine); 
app.put('/wines/:id', wine.updateWine); 
app.delete('/wines/:id', wine.deleteWine); 

app.use(morgan('dev'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')
app.listen(3000); 
console.log('Listening on port 3000...'); 