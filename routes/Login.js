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

    //Checks if user with corresponding name exists
    User.findAll({
        where: {
            username: req.body.username
        }
    })
        .then((user) => {

            function generateAccessToken() {
                return jwt.sign({ id: user[0].id }, process.env.SECRET_TOKEN, { expiresIn: '10h' });
            }

            //Compares input password with bcrypt hashed password in database
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {

                //If password is correct it sets the access token to localstorage and redirects page
                if (result) {
                    //generates access token and signs it for 60 mins
                    const accessToken = generateAccessToken();
                    ls.set('accessToken', accessToken);
                    res.redirect('/api/posts');

                }   //Flashes messsage in case password is incorrect
                else {
                    req.flash('message', 'Wrong password.')
                    res.redirect('/api/login');
                }
            })
        })
        .catch(() => { //Redirects back to login and flashes message in case the username is wrong
            req.flash('message', 'Wrong username.')
            res.redirect('/api/login');
        })

});

//Deletes access token from localstorage upon logout
route.get('/api/logout', (req, res) => {
    ls.clear();
    res.redirect('/api/posts');
})


module.exports = route;