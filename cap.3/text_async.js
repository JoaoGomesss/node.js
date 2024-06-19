let fs = require("fs")

for(let i = 1; i <=5; i++){
    let file = "async-txt" + i + ".txt"
    fs.writeFile(file, "Hello async nodejs", (err, out)=>{
        console.log(out);
    })
    
}