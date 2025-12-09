const db = require("../config/db");

const Class = {
    getAll() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT c.*, g.grade_name 
                FROM classes c 
                JOIN grades g ON c.grade_id = g.id
                ORDER BY c.id ASC
            `;
            db.query(sql, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    create(data) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO classes (grade_id, class_name, description) VALUES (?, ?, ?)";
            db.query(sql, [data.grade_id, data.class_name, data.description], (err, results) => {
                if (err) reject(err);
                else resolve(results.insertId);
            });
        });
    },

    update(id, data) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE classes SET grade_id=?, class_name=?, description=? WHERE id=?";
            db.query(sql, [data.grade_id, data.class_name, data.description, id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    delete(id) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM classes WHERE id=?", [id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

module.exports = Class;
