/* Seeds for SQL table */
USE employee_trackerDB;

/* 3 Rows into table */
INSERT INTO department (name) 
VALUES ("UMass");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id) 
VALUES ("Boston College");

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Sales Lead", 70000.00, 1), ("Salesperson", 100000.00, 1), ("Lead Engineer", 80000.00, 1), ("Software Engineer", 90000.00, 2), ("Account Manager", 70000.00, 2), ("Accountant", 60000.00, 3), ("Legal Team Lead", 65000.00, 4),

SELECT * FROM employee;
