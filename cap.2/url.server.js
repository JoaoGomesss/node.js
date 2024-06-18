const http = require("http");
const url = require("url");
const port = 3000;

let server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Dados da query string</h1>");
  let result = url.parse(req.url, true);

  for (let key in result.query) {
    res.write("<h2>" + key + " : " + result.query[key] + "</h2>");
  }
  res.end();
});

server.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
