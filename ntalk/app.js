const express = require('express');
const path = require('path');
const load = require('express-load');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const error = require('./middleware/error');
const http = require('http');
const { Server } = require('socket.io');
const sharedsession = require('express-socket.io-session');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const KEY = 'ntalk.sid';
const SECRET = 'ntalk';

const store = new session.MemoryStore();
const sessOpts = {
  secret: SECRET,
  key: KEY,
  store: store,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
};

const sessionMiddleware = session(sessOpts);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser(SECRET));
app.use(sessionMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

load("models").then("controllers").then("routes").into(app);
load('sockets').into(io);

app.use(error.notFound);
app.use(error.serverError);


io.use(sharedsession(sessionMiddleware, {
  autoSave: true
}));

server.listen(3000, () => {
  console.log("Ntalk no ar.");
});


// const express = require('express')
// , path = require('path')
// , load = require("express-load")
// , cookieParser = require('cookie-parser')
// , session = require('express-session')
// , bodyParser = require('body-parser')
// , methodOverride = require('method-override')
// , app = express()
// , error = require('./middleware/error')
// // , server = require('http').createServer(app)
// // , io = require('socket.io').listen(server)
// , http = require('http')
// , { Server } = require('socket.io')
// , server = http.createServer(app)
// , io = new Server(server)

// // , routes = require('./routes/home')

// const KEY = 'ntalk.sid';
// const SECRET = 'ntalk';
// let cookie = cookieParser(SECRET)
// , store = new session.MemoryStore()
// , sessOpts = {
//   secret: SECRET,
//   key: KEY,
//   store: store,
//   resave: false, 
//   saveUninitialized: false, 
//   cookie: { secure: false } 
// }
// , session = session(sessOpts)

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(cookie);
// app.use(session);


// app.use(cookieParser('ntalk'));
// app.use(session({
//   secret: 'ntalk',
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));
// // app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));


// // app.get('/', routes.index);
// // app.get('/usuarios', routes.user.index);

// io.set('authorization', (data, accept) => {
//   cookie(data, {}, (err) => {
//   let sessionID = data.signedCookies[KEY];
//   store.get(sessionID, (err, session) => {
//   if (err || !session) {
//   accept(null, false);
//   } else {
//   data.session = session;
//   accept(null, true);
//   }
//   });
//   });
//   });
  

// load("models").then("controllers").then("routes").into(app)
// load('sockets')
// .into(io);

// app.use(error.notFound);
// app.use(error.serverError);


// server.listen(3000, () => {
//   console.log("Ntalk no ar.");
//   })

