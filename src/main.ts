import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import {userRouter} from "./routers/user-router";
import {requestRouter} from "./routers/request-router";

const app = express();
const favicon = require('serve-favicon');

//set port
const port = process.env.PORT || 3001;
app.set('port', port);

const sess = {
    secret: 'keyboard cat',
    cookie: {secure: false},
    resave: false,
    saveUninitialized: false
};

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}

//register session
app.use(session(sess));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//log requests
app.use((req, res, next) => {
    console.log(`request made with path: ${req.path} \nand type: ${req.method}`);
    next();
});

//serve static content
app.use(
    express.static(path.join(__dirname, 'public'))
);

app.use('/public/create-request', express.static(__dirname + '/create-request'));
app.use('/public/home', express.static(__dirname + '/home'));
app.use('/public/login-page', express.static(__dirname + '/login-page'));
app.use('/public/manage', express.static(__dirname + '/manage'));
app.use('/public/register-user', express.static(__dirname + '/register-user'));

//serve start page
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public/login-page/login.html'));
});

//setup body parser
app.use(bodyParser.json());

//ROUTERS
app.use('/users', userRouter);
app.use('/requests', requestRouter);

//start listening
const server = app.listen(port, () => {
   console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
});