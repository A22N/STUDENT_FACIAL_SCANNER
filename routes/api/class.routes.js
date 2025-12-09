const express = require("express");
const router = express.Router();

const ClassController = require("../../controllers/api/class.controller");

// GET all
router.get("/", ClassController.getAll);

// CREATE
router.post("/", ClassController.create);

// UPDATE
router.put("/:id", ClassController.update);

// DELETE
router.delete("/:id", ClassController.delete);

module.exports = router;
