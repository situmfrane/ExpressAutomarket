const express = require('express');
const route = express.Router();
// const connection = require('../database');
const bcrypt = require('bcrypt');
const authenticateJWT = require('../authenticateJWT');
const flash = require('connect-flash');
const User = require('../models/user')
const { Op } = require('sequelize');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());


route.get('/api/register', (req, res) => {
    res.render('register.ejs', { message: req.flash('message') });
});

//Post request for adding users into table
route.post('/api/register', async (req, res) => {

    var hashedpass = await bcrypt.hash(req.body.password, 10)

    const [user, created] = await User.findOrCreate({
        where: {
            [Op.or]: [
                { username: req.body.username },
                { email: req.body.email }
            ]
        },
        defaults: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hashedpass,
            email: req.body.email,
            username: req.body.username,
            phonenumber: req.body.phonenumber,
            postalcode: req.body.postalcode,
            address: req.body.address,
            city: req.body.city,
            county: req.body.county
        }
    })
    res.redirect('/api/login')
    res.redirect('/api/account');


});

//Patch request used to workers based on url
route.patch('/api/users/:id', authenticateJWT, async (req, res) => {

    var hashedpass = await bcrypt.hash(req.body.password, 10);
    
    await User.update({ 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashedpass,
        email: req.body.email,
        username: req.body.username,
        phonenumber: req.body.phonenumber,
        postalcode: req.body.postalcode,
        address: req.body.address,
        city: req.body.city,
        county: req.body.county
    }, 
    {
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/api/')
    })

});

//Delete request to remove users based on id in url
route.delete('/api/users/:id', authenticateJWT, async (req, res) => {

    await User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.sendStatus(200);
    })

});

module.exports = route;