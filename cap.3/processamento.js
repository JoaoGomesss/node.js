let http = require('http');
let fs = require('fs');
let leituraAsync = require('./leitura_async');
let leituraSync = require('./leitura_sync');


let arquivo = "./node.exe";
let stream = fs.createWriteStream(arquivo);
let download = "http://nodejs.org/dist/latest/node.exe";


http.get(download, function(res) {
console.log("Fazendo download do Node.js");
res.on('data', function(data){
stream.write(data);
});
res.on('end', function(){
stream.end();
console.log("Download finalizado!");
leituraAsync(arquivo);
leituraSync(arquivo);
});
});
