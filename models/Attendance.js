const db = require("../config/db");

const Attendance = {
    create(data) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO attendance_logs (student_id, timestamp, image_url, source)
                VALUES (?, ?, ?, ?)
            `;
            db.query(sql, [
                data.student_id,
                data.timestamp,
                data.image_url,
                data.source || "device"
            ], (err, results) => {
                if (err) reject(err);
                else resolve(results.insertId);
            });
        });
    },

    findRecent(studentId, minutes) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT *
                FROM attendance_logs
                WHERE student_id = ?
                  AND timestamp >= DATE_SUB(NOW(), INTERVAL ? MINUTE)
                ORDER BY timestamp DESC
                LIMIT 1
            `;

            db.query(sql, [studentId, minutes], (err, results) => {
                if (err) return reject(err);
                resolve(results[0] || null);
            });
        });
    },

    getByDate(date) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT a.*, s.full_name, s.student_id, c.class_name
                FROM attendance_logs a
                JOIN students s ON a.student_id = s.id
                JOIN classes c ON s.class_id = c.id
                WHERE DATE(a.timestamp) = ?
                ORDER BY a.timestamp DESC
            `;
            db.query(sql, [date], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

module.exports = Attendance;
