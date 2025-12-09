const db = require("../../config/db");

module.exports = {
    index: (req, res) => {
        const sql = `
            SELECT sl.*, s.full_name, c.class_name
            FROM sms_logs sl
            LEFT JOIN students s ON sl.student_id = s.id
            LEFT JOIN classes c ON s.class_id = c.id
            ORDER BY sl.id DESC
        `;

        db.query(sql, (error, logs) => {
            if (error) {
                console.error("SMSLOG ERROR:", error);
                return res.status(500).send("Server error");
            }

            res.render("admin/smslogs/index", {
                logs,
                active: "smslogs"
            });
        });
    }
};
