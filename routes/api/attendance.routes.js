const express = require("express");
const router = express.Router();
const AttendanceController = require("../../controllers/api/attendance.controller");

router.post("/face-scan", AttendanceController.faceScan);

module.exports = router;
