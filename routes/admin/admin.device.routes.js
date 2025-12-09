const express = require("express");
const router = express.Router();

const AdminDeviceController = require("../../controllers/admin/admin.device.controller");

// Danh sách
router.get("/", AdminDeviceController.index);

// Form thêm
router.get("/add", AdminDeviceController.addForm);

// Form sửa
router.get("/edit/:id", AdminDeviceController.editForm);

module.exports = router;
