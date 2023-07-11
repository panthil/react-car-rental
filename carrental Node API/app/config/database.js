const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "YES",
  database: "carrental",
});

module.exports = connection;
