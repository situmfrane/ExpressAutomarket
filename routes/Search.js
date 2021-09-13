const express = require('express');
const route = express.Router();
// const connection = require('../database');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const ls = require('local-storage');
const authenticateJWT = require('../authenticateJWT');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(flash());
const Post = require('../models/post')
const { Op } = require('sequelize');

route.get('/api/posts', (req, res) => {

    Post.findAll({
        raw: true,
        order: [
            ['postedat', 'DESC']
        ]
    }).then((post) => {
        console.log(post)
        res.render('search.ejs', {cars: post, ls: ls});
    })
    
});

route.post('/api/filtered', (req,res) => {
    
    Post.findAll({
        raw: true,
        order: [
            ['postedat', 'DESC']
        ],
        where:  {
            manufacturer: {
                [Op.like]: req.body.manufacturer
            },
            model: {
                [Op.like]: req.body.model
            },
            price: {
                [Op.between]: [req.body.priceFrom, req.body.priceTo]
            },
            manufacturedYear: {
                [Op.between]: [req.body.yearFrom, req.body.yearTo]
            },
            mileage: {
                [Op.between]: [req.body.mileageFrom, req.body.mileageTo]
            },
            enginesize: {
                [Op.between]: [req.body.engineFrom, req.body.engineTo]
            },
            enginepower: {
                [Op.between]: [req.body.powerFrom, req.body.powerTo]
            },
            fuel: {
                [Op.like]: req.body.fuel
            },
            servicehistory: {
                [Op.like]: req.body.service
            },
            garaged: {
                [Op.like]: req.body.garaged
            }, 
            crashed: {
                [Op.like]: req.body.crashed
            }
        }
    }).then((post) => {
        res.render('search.ejs', {cars: post, ls: ls});
    })
})


module.exports = route