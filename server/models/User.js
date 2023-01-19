/**
 * defining the User model for database manipulation
 * defining the relationship between the User and the Food entity
 * @see Food.js
 */

//importing the Food model
const Food = require("./Food").Food;
const sequelize = require("../databaseManager").sequelize;
const Sequelize = require("sequelize");

const User = sequelize.define(
  "user",
  {
    firstName: Sequelize.DataTypes.STRING,
    lastname: Sequelize.DataTypes.STRING,
    email: Sequelize.DataTypes.STRING,
    userType: Sequelize.DataTypes.STRING,
    tag: Sequelize.DataTypes.STRING,
    invites: Sequelize.DataTypes.STRING,
  },
  { timestamps: false }
);

module.exports = { User: User };
