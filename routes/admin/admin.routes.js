const express = require("express");
const router = express.Router();

const AdminController = require("../../controllers/admin/admin.controller");



router.get("/", AdminController.dashboard);


module.exports = router;
