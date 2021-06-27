//dependencies 
const mysql = require('mysql'); 
const inquirer = require('inquirer'); 
const cTable = require('console.table'); 

//imports 
const db = require('./db');
const { viewDept, addDept, deleteDept, viewRole, addRole, deleteRole, updateRole, viewEmp, addEmp, deleteEmp, viewEmpByMgr, viewEmpByDept, viewMgr, updateMgr } = require('./db');

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
                         {
                             name: 'View Manager(s)', 
                             value: 'VIEW_MGR', 
                         }, 
                         {
                             name: 'Update Manager(s)', 
                             value: 'UPDATE_MGR', 
                         }, 
                         {
                             name: 'View Total Department Budget', 
                             value: 'VIEW_BUDGET',
                         }, 
                         {
                             name: 'exit', 
                             value: 'EXIT', 
                         }
                     ]
                 }
             ]
         );
         switch(action) {
             //departments
             case 'VIEW_ALL_DEPT': return viewDept(); 
             case 'ADD_NEW_DEPT': return addDept(); 
             case 'DELETE_DEPT': return deleteDept(); 
             case 'VIEW_ALL_ROLES': return viewRole(); 
             case 'ADD_NEW_ROLE': return addRole(); 
             case 'DELETE_ROLE': return deleteRole(); 
             case 'UPDATE_ROLE': return updateRole(); 
             case 'VIEW_EMP': return viewEmp(); 
             case 'ADD_EMP': return addEmp(); 
             case 'DELETE_EMP': return deleteEmp(); 
             case 'VIEW_EMP_BY_MGR': return viewEmpByMgr(); 
             case 'VIEW_EMP_BY_DEPT': return viewEmpByDept(); 
             case 'VIEW_MGR': return viewMgr(); 
             case 'UPDATE_MGR': return updateMgr(); 
            //  case 'VIEW_BUDGET': return viewBudget(); 
         }
     } catch (err) {
        console.error(error); 
     }
     }


