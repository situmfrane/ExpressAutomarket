const express = require('express');
const route = express.Router();
const authenticateJWT = require('../authenticateJWT');
const flash = require('connect-flash');
const ls = require('local-storage');

const cars = require('../config/cars');

const User = require('../models/user')
const Post = require('../models/post')
const { Op } = require('sequelize');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

//Formats the js date so it woudl be good for sql database
format = function date2str(x, y) {
    var z = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
        return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
    });

    return y.replace(/(y+)/g, function (v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}

//Renders make post page, cars property is for usage in later updates
route.get('/api/makepost', authenticateJWT, (req, res) => {
    
    res.render('post.ejs', {ls: ls, cars: cars});
});

//Create post
route.post('/api/makepost', authenticateJWT, (req, res) => {
    
    //Postedat is today's date
    var postedat = format(new Date(), 'yyyy-MM-dd');
    var now = new Date();
    //Expiresat is listing expiry date
    var expiresat = format(new Date(now.getFullYear(), now.getMonth()+1, 1), 'yyyy-MM-dd');

    Post.create({
        postedat: postedat, 
        expiresat: expiresat,
        userId: req.user.id, 
        type: req.body.type,
        vinnumber: req.body.vinnumber, 
        title: req.body.title,
        description: req.body.description, 
        price: req.body.price,
        mileage: req.body.mileage, 
        manufacturedyear: req.body.manufacturedyear,
        fuel: req.body.fuel, 
        enginesize: req.body.enginesize,
        enginepower: req.body.enginepower, 
        shiftsystem: req.body.shiftsystem,
        owner: req.body.owner, 
        servicehistory: req.body.servicehistory,
        garaged: req.body.garaged,
        crashed: req.body.crashed,
        imageuri: req.body.imageuri,
        manufacturer: req.body.manufacturer, 
        model: req.body.model,
    }, 
    )
    .then(() => {  
        res.redirect('/api/posts');
    })
    .catch(err => {
        res.send(err)
    })
});

//Edits post
route.get('/api/editpost/:id', authenticateJWT, (req, res) => {

    Post.findAll({
        raw: true,
        where: {
            id: req.params.id
        }
    })
    .then((post) => {
        res.render('edit.ejs', { cars: post, ls: ls, user: req.user.id});
    })
});

//Saves editpost changes
route.post('/api/editpost/:id', authenticateJWT, async (req, res) => {

    var postedat = format(new Date(), 'yyyy-MM-dd');
    var now = new Date();
    var expiresat = format(new Date(now.getFullYear(), now.getMonth()+1, 1), 'yyyy-MM-dd');

        await Post.update({
            postedat: postedat, 
            expiresat: expiresat,
            id: req.params.id, 
            type: req.body.type,
            vinnnumber: req.body.vinnumber, 
            title: req.body.title,
            description: req.body.description, 
            price: req.body.price,
            mileage: req.body.mileage, 
            manufacturedyear: req.body.manufacturedyear,
            fuel: req.body.fuel, 
            enginesize: req.body.enginesize,
            enginepower: req.body.enginepower, 
            shiftsystem: req.body.shiftsystem,
            owner: req.body.owner, 
            servicehistory: req.body.servicehistory,
            garaged: req.body.garaged,
            crashed: req.body.crashed,
            imageuri: req.body.imageuri,
            manufacturer: req.body.manufacturer, 
            model: req.body.model,  
        }, {
           where: {
               id: req.params.id
           } 
        }).then(() => {
            res.redirect('/api/posts')
        })

});

//Delete post
route.get('/api/deletepost/:id', authenticateJWT, async (req, res) => {

    await Post.destroy({
        where: {
            id: req.params.id
        }
    })
    res.redirect('/api/posts')
});
module.exports = route;