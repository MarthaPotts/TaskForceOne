DROP DATABASE IF EXISTS employees_db; 
CREATE DATABASE employees_db; 

USE employees_db; 
-- main
CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30) UNIQUE NOT NULL, 
); 
-- extended A
CREATE TABLE `role` (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
title VARCHAR(30) UNIQUE NOT NULL, 
salary DECIMAL UNSIGNED NOT NULL, 
dept_id INT UNSIGNED NOT NULL, 
INDEX dep_ind (dept_id), 
CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE CASCADE
); 
-- extended B
CREATE TABLE employee (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT UNSIGNED NOT NULL, 
    INDEX role_ind (role_id), 
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    mgr_id INT UNSIGNED, 
    INDEX man_ind (mgr_id), 
    CONSTRAINT fk_mgr FOREIGN KEY (mgr_id) REFERENCES employee(id) ON DELETE SET NULL
);