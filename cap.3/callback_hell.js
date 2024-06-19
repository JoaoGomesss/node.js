let fs = require("fs")

fs.readdir(__dirname, (err, datas)=>{
    if(err) {throw err}

    datas.forEach((data)=>{
        let path = "./" + data
        fs.stat(path, (err, dat)=>{
            if(err) {throw err}
            if(dat.isFile()){
                console.log("%s %d bytes", data, dat.size);
            }
        })
    })
})