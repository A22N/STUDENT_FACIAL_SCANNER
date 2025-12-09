const express = require("express");
const router = express.Router();
const DeviceController = require("../../controllers/api/device.controller");

router.post("/PushAddr/CarriedDevice", DeviceController.handleCarriedDevice);

// ❌ Comment dòng lỗi này:
 // router.get("/:id", DeviceController.getById);

module.exports = router;
