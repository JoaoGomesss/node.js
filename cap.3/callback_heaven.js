let fs = require("fs")

let lerDiretorio = ()=>{
    fs.readdir(__dirname, (err, diretorio)=>{
        if(err) return err
        diretorio.forEach((arquivo)=>{
            ler(arquivo)
        })
    })
}


let ler = (arquivo) => {
    let path = "./" +arquivo
    fs.stat(path, (err, stat)=>{
        if(err) return err
        if(stat.isFile()){
            console.log("%s %d bytes", arquivo, stat.size);
        }
    })
}

lerDiretorio()