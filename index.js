//dependencies 
const mysql = require('mysql'); 
const inquirer = require('inquirer'); 
const cTable = require('console.table'); 

//imports 
const db = require('./db');
const { viewDept, addDept, deleteDept, viewRole, addRole, deleteRole, updateRole, viewEmp, addEmp, deleteEmp, viewEmpByMgr, viewEmpByDept, viewMgr, updateMgr } = require('./db');
const { exit, title } = require('process');

//initialize 
init(); 

 function init() {
    startMenu(); 
 }
 //start menu
 async function startMenu() {
     try {
         const { action } = await inquirer.prompt(
             [
                 {
                     name: 'action', 
                     type: 'list', 
                     message: 'choose from the followiing:', 
                     choices: [
                         {
                             name: 'View all Departments', 
                             value: 'VIEW_ALL_DEPT', 
                         },
                         {
                             name: 'Add new department',
                             value: 'ADD_NEW_DEPT',
                         },
                         {
                             name: 'Delete department', 
                             value: 'DELETE_DEPT',
                         }, 
                         {
                             name: 'View all Roles', 
                             value: 'VIEW_ALL_ROLES', 
                         }, 
                         {
                             name: 'Add new Role', 
                             value: 'ADD_NEW_ROLE', 
                         }, 
                         {
                             name: 'Delete Role', 
                             value: 'DELETE_ROLE', 
                         }, 
                         {
                            name: 'Update Role', 
                            value: 'UPDATE_ROLE' 
                         }, 
                         {
                             name: 'View Employees', 
                             value: 'VIEW_EMP', 
                         }, 
                         {
                             name: 'Add Employee', 
                             value: 'ADD_EMP',
                         }, 
                         {
                             name: 'Delete Employee', 
                             value: 'DELETE_EMP',
                         }, 
                         {
                             name: 'View Employee by Manager', 
                             value: 'VIEW_EMP_BY_MGR',
                         }, 
                         {
                             name: 'View Employee by Department', 
                             value: 'VIEW_EMP_BY_DEPT', 
                         }, 
                        //  {
                        //      name: 'View Manager(s)', 
                        //      value: 'VIEW_MGR', 
                        //  }, 
                         {
                             name: 'Update Manager(s)', 
                             value: 'UPDATE_MGR', 
                         }, 
                        //  {
                        //      name: 'View Total Department Budget', 
                        //      value: 'VIEW_BUDGET',
                        //  }, 
                         {
                             name: 'exitProgram', 
                             value: 'EXIT', 
                         }
                     ]
                 }
             ]
         );
         switch(action) {
             //departments
             case 'VIEW_ALL_DEPT': return showDept(); 
             case 'ADD_NEW_DEPT': return createDept(); 
             case 'DELETE_DEPT': return removeDept(); 
             case 'VIEW_ALL_ROLES': return showRole(); 
             case 'ADD_NEW_ROLE': return createRole(); 
             case 'DELETE_ROLE': return removeRole(); 
             case 'UPDATE_ROLE': return editRole(); 
             case 'VIEW_EMP': return showEmp(); 
             case 'ADD_EMP': return createEmp(); 
             case 'DELETE_EMP': return removeEmp(); 
             case 'VIEW_EMP_BY_MGR': return showEmpByMgr(); 
             case 'VIEW_EMP_BY_DEPT': return showEmpByDept(); 
            //  case 'VIEW_MGR': return showMgr(); 
             case 'UPDATE_MGR': return editMgr(); 
            //  case 'VIEW_BUDGET': return viewBudget();
            default: return exitProgram();  
         }
     } catch (err) {
        console.error(err); 
     }
     }
//function 
async function showDept() {
    try{
        const departments = await db.viewDept();
        console.log("\n"); 
        console.table(departments);
        startMenu();  
    } catch (err) {
        console.error(err); 
    }
}
//function 
async function createDept() {
  try {
      const department = await prompt([
          {
              name: 'Enter the name of the department'
          }
      ]); 
      await db.addDept(department); 
      console.log(`Added ${department.name} to the database`); 
      startMenu(); 
  } catch (err) {
      console.error(err); 
  }
}
//function 
async function removeDept() {
    try {
        const departments = await db.viewDept(); 
        const deptChoices = departments.map( ({id, name}) => ({
            name: name, 
            value: id
        })); 
        const { departmentId } = await prompt([
            {
                type: 'list', 
                name: 'departmentId', 
                message: 'select the department to remove: this will remove all associated roles and employees if you proceed', 
                choices: deptChoices
            }
        ]); 
        await db.deleteDept(departmentId); 
        console.log('Removed from database'); 
        startMenu(); 
    } catch (err) {
        console.error(err); 
    }
}
//function 
async function showRole() {
    try {
        const roles = await db.viewRole(); 
        console.log('\n'); 
        console.table(roles); 
        startMenu(); 
    } catch (err) {
        console.error(err); 
    }
}
//function 
async function createRole() {
    try {
        const departments = await db.addRole(); 
        const deptChoices = departments.map( ({id, name}) => ({
            name: name, 
            value: id
        })); 
        const role = await prompt([
            {
                name: 'title', 
                message: 'Enter the  name of the role'
            }, 
            {
                name: 'salary', 
                message: 'Enter the salary for this role'
            }, 
            {
                type: 'list', 
                name: 'dept_id', 
                message: 'Select the department this role belongs to', 
                choices: deptChoices
            }
        ]); 
        await db.addRole(role); 
        console.log(`Added ${role.title} et al to the database`); 
        startMenu(); 
    } catch (err) {
        console.error(err); 
    }
}
//function 
async function removeRole() {
    try {
        const roles = await db.viewRole(); 
        const roleChoices = roles.map( ({id, title}) => ({
            name: title, 
        value: id
         })); 
         const { roleId } = await prompt([
             {
                 type: 'list', 
                 name: 'roleId', 
                 message: 'Select the role to remove: this will remove all employees in this role if you proceed', 
                 choices: roleChoices
             }
         ]); 
         await db.deleteRole(roleId); 
         console.log('Removed from database'); 
         startMenu(); 
    } catch (err) {
        console.error(err); 
    }
}
//function 
async function editRole() {
    try {
        const employees = await db.viewEmp(); 
        const empChoices = employees.map( ({id, first_name, last_name}) => ({
          name: `${first_name} ${last_name}`, 
          value: id  
        })); 
        const { employeeId } = await prompt([
            {
                type: 'list', 
                name: 'employeeId', 
                message: 'Select role to update', 
                choices: empChoices
            }
        ]); 
        const roles = await db.viewRole(); 
        const roleChoices = roles.map( ({id, title}) => ({
            name:title, 
            value: id
        })); 
        const { roleId } = await prompt([
            {
                type: 'list', 
                name: 'roleId', 
                message: 'Select the role to assign to employee', 
                choices: roleChoices
            }
        ]); 
        await db.updateRole(employeeId, roleId);
        console.log('Role Updated'); 
        startMenu();  
    } catch (err) {
        console.error(err); 
    }
}
//function 
async function showEmp() {
    try {
        const employees = await db.viewEmp(); 
        console.log('\n'); 
        console.table(employees); 
        startMenu(); 
    } catch (err) {
        console.error(err); 
    }
}
//function 
async function createEmp() {
    try {
        const roles = await db.viewRole(); 
        const employees = await db.viewEmp(); 
        const employee = await prompt([
            {
                name: 'first_name',
                message: "Enter the employee's first name",  
            }
        ]); 
        const roleChoices = roles.map( ({id, title}) => ({
            name: title, 
            value: id
        })); 
        const { roleId } = await prompt({
            type: 'list', 
            name: 'roleId', 
            message: "Select the new employee's role", 
            choices: roleChoices
        });
        employee.role_id = roleId; 
        const mgrChoices = employees.map( ({id, first_name, last_name, }) => ({
            name: `${first_name} ${last_name}`, 
            value: id
        })); 
        mgrChoices.unshift({name: "none", value: null}); 
        const { managerId } = await prompt({
            type: 'list', 
            name: 'managerId', 
            message: "Select the new employee's manager", 
            choices: mgrChoices
        }); 
        employee.mgr_id = managerId; 
        await db.addEmp(employee); 
        console.log(`Added ${employee.first_name} ${employee.last_name} to database`); 
        startMenu(); 
    } catch (err) {
        console.error(err); 
    }
}
//function 
async function removeEmp() {
    try {
        const employees = await db.viewEmp(); 
        const empChoices = employees.map( ({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`,
            value: id
        })); 
        const { employeeId } = await prompt([
            {
                type: 'list', 
                name: 'employeeId', 
                message: 'Select the employee to remove', 
                choices: empChoices
            }
        ]); 
        await db.deleteEmp(employeeId); 
        console.log('Removed from database'); 
        startMenu(); 
    } catch (err) {
        console.error(err); 
    }
}
//function 
async function showEmpByMgr() {
    try {
        const managers = await db.viewEmp(); 
        const mgrChoices = managers.map( ({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`, 
            value: id
        })); 
        const { managerId } = await prompt([
            {
                type: 'list', 
                name: 'managerId', 
                message: 'Select employee you want to view', 
                choices: mgrChoices
            }
        ]); 
        const employees = await db.viewEmpByMgr(managerId); 
        console.log('\n'); 
        if (employees.length === 0) {
            console.log('There are no reports for that employee'); 
        } else {
            console.table(employees); 
        }
        startMenu(); 
    } catch (err) {
        console.error(err); 
    }
}
//function 
async function showEmpByDept() {
    try {
        const departments = await db.viewDept(); 
        const deptChoices = departments.map( ({id, name}) => ({
            name: name, 
            value: id
        })); 
        const { departmentId } = await prompt([
            {
                type: 'list', 
                name: 'departmentId', 
                message: 'Select the department to view employees', 
                choices: deptChoices
            }
        ]); 
        const employees = await db.viewEmpByDept(departmentId); 
        console.log('\n'); 
        console.table(employees); 
        startMenu(); 
    } catch (err) {
        console.error(err); 
    }
}
//function 
// async function showMgr() {
//     try {

//     } catch (err) {
//         console.error(err); 
//     }
// }
//function 
async function editMgr() {
    try {
        const employees = await db.viewEmp(); 
        const empChoices = employees.map( ({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`, 
            value: id
        })); 
        const { employeeId } = await prompt([
            {
                type: 'list', 
                name: 'employeeId', 
                message: 'Select the employee to update', 
                choices: empChoices
            }
        ]); 
        const managers = await db.viewMgr(employeeId); 
        const mgrChoices = managers.map( ({id, first_name, last_name}) => ({
            name: `${first_name} ${last_name}`, 
            value: id
        })); 
        const { managerId } = await prompt([
            {
                type: 'list', 
                name: 'managerId', 
                message: 'Select the employee to set as manager', 
                choices: mgrChoices
            }
        ]); 
        await db.updateMgr(employeeId, managerId); 
        console.log('Update in database'); 
        startMenu(); 
    } catch (err) {
        console.error(err); 
    }
}
//function 
// async function showBudget() {
//     try {

//     } catch (err) {
//         console.error(err); 
//     }
// }
//function 
function exitProgram() {
    console.log('When there is no wind, row. Good-Bye!'); 
    process.exit(); 
}