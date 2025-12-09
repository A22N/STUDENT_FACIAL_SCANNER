const db = require("../config/db");

const Grade = {
  getAll() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM grades ORDER BY id ASC", (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  getById(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM grades WHERE id = ?", [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  },

  create(data) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO grades (grade_name) VALUES (?)",
        [data.grade_name],
        (err, result) => {
          if (err) reject(err);
          else resolve(result.insertId);
        }
      );
    });
  },

  update(id, data) {
    return new Promise((resolve, reject) => {
      db.query("UPDATE grades SET grade_name=? WHERE id=?",
        [data.grade_name, id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM grades WHERE id=?", [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
};

module.exports = Grade;
