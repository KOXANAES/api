const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    "embera", 
    "postgres", 
    "0000", {
    dialect: "postgres",
    host: "localhost",
    define: { 
        timestamps:false
        }
    });

module.exports = sequelize
