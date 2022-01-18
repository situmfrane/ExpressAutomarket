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

//Get all posts
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

//Get posts using the side filter
route.post('/api/filtered', (req,res) => {
    
    let priceFrom, priceTo, yearFrom, yearTo, engineFrom, engineTo, powerFrom, powerTo, mileageFrom, mileageTo;

    if(req.body.priceFrom == '') {
        priceFrom = 1;
    }
    if(req.body.priceTo == '') {
        priceTo = 9999999999;
    }
    if(req.body.yearFrom == '') {
        yearFrom = 1;
    }
    if(req.body.yearTo == '') {
        yearTo = 99999;
    }
    if(req.body.engineFrom == '') {
        engineFrom = 1;
    }
    if(req.body.engineTo == '') {
        engineTo = 99999;
    }
    if(req.body.powerFrom == '') {
        powerFrom = 1;
    }
    if(req.body.powerTo == '') {
        powerTo = 999999999;
    }
    if(req.body.mileageFrom == '') {
        mileageFrom = 1;
    }
    if(req.body.mileageTo == '') {
        mileageTo = 999999999;
    }


    Post.findAll({
        raw: true,
        order: [
            ['postedat', 'DESC']
        ],
        where:  {
            manufacturer: {
                [Op.substring]: req.body.manufacturer
            },
            model:
            {
                [Op.substring]: req.body.model
            }
            ,
            price: {
                [Op.between]: [priceFrom, priceTo]
            },
            manufacturedYear: {
                [Op.between]: [yearFrom, yearTo]
            },
            mileage: {
                [Op.between]: [mileageFrom, mileageTo]
            },
            enginesize: {
                [Op.between]: [engineFrom, engineTo]
            },
            enginepower: {
                [Op.between]: [powerFrom, powerTo]
            }
            ,
            fuel: {
                [Op.substring]: req.body.fuel
            },
            servicehistory: {
                [Op.substring]: req.body.service
            },
            garaged: {
                [Op.substring]: req.body.garaged
            }, 
            crashed: {
                [Op.substring]: req.body.crashed
            }
        }
    }).then((post) => {
        res.render('search.ejs', {cars: post, ls: ls});
    })
})


module.exports = route