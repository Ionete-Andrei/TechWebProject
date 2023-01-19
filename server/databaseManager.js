const Sequelize = require("sequelize"); //import the sequelize dependency
require("dotenv").config();

const sequelize = new Sequelize(
  "foodwaste_db",

  "root", //process.env.DB.USERNAME
  "", //process.env.DB.PASSWORD

  {
    //create the connection to our database
    host: "localhost", //localhost
    port: 3306,
    dialect: "mysql"
  }
);

sequelize
  .authenticate()
  .then(() => {
    //checking if the connection was successful
    console.log("connected");
  })
  .catch((err) => {
    console.warn(err);
  });

module.exports = { sequelize: sequelize }; //this is the object that makes the connection to our database
