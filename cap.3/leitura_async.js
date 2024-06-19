let fs = require("fs")


let leituraAsync = (arquivo) =>{

    console.log("Fazendo leitura assincrona");
    let inicio = new Date().getTime()
    fs.readFile(arquivo)
    let fim = new Date().getTime()
    console.log("Bloqueio assincrono: "+(fim - inicio) + "ms");
}

module.exports = leituraAsync