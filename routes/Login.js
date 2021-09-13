if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//Requires the .env file with secret tokens in non production apps

const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
const jwt = require('jsonwebtoken');
const ls = require('local-storage');
const flash = require('connect-flash');

const sequelize = require('../config/database');
const Post = require('../models/post')
const User = require('../models/user')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());

route.get('/api/login', (req, res) => {
    res.render('login.ejs', { message: req.flash('message') });
});

//Login route
route.post('/api/login', (req, res) => {

    User.findAll({
        where: {
            username: req.body.username
        }
    })
        .then((user) => {
            function generateAccessToken() {
                return jwt.sign({ id: user[0].id }, process.env.SECRET_TOKEN, { expiresIn: '10h' });
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {

                if (result) {
                    //generates access token and signs it for 60 mins
                    const accessToken = generateAccessToken();
                    ls.set('accessToken', accessToken);
                    res.redirect('/api/posts');

                }
                else {
                    req.flash('message', 'Wrong password.')
                    res.redirect('/api/login');
                }
            })
        })
        .catch(() => {
            req.flash('message', 'Wrong username.')
            res.redirect('/api/login');
        })

});

route.get('/api/logout', (req, res) => {
    ls.clear();
    res.redirect('/api/posts');
})


module.exports = route;