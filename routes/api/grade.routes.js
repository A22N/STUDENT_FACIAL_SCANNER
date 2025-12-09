const express = require("express");
const router = express.Router();
const GradeController = require("../../controllers/api/grade.controller");

router.get("/", GradeController.getAll);
router.post("/", GradeController.create);
router.put("/:id", GradeController.update);
router.delete("/:id", GradeController.delete);

module.exports = router;
