const db = require("../config/db");

const Device = {
    getAll() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM devices ORDER BY id DESC", (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getById(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM devices WHERE id = ?", [id], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    },

    create(data) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO devices (device_code, name, description) VALUES (?, ?, ?)";
            db.query(sql, [data.device_code, data.name, data.description], (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            });
        });
    },

    update(id, data) {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE devices SET device_code=?, name=?, description=? WHERE id=?";
            db.query(sql, [data.device_code, data.name, data.description, id], (err, result) => {
                if (err) reject(err);
                else resolve(result.affectedRows);
            });
        });
    },

    delete(id) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM devices WHERE id=?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result.affectedRows);
            });
        });
    }
};

module.exports = Device;
