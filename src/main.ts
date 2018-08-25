import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import {userRouter} from "./routers/user-router";

const app = express();

//set port
const port = process.env.PORT || 3000;
app.set('port', port);

const sess = {
    secret: 'blub blob',
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

//log requests
app.use((req, res, next) => {
    console.log(`request made with path: ${req.path} \nand type: ${req.method}`);
    next();
});

//serve static content
app.use(
    express.static(path.join(__dirname, 'public'))
);

//serve start page
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'public/login-page/login.html'));
});

//setup body parser
app.use(bodyParser.json());

//ROUTERS
app.use('/users', userRouter);

//start listening
const server = app.listen(port, () => {
   console.log(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
});