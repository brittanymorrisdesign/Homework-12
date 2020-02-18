const mysql = require('mysql');
const inquirer = require('inquirer');

// MySQL DB Connection Information
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'rootroot',
  database: 'employee_trackerDB',
});

// Checks if connection was successful
connection.connect(function(err) {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  connection.query('SELECT * FROM products', (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log(res);
  });
});
