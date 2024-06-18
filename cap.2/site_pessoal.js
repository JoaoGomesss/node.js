const http = require("http");
const fs = require("fs");
const port = 3000;

let server = http.createServer((req, res) => {
  fs.readFile(__dirname + "/index.html", (err, html) => {
    res.writeHeader(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  });
});

server.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
