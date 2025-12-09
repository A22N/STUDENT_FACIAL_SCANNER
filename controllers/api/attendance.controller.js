const Attendance = require("../../models/Attendance");
const Student = require("../../models/Student");
const SmsLog = require("../../models/SmsLog");
const { sendSMS } = require("../../services/sms.service");

const AttendanceController = {

    // Máy quét gửi JSON sạch vào API này
    async faceScan(req, res) {
        try {
            const { student_id, timestamp, image_url } = req.body;

            if (!student_id) {
                return res.json({ success: false, message: "Missing student_id" });
            }

            const student = await Student.findByCode(student_id);
            if (!student) {
                return res.json({
                    success: false,
                    message: `Không tìm thấy học sinh với mã ${student_id}`,
                });
            }

            const attId = await Attendance.create({
                student_id: student.id,
                timestamp: timestamp || new Date().toISOString().slice(0, 19).replace('T', ' '),
                image_url,
                source: "api"
            });

            let smsRes = null;
            let msg = null;
            if (student.parent_phone) {
                // ====== ĐOẠN VÁ TẠM DÙNG TEMPLATE ======
                msg =
                    "Cam on quy khach da su dung dich vu cua chung toi. Chuc quy khach mot ngay tot lanh!";

                smsRes = await sendSMS(student.parent_phone, msg);

                const smsStatusRaw = smsRes?.data?.CodeResult || smsRes?.error?.CodeResult;
                const smsStatus = Number.isFinite(Number(smsStatusRaw)) ? Number(smsStatusRaw) : null;

                // msg = `HS ${student.full_name} (${student.class_name}) da diem danh luc ${timestamp || new Date().toISOString()
                //     }`;

                await SmsLog.create(
                    // student.parent_phone, 
                    // student.id, 
                    // msg, 
                    // smsRes.CodeResult || "ERR"
                    student.parent_phone,
                    student.id,
                    msg,
                    smsStatus,
                    "esms"
                );
            }

            return res.json({
                success: true,
                data: {
                    attendance_id: attId.id,
                    student,
                    sms: smsRes,
                },
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: err.message });
        }
    }
};

module.exports = AttendanceController;
