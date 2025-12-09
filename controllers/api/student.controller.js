const Student = require("../../models/Student");

const StudentController = {
    async getAll(req, res) {
        try {
            const students = await Student.getAll();
            res.json({ success: true, data: students });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    async create(req, res) {
        try {
            const { student_id, full_name, class_id, parent_phone, zalo_id } = req.body;

            if (!student_id || !full_name)
                return res.status(400).json({ success: false, message: "student_id & full_name required" });

            const id = await Student.create({
                student_id,
                full_name,
                class_id,
                parent_phone,
                zalo_id,
                status: 1
            });

            res.json({ success: true, message: "Student created", id });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const result = await Student.update(id, data);
            res.json({ success: true, message: "Student updated", result });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            await Student.delete(id);

            res.json({ success: true, message: "Student deleted" });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
};

module.exports = StudentController;
