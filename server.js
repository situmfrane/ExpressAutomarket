const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash');

const sequelize = require('./config/database');
const Post = require('./models/post')
const User = require('./models/user')


const loginRoute = require('./routes/Login');
const registerRoute = require('./routes/Register');
const postRoute = require('./routes/Post');
const searchRoute = require('./routes/Search');
const myAccountRoute = require('./routes/MyAccount');
const carPostRoute = require('./routes/CarPage');

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(flash());

app.use(session({ 
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));

sequelize.sync();

app.listen(5000);

app.use('/', loginRoute);
app.use('/', registerRoute);
app.use('/', postRoute);
app.use('/', searchRoute);
app.use('/', myAccountRoute);
app.use('/', carPostRoute);

app.get('/', (req, res) => {
    res.redirect('/api/posts')
});

