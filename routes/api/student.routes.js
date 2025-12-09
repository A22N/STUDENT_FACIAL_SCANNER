const express = require("express");
const router = express.Router();

const StudentController = require("../../controllers/api/student.controller");

// GET all
router.get("/", StudentController.getAll);

// CREATE
router.post("/", StudentController.create);

// UPDATE
router.put("/:id", StudentController.update);

// DELETE
router.delete("/:id", StudentController.delete);

module.exports = router;
