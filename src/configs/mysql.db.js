const Sequelize = require("sequelize");

// Syntax for setting up a new connection
// Sequelize (database_name, user_name, password, {dialect: database, host: host})

const sequelize = new Sequelize("Book_My_Show2", "root", "admin", {
  dialect: "mysql",
  host: "localhost",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false
});

const connectToDB = async () => {
  try {
    await sequelize.authenticate(); 
    console.log("Successfully connected to the database.");
  } catch (error) {
    console.log(error);
  }
};


// sequelize.sync().then(() => {
//     console.log("Database synchronized successfully.");
//   }).catch((error) => {
//     throw new Error(`Error synchronizing database: ${error.message}`);
//   }); 

module.exports = { sequelize, connectToDB };
 