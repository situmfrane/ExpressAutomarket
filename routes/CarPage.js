const express = require('express');
const route = express.Router();
const ls = require('local-storage');
const Post = require('../models/post');
const User = require('../models/user');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Gets car based on id, renders the car page
route.get('/api/car/:id', (req, res) => {

    //Find cars with id from uri parameters
    Post.findAll({
        raw: true,
        order: [
            ['postedat', 'DESC']
        ],
        where: {
            id: req.params.id
        }
    }).then((post) => {
        
        //Finds the user using the user owner Id so it can show the listing owner's phone number
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