const mysql = require('mysql'); 
 
module.exports = () => {     
    return mysql.createConnection({         
        host: "200.9.176.230",         
        user:'acollaguazo',         
        password: 'adita',         
        database:'assr_p1_g2',     
    });     
    } 