const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
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

// View All Employees by Function
function viewAllEmployees() {
  // Query to view all employees
  const query =
    'SELECT first_employee.first_name, first_employee.last_name, second_employee.first_name as manager_first_name, second_employee.last_name as manager_last_name' +
    ' FROM employee as first_employee' +
    ' LEFT JOIN employee as second_employee';
  connection.query(query, function(err, res) {
    if (err) return err;
    console.log('\n');
    // Display query results using console.table
    console.table(res);
    runSearch();
  });
}

// View All Employees by Department Function
function viewEmployeesByDept() {
  const query = `SELECT * FROM department`;
  connection.query(query, function(err, res) {
    console.table(res);
    runSearch();
  });
}

// View All Employees by Manager Function
function viewEmployeesByManager() {
  const query = 'text goes here';
  connection.query(query, function(err, res) {
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}

// Add Employee Function
function addEmployee() {
  inquirer
    .prompt([
      {
        message: 'Enter first name of new employee:',
        type: 'input',
        name: 'employeeFirstName',
      },
      {
        message: 'Enter last name of new employee:',
        type: 'input',
        name: 'employeeLastName',
      },
      {
        message: 'Enter Role ID of new employee:',
        type: 'input',
        name: 'employeeRole',
      },
      {
        message: 'Enter Manager ID of new employee:',
        type: 'input',
        name: 'employeeManagerId',
      },
    ])
    .then(function(answer) {
      const firstName = answer.employeeFirstName;
      const lastName = answer.employeeLastName;
      const roleId = answer.employeeRole;
      const managerId = answer.employeeManagerId;
      runSearch();
    });
}

// Remove Employee Function
function removeEmployee() {
  const query = 'text goes here';
  connection.query(query, function(err, res) {
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}
// VUpdate Employee Role Function
function updateEmployeeRole() {
  const query = 'text goes here';
  connection.query(query, function(err, res) {
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}
// Update Employee Manager Function
function updateEmployeeManager() {
  const query = 'text goes here';
  connection.query(query, function(err, res) {
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}

// View All Roles Function
function viewAllRoles() {
  const query = 'text goes here';
  connection.query(query, function(err, res) {
    for (let i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}
