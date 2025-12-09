const db = require("../config/db");

const Student = {
    getAll() {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT s.*, c.class_name, g.grade_name
                FROM students s
                LEFT JOIN classes c ON s.class_id = c.id
                LEFT JOIN grades g ON c.grade_id = g.id
                ORDER BY s.id DESC
            `;
            db.query(sql, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // getAllJoined() {
    // return db("students")
    //     .leftJoin("classes", "students.class_id", "classes.id")
    //     .select(
    //     "students.*",
    //     "classes.class_name"
    //     );
    // },

    // getAllWithClass() {
    // return db("students")
    //     .leftJoin("classes", "students.class_id", "classes.id")
    //     .select(
    //     "students.*",
    //     "classes.class_name"
    //     );
    // },


    create(data) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO students 
                (student_id, full_name, class_id, parent_phone, zalo_id, avatar, status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            db.query(sql, [
                data.student_id,
                data.full_name,
                data.class_id,
                data.parent_phone,
                data.zalo_id,
                data.avatar,
                data.status || 1
            ], (err, results) => {
                if (err) reject(err);
                else resolve(results.insertId);
            });
        });
    },

    update(id, data) {
        return new Promise((resolve, reject) => {
            const sql = `
                UPDATE students 
                SET student_id=?, full_name=?, class_id=?, parent_phone=?, zalo_id=?, avatar=?, status=?
                WHERE id=?
            `;
            db.query(sql, [
                data.student_id,
                data.full_name,
                data.class_id,
                data.parent_phone,
                data.zalo_id,
                data.avatar,
                data.status,
                id
            ], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

        // NEW: tìm học sinh theo mã máy quét / mã học sinh
    findByCode(student_id) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT s.*, c.class_name, g.grade_name
                FROM students s
                LEFT JOIN classes c ON s.class_id = c.id
                LEFT JOIN grades g ON c.grade_id = g.id
                WHERE s.student_id= ?
                LIMIT 1
            `;
            db.query(sql, [student_id], (err, results) => {
                if (err) return reject(err);
                resolve(results[0] || null);
            });
        });
    },

    
    delete(id) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM students WHERE id=?", [id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

module.exports = Student;
