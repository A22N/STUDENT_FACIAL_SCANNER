const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "An@01254823924",
    database: "student_face_scanner",
    connectionLimit: 10
});

module.exports = pool;
