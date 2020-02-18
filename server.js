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

// Initial Prompt
function runSearch() {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View All Employees by Department',
        'View All Employees by Manager',
        'Add Employee',
        'Remove Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'View all Roles',
      ],
    })
    .then(function(answer) {
      switch (answer.action) {
        case 'View All Employees':
          viewAllEmployees();
          break;

        case 'View All Employees by Department':
          viewEmployeesByDept();
          break;

        case 'View All Employees by Manager':
          viewEmployeesByManager();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Remove Employee':
          removeEmployee();
          break;

        case 'Update Employee Role':
          updateEmployeeRole();
          break;

        case 'Update Employee Manager':
          updateEmployeeManager();
          break;

        case 'View all Roles':
          viewAllRoles();
          break;
      }
    });
}

function viewAllEmployees() {}
function viewEmployeesByDept() {}
function viewEmployeesByManager() {}
function addEmployee() {}
function removeEmployee() {}
function updateEmployeeRole() {}
function updateEmployeeManager() {}
function viewAllRoles() {}
