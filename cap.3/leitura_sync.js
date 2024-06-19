let fs = require("fs")

let leituraSync = (arquivo)=>{
    console.log("Fazendo leitura sincrona");
    let inicio = new Date().getTime()
    fs.readFileSync(arquivo)
    let fim = new Date().getTime()
    console.log("Bloqueio sincrono: " + (fim-inicio )+ "ms");
}

module.exports = leituraSync