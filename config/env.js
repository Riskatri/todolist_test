  
const env = {
    database: "todolist", //create database di mysql 
    username: "root",
    password: "handayani17", //genti password sesuai dengan password mysql yang dipunya di Mysql server
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min:0,
      acquire: 30000,
      idle: 10000
    }
};
module.exports = env