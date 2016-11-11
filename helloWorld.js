
// load libraries
var express = require('express');
var fs = require('fs');

//declare app var for express.
var app = express();

// set default to views directory.
app.set('views', './views');

// set view engine to pug.
app.set('view engine', 'pug');

//config  static  pages.
app.use(express.static('public'));


//create route to render index.pug file.
app.get('/', function(req, res){
    res.render('index', {title: 'Hey!', message: 'Hello World!'})
})

//prints hello world.
app.get('/', function (req, res) {
    res.render('index', {title : 'Hey', message :'Hello World!'})
})

// gets request that retrieves file directory on the vm.
app.get('/files', function(req,res) {
   fs.readdir('/', function(err,files){
       if (err) throw err;
       console.log(files);
       res.render('files', {title:'File Directory', message : files});
   })
})

// gets /proc  cpu stats on the vm.
app.get('/sysinfo', function(req,res) {
        fs.readFile('/proc/cpuinfo','utf8', function(err,data) {
        if (err) throw err;
        var data2 = data.split("\n");
        data2 =  data2.slice(1,26);
        console.log(data2.length);
        console.log(data2);
        res.render('sys', {title:'CPUinfo', message: data2});
    })
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

