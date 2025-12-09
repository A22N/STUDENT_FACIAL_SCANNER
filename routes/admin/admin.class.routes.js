const express = require("express");
const router = express.Router();

const AdminClassController = require("../../controllers/admin/admin.class.controller");

router.get("/", AdminClassController.index);

module.exports = router;
