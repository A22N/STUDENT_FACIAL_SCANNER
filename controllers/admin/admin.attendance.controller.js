const db = require("../../config/db");

module.exports = {
    index: (req, res) => {
        const sql = `
            SELECT a.*, s.full_name, s.student_id, c.class_name
            FROM attendance_logs a
            JOIN students s ON a.student_id = s.id
            JOIN classes c ON s.class_id = c.id
            ORDER BY a.timestamp DESC
        `;

        db.query(sql, (error, logs) => {
            if (error) {
                console.error("ATTENDANCE ERROR:", error);
                return res.status(500).send("Server error");
            }

            res.render("admin/attendance/index", {
                logs,
                active: "attendance"
            });
        });
    }
};
