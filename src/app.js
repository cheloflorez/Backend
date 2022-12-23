// Express
import express from "express";
import routers from './routes/index.js';
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import methodOverride from 'method-override'
import flash from 'connect-flash'
import session from 'express-session'
import { Server } from 'socket.io'
import Sockets from "./sockets.js";

const app = express();

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(flash());

app.use(session({
  secret: "session",
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

// Server Init
const port = 8080
const httpServer = app.listen(port, () => {
  console.log(`BackEnd Coder - Server Started on port ${port}`);
});

const socketServer = new Server(httpServer)
Sockets(socketServer);

// Routes

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/api', routers)