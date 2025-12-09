// ===============================
// SERVER KHỞI ĐỘNG CHÍNH
// ===============================
const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const multer = require("multer");
const upload = multer({ limits: { fieldSize: 50 * 1024 * 1024 } }); // 50MB
// Config & DB
const config = require("./config");
const db = require("./config/db");


// API Routes
const gradeRoutes = require("./routes/api/grade.routes");
const classRoutes = require("./routes/api/class.routes");
const studentRoutes = require("./routes/api/student.routes");
const attendanceRoutes = require("./routes/api/attendance.routes");
const deviceRoutes = require("./routes/api/device.routes");

// =========================================
//API send SMS
// =========================================
const attendanceApiRoutes = require("./routes/api/attendance.routes");

// ===============================
//  RAW BODY ROUTE FOR DEVICE
// ===============================
const DeviceController = require("./controllers/api/device.controller");
const deviceSyncRoutes = require("./routes/api/deviceSync.routes");

// ADMIN VIEW Routes
const adminRoutes = require("./routes/admin/admin.routes");
const adminStudentRoutes = require("./routes/admin/admin.student.routes");
const adminClassRoutes = require("./routes/admin/admin.class.routes");
const adminAttendanceRoutes = require("./routes/admin/admin.attendance.routes");
const adminDeviceRoutes = require("./routes/admin/admin.device.routes");
const adminGradeRoutes = require("./routes/admin/admin.grade.routes");
const adminSmslogsRoutes = require("./routes/admin/smslog.routes");

// =========================================
// INIT
// =========================================
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Static + Views
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// =========================================
// DB CHECK
// =========================================
db.getConnection((err, connection) => {
    if (err) console.error("X Lỗi kết nối MySQL:", err);
    else {
        console.log("-> Đã kết nối MySQL thành công!");
        connection.release();
    }
});

// |/PushAddr/CarriedDevice|
app.use("/api", deviceSyncRoutes);

// RAW BODY — device only

app.use("/api/device", deviceRoutes);
app.post(
    "/PushAddr/CarriedDevice",
    upload.fields([{ name: "json" }, { name: "picture" }]),
    DeviceController.handleCarriedDevice
);

// app.use(
//     "/api/PushAddr/CarriedDevice",
//     express.raw({ type: "*/*", limit: "50mb" }),
//     deviceRoutes
// );


// =========================================
// API Routes (JSON)
// =========================================
app.use("/api/students", studentRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/attendance", attendanceRoutes);


// =========================================
// ADMIN VIEW ROUTES (EJS)
// =========================================
app.use("/admin", adminRoutes);
app.use("/admin/students", adminStudentRoutes);
app.use("/admin/classes", adminClassRoutes);
app.use("/admin/attendance", adminAttendanceRoutes);
app.use("/admin/device", adminDeviceRoutes);
app.use("/admin/grades", adminGradeRoutes);
app.use("/admin/smslogs",adminSmslogsRoutes);

// =========================================
// Send SMS
// =========================================
app.use("/api/attendance", attendanceApiRoutes);
app.use("/api/device-sync", deviceSyncRoutes);


// =========================================
// Dashboard mặc định
// =========================================
app.get("/", (req, res) => {
    res.redirect("/admin");
});

// 404
app.use((req, res) => {
    res.status(404).json({ success: false, message: "API không tồn tại!" });
});

// Error handler
app.use((err, req, res, next) => {
    console.error("X Lỗi server:", err);
    res.status(500).json({ success: false, message: err.message });
});

// START
const PORT = config.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy trên cổng ${PORT}`));
