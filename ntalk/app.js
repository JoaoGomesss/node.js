
const express = require('express')
, path = require('path')
, load = require("express-load")
, cookieParser = require('cookie-parser')
, session = require('express-session')
, bodyParser = require('body-parser')
, methodOverride = require('method-override')
, app = express()
, error = require('./middleware/error');

// , routes = require('./routes/home')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cookieParser('ntalk'));
app.use(session({
  secret: 'ntalk',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// app.get('/', routes.index);
// app.get('/usuarios', routes.user.index);

load("models").then("controllers").then("routes").into(app)

app.use(error.notFound);
app.use(error.serverError);


app.listen(3000, function(){
console.log("Ntalk no ar.");
})

