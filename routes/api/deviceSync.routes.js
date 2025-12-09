const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/upload");
const DeviceController = require("../../controllers/api/device.controller");

// Máy quét J8 gửi lên dạng multipart/form-data
router.post("/PushAddr/CarriedDevice", upload.single("picture"), DeviceController.handleCarriedDevice);

module.exports = router;
