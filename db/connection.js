const util = require('util'); 
const mysql = require('mysql'); 

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '*SQLbb0973',
    database: 'employees_db'
}); 

connection.connect(); 

//config for async/await 
connection.query = util.promisify(connection.query); 

module.exports = connection; 