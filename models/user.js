const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Post = require('../models/post')

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    lastname: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    username: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    phonenumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    postalcode: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    county: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.hasMany(Post);

module.exports = User;