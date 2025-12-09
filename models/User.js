const db = require("../config/db");

const User = {
    getByUsername(username) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE username=?", [username], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    },

    getAllTeachers() {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM users WHERE role='teacher' ORDER BY id DESC",
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                }
            );
        });
    },

    create(data) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO users (username, password, full_name, role, grade_id, class_id)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            db.query(
                sql,
                [data.username, data.password, data.full_name, data.role, data.grade_id, data.class_id],
                (err, results) => {
                    if (err) reject(err);
                    else resolve(results.insertId);
                }
            );
        });
    }
};

module.exports = User;
