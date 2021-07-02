const connection = require('../db/connection'); 

class Sqlconnection {
    constructor(connection) {
        this.connection = connection; 
    }
    //methods
     viewMgr(employeeId) {
        return this.connection.query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?;", 
            employeeId
        ); 
    }
    updateMgr(employeeId, managerId) {
        return this.connection.query(
            "UPDATE employee SET mgr_id = ? WHERE id = ?;", [managerId, employeeId]
        ); 
    }
    //dept
    addDept() {
        return this.connection.query(
          "INSERT INTO department SET ?;", department  
        );
    }
    viewDept() {
        return this.connection.query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.dept_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name;"
        );
    }
    // updateDept() {
    //     return this.connection.query()
    // }
    deleteDept(departmentId) {
        return this.connection.query(
            "DELETE FROM department WHERE id =?;", departmentId
        );
    }
    //role
    addRole(role) {
        return this.connection.query(
            "INSERT INTO role SET ?;", role
        ); 
    }
    viewRole() {
        return this.connection.query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.dept_id = department.id;"
        );
    }
    updateRole(employeeId, roleId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?;", [roleId, employeeId]
        );
    }
    deleteRole(roleId) {
        return this.connection.query(
            "DELETE FROM role WHERE id = ?;", roleId
        );
    }
    //employee
    addEmp(employee) {
        return this.connection.query(
           "INSERT INTO employee SET ?;", employee
        );
    }
    viewEmp() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ',manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id LEFT JOIN department on dept_id = department.id LEFT JOIN employee manager on manager.id = employee.mgr_id;" 
        );
    }
    viewEmpByMgr(managerId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.dept_id WHERE mgr_id = ?;",
            managerId
        ); 
    }
    viewEmpByDept(departmentId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department AS department on role.dept_id = department.id WHERE department.id = ?;", 
            departmentId
        ); 
    }
    // updateEmp() {
    //     return this.connection.query()
    // }
    deleteEmp(employeeId) {
        return this.connection.query(
            "DELETE FROM employee WHERE id = ?;", employeeId
        );
    }
}

module.exports = new Sqlconnection(connection); 