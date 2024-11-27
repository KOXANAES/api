const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    "embera", 
    "postgres", 
    "1111", {
    dialect: "postgres",
    host: "localhost",
    define: { 
        timestamps:false
        }
    });

module.exports = sequelize
