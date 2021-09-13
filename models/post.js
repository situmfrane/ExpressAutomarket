const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('posts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    postedat: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    expiresat: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    vinnumber: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    mileage: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    manufacturedyear: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fuel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    enginesize: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    enginepower: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    shiftsystem: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    owner: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    servicehistory: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    garaged: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    crashed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    imageuri: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    manufacturer: {
        type: Sequelize.STRING,
        allowNull: false
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false
    },

})

module.exports = Post;