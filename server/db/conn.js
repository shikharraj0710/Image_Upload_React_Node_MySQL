const mysql = require("mysql2");

const conn = mysql.createConnection({
    user : "root",
    host : "localhost",
    password : "Shikhar!2345",
    database : "imageupload"
});

conn.connect((error) => {
    if(error) throw error;
    console.log("DB connected")
})

module.exports = conn;