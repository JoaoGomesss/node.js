const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    if (pathname === '/') {
        pathname = '/artigos';
    }

    const filePath = path.join(__dirname, `${pathname}.html`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            fs.readFile(path.join(__dirname, 'erro.html'), 'utf8', (error, errorData) => {
                if (error) {
                    res.writeHead(500, {'Content-Type': 'text/html'});
                    res.end('<h1>Erro Interno do Servidor</h1>');
                } else {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(errorData);
                }
            });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});