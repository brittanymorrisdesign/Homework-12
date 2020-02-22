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
  const allEmployeesQuery =
    'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;';
  connection.query(allEmployeesQuery, function(err, res) {
    if (err) return err;
    console.log('\n');
    // Display query results using console.table
    console.table(res);
    runSearch();
  });
}

// View All Employees by Department Function
function viewEmployeesByDept() {
  connection.query('SELECT * FROM department', function(err, res) {
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
    .then(
      function(answer) {
        const firstName = answer.employeeFirstName;
        const lastName = answer.employeeLastName;
        const roleId = answer.employeeRole;
        const managerId = answer.employeeManagerId;
      },
      function(err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
      }
    );
  runSearch();
}

// Remove Employee Function
function removeEmployee() {
  connection.query('SELECT * FROM employee', (err, result) => {
    if (err) throw err;
  });
  const employees = result.map(
    employee => `${employee.first_name} ${employee.last_name}`
  );

  inquirer
    .prompt({
      type: 'list',
      name: 'employee',
      message: 'Which employee do you want to remove?',
      choices: employees,
    })
    .then(answer => {
      const { employee } = answer;
      const firstName = employee.split(' ')[0];
      const lastName = employee.split(' ')[1];

      connection.query(
        'DELETE FROM employee WHERE first_name = ? AND last_name = ?',
        [firstName, lastName],
        (err, res) => {
          if (err) throw err;
          console.log('Employee was successfully removed.');
        }
      );
      runSearch();
    });
}

// Update Employee Role Function
function updateEmployeeRole() {
  connection.query('SELECT * FROM employee', (err, employeeResult) => {
    const employees = employeeResult.map(
      employee => `${employee.first_name} ${employee.last_name}`
    );

    connection.query('SELECT * FROM role', (err, roleResult) => {
      const roles = roleResult.map(role => role.title);

      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employee',
            message: 'Which employees role would you like to update?',
            choices: employees,
          },
          {
            type: 'list',
            name: 'role',
            message: 'What is the employees new role?',
            choices: roles,
          },
        ])
        .then(answer => {
          const { id } = employeeResult.filter(
            employee =>
              `${employee.first_name} ${employee.last_name}` === answer.employee
          )[0];
          const role_id = roleResult.filter(
            role => role.title === answer.role
          )[0].id;

          connection.query(
            'UPDATE employee SET role_id = ? WHERE id = ?',
            [role_id, id],
            (err, result) => {
              if (err) throw err;
              console.log('Role successfully updated.');
              console.log(res[i].artist);
            }
          );
          runSearch();
        });
    });
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
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
  });
  console.table(res);
}
runSearch();
