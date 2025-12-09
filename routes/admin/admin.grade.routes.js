const express = require("express");
const router = express.Router();
const Grade = require("../../models/Grade");

router.get("/", async (req, res) => {
  const grades = await Grade.getAll();
  res.render("admin/grades/index", { grades, active: "grades" });
});

router.get("/add", (req, res) => {
  res.render("admin/grades/add", { active: "grades" });
});

router.get("/edit/:id", async (req, res) => {
  const grade = await Grade.getById(req.params.id);
  res.render("admin/grades/edit", { grade, active: "grades" });
});

module.exports = router;
