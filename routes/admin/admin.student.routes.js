const express = require("express");
const router = express.Router();

const AdminStudentController = require("../../controllers/admin/admin.student.controller");

// Danh sách
router.get("/", AdminStudentController.index);

router.post("/add", AdminStudentController.create);
router.post("/edit/:id", AdminStudentController.update);
router.get("/delete/:id", AdminStudentController.delete);

module.exports = router;
