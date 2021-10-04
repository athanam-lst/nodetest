const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var expressSanitizer = require('express-sanitizer');
var cors = require('cors');
const fs = require('fs')
const https = require('https')

const app = express();




app.options('*', cors());
app.use(express.static(path.join(__dirname, './uploaded')));

app.use(function (req, res, next) {
    
    res.setHeader('Access-Control-Allow-Origin', '*'); //'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'content-type, x-access-token');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });
    
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb',extended: false}));
app.use(expressSanitizer());

app.get('/', (req, res) => {
    res.send('Hello HTTPS!')
})

https.createServer({
    key: fs.readFileSync('cert/server.key'),
    cert: fs.readFileSync('cert/server.cert')
  }, app).listen(3000, () => {
    console.log('Listening...  3000')
  })



//   app.get('/', (req, res) => {
//     res.send('Hello HTTPS!')
//   })
  
//   https.createServer({}, app).listen(3000, () => {
//     console.log('Listening...')
//   })

