const http = require('http');
const path = require('path');
const fs = require('fs');



const hostname = "localhost";
const port = "1000";


const server = http.createServer((req , res ) => {
  //console.log(req.headers);
  console.log('request for '+req.url +' method '+ req.method);

  if(req.method = 'GET'){
    var fileURL ;
    if(req.url == '/'){
      fileURL = 'index.html';
    }else{
      fileURL = req.url;
    }
    filePath = path.resolve('./public'+fileURL);
    const  extname = path.extname(filePath);
    if(extname == '.html'){
      fs.exists(filePath , (exists) => {
        if(!exists){
         res.statusCode = 404;
         res.setHeader('Context-Type','text/html');
         res.end('<html><body><h1>error 404: '+ fileURL + ' </h1></body></html>');

       }else{
         res.statusCode = 200;
         res.setHeader('Context-Type','text/html');
         fs.createReadStream(filePath).pipe(res);
       }
     })
    }


  }else{
    res.statusCode = 404;
      res.setHeader('Context-Type','text/html');
      res.end('<html><body><h1>Not a GET request</h1></body></html>');

  }


});

server.listen(port , hostname , () => {
  console.log(`Server is running at http://${hostname}:${port}`);
})
