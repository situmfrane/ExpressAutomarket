const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const authenticateJWT = require('../authenticateJWT');
const flash = require('connect-flash');
const ls = require('local-storage')

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
const Post = require('../models/post')
const { Op } = require('sequelize');

route.get('/api/account', authenticateJWT, (req, res) => {
    
    Post.findAll({
        raw: true,
        where: {
            userId: req.user.id
        }
    })
    .then((post) => {
        res.render('myaccount.ejs', { cars: post, user: req.user.id, ls: ls})
    })
});

module.exports = route;