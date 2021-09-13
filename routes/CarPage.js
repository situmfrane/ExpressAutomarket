const express = require('express');
const route = express.Router();
const ls = require('local-storage');
const Post = require('../models/post');
const User = require('../models/user');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

route.get('/api/car/:id', (req, res) => {


    Post.findAll({
        raw: true,
        order: [
            ['postedat', 'DESC']
        ],
        where: {
            id: req.params.id
        }
    }).then((post) => {
        User.findAll({
            raw: true,
            where: {
                id: post[0].userId
            }
        }).then((user) => {
            res.render('carpage.ejs', {cars: post, user: user[0] ,ls: ls});
        })
    })

});

module.exports = route;