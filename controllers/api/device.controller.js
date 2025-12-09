const Device = require("../../models/Device");
const Attendance = require("../../models/Attendance");
const Student = require("../../models/Student");
const SmsLog = require("../../models/SmsLog");
const { sendSMS } = require("../../services/sms.service");
const DeviceSyncService = require("../../services/deviceSync.service");
const db = require("../../config/db");


// ================================
// HANDLE DEVICE PUSH EVENT
// ================================
exports.handleCarriedDevice = async (req, res) => {
    try {
        console.log("\n======================================");
        console.log("📥 NHẬN DỮ LIỆU TỪ DEVICE");

        // Parse JSON từ máy quét
        const jsonData = JSON.parse(req.body.json);
        console.log("➡️ JSON PARSED:", jsonData);

        const event = jsonData.Events?.[0];
        const personID = event?.RecognizeResults?.[0]?.PersonInfo?.ID;


        console.log("➡️ ID =", personID);

        if (!personID) {
            console.log("❌ Không tìm thấy ID trong JSON");
            return res.status(400).json({ message: "No ID" });
        }


        const student = await Student.findByCode(personID);

        if (!student) {
            console.log("❌ Không tìm thấy học sinh trong DB");
            return res.status(404).json({ 
                success: false, 
                message: "Student not found" 
            });
        }

        console.log("🎉 STUDENT FOUND:", student.full_name);

        // ================================
        //  KIỂM TRA ĐIỂM DANH GẦN ĐÂY
        // ================================
        const recentLog = await Attendance.findRecent(student.id, 60);
        if (recentLog) {
            console.log('⚠️ Đã điểm danh gần đây, bỏ qua');
            return res.status(200).json({ message: 'Already logged recently' });
        }

        // ================================
        //  GHI ATTENDANCE
        // ================================
        const attId = await Attendance.create({
            student_id: student.id,
            timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
            image_url: null,
            source: "device"
        });

        console.log("📌 Đã ghi attendance log:", attId);

        // ================================
        //  GỬI SMS CHO PHỤ HUYNH
        // ================================
        let smsRes = null;

        if (student.parent_phone) {
            const msg = `Học sinh ${student.full_name} đã điểm danh lúc ${new Date().toLocaleTimeString()}`;

            console.log("📤 Gửi SMS:", msg);

            smsRes = await sendSMS(student.parent_phone, msg);

            const smsStatus = smsRes?.success ? "success" : "failed";

            await SmsLog.create(
                student.parent_phone,
                student.id,
                msg,
                smsStatus,
                "esms"
            );

            if (!smsRes?.success && smsRes?.error?.ErrorMessage) {
                console.warn("⚠️ SMS thất bại:", smsRes.error.ErrorMessage);
            }
            
            console.log("📨 KẾT QUẢ SMS:", smsRes);
        } else {
            console.log("⚠️ Không có số điện thoại phụ huynh!");
        }

        return res.json({
            success: true,
            attendance_id: attId,
            student,
            sms: smsRes
        });

    } catch (error) {
        console.error("🔥 LỖI handleCarriedDevice:", error);
        return res.status(500).json({ error: error.message });
    }
};
