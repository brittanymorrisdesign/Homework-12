USE employee_trackerDB;

-- Department Seeds --
INSERT INTO department (id, name)
VALUES (1, 'Sales');

INSERT INTO department (id, name)
VALUES (2, 'Engineering');

INSERT INTO department (id, name)
VALUES (3, 'Finance');

INSERT INTO department (id, name)
VALUES (4, 'Legal');

-- Role Seeds --
INSERT INTO role (title, salary, department_id) 
VALUES ('Sales Lead', 43000, 1);

INSERT INTO role (title, salary, department_id) 
VALUES ('Salesperson', 60000, 1);

INSERT INTO role (title, salary, department_id) 
VALUES ('Lead Engineer', 80000, 2);

INSERT INTO role (title, salary, department_id) 
VALUES ('Software Engineer', 90000, 2);

INSERT INTO role (title, salary, department_id) 
VALUES ('Account Manager', 50000, 3);

INSERT INTO role (title, salary, department_id) 
VALUES ('Accountant', 90000, 4);

INSERT INTO role (title, salary, department_id) 
VALUES ('Legal Team Lead', 100000, 4);

SELECT * FROM role;

-- Employee Seeds --
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES (4, 'John', 'Doe', 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES (4, 'Mike', 'Chan', 4, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES (4, 'Ashley', 'Rodriguez', 6, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES (4, 'Kevin', 'Tupik', 9, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES (4, 'Malia', 'Brown', 2, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES (4, 'Sarah', 'Lourd', 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES (4, 'Tom', 'Allen', 7, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES (4, 'Tammer', 'Galal', 8, null);

SELECT * FROM employee;
