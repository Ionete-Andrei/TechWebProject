/**
 * This class represents the amount of food a User has registered for selling
 */

const Food = require("./Food").Food;
const User = require("./User").User;
const sequelize = require("../databaseManager").sequelize;
const Sequelize=require('sequelize')

const Products=sequelize.define('products',{
   quantity:Sequelize.DataTypes.DOUBLE,
   measurementUnit:Sequelize.DataTypes.STRING
},{timestamps:false});

//define the many to many relationship between User and Food 
//using the info from the official documentation
User.belongsToMany(Food, { through: Products,timestamps:false });
Food.belongsToMany(User, { through: Products,timestamps:false });
module.exports={Products:Products};

