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
connection.connect(err => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  runSearch();
});

// Initial Prompt
const runSearch = () =>
  inquirer
    .prompt([
      {
        name: 'action',
        type: 'list',
        message: 'What would you like to do? (Use Arrow Keys)',
        choices: [
          'View All Employees',
          'View All Departments',
          'View All Roles',
          'Add Employee',
          'Add Department',
          'Add Role',
          'Update Employee Role',
          'Exit',
        ],
      },
    ])
    .then(answer => {
      switch (answer.action) {
        case 'View All Employees':
          viewAllEmployees();
          break;

        case 'View All Departments':
          viewAllDepartments();
          break;

        case 'View All Roles':
          viewAllRoles();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'Add Role':
          addRole();
          break;

        case 'Update Employee Role':
          updateEmployeeRole();
          break;

        case 'Exit':
          connection.end();
          break;
      }
    });

// View All Employees by Function
const viewAllEmployees = () => {
  // Query to view all employees
  connection.query(
    `
    SELECT 
        employee.id, 
        employee.first_name AS 'First Name',
        employee.last_name AS 'Last Name',
        role.title AS 'Title',
        department.name AS 'Department',
        role.salary AS 'Salary',
        CONCAT(e.first_name , ' ' , e.last_name) AS 'Manager'
    FROM employee 
    INNER JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee e ON employee.manager_id = e.id
    ORDER BY employee.id;
    `,
    (err, res) => {
      if (err) throw err;
      // Display query results using console.table
      console.log('\n');
      console.table(res);
      runSearch();
    }
  );
};

// View All Departments by Function
const viewAllDepartments = () =>
  connection.query(
    'SELECT id, name AS department FROM department',
    (err, res) => {
      if (err) throw err;
      console.table(res);
      runSearch();
    }
  );

// View All Roles by Function
const viewAllRoles = () => {
  connection.query(
    `
    SELECT 
        role.id,
        role.title AS 'Title',
        role.salary AS 'Salary',
        department.name AS 'Department'
    FROM role
    LEFT JOIN department ON role.department_id = department.id;
    `,
    (err, res) => {
      if (err) throw err;
      console.log('\n');
      console.table(res);
      runSearch();
    }
  );
};

// Add Employee Function
const addEmployee = () =>
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
    .then(answer => {
      connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answer.employeeFirstName,
          last_name: answer.employeeLastName,
          role_id: answer.employeeRole,
          manager_id: answer.employeeManagerId,
        },
        function(err, res) {
          if (err) throw err;
          console.log(
            `You have entered ${answer.employeeFirstName} ${answer.employeeLastName} in the employee database.`
          );
          runSearch();
        }
      );
    });

// Add department Function
const addDepartment = () =>
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'deptName',
        message: 'What department would you like to add?',
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO department (name) VALUES (?)',
        answer.deptName,
        function(err, res) {
          if (err) throw err;
          console.log(
            `You have entered ${answer.deptName} into your department database.`
          );
          runSearch();
        }
      );
    });

// Add role Function
const addRole = () =>
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'addRole',
        message: 'What role would you like to add?',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary for this role?',
      },
      {
        type: 'input',
        name: 'departmentID',
        message: "What is this role's department id?",
      },
    ])
    .then(answer => {
      connection.query(
        'INSERT INTO role SET ?',
        {
          title: answer.addRole,
          salary: answer.roleSalary,
          department_id: answer.departmentID,
        },
        function(err, res) {
          if (err) throw err;
          console.log(
            `You have entered ${answer.addRole} into your role database.`
          );
          runSearch();
        }
      );
    });

// Update Employee Role Function
const updateEmployeeRole = () =>
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
