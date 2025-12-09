const db = require("../config/db");

const normalizeStatus = (status) => {
    if (!status) return "failed";

    const normalized = String(status).toLowerCase();

    if (normalized === "success" || normalized === "failed") {
        return normalized;
    }

    const numeric = Number(normalized);
    if (!Number.isNaN(numeric)) {
        return numeric === 100 ? "success" : "failed";
    }

    return "failed";
};

const SmsLog = {
    create(phone, student_id, message, status, provider) {
        const sql = `
            INSERT INTO sms_logs (phone, student_id, message, status, provider) 
            VALUES (?, ?, ?, ?, ?)
        `;

        const safeStatus = normalizeStatus(status);
        const safeProvider = provider || null;

        return new Promise((resolve, reject) => {
            db.query(sql, [phone, student_id, message, safeStatus, safeProvider], (err, rs) => {
                if (err) reject(err);
                else resolve(rs.insertId);
            });
        });
    }
};

module.exports = SmsLog;
