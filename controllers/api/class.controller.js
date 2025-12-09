const Class = require("../../models/Class");

const ClassController = {
    async getAll(req, res) {
        try {
            const classes = await Class.getAll();
            res.json({ success: true, data: classes });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    async create(req, res) {
        try {
            const { grade_id, class_name, description } = req.body;

            if (!grade_id || !class_name)
                return res.status(400).json({ success: false, message: "grade_id & class_name required" });

            const id = await Class.create({ grade_id, class_name, description });
            res.json({ success: true, message: "Class created", id });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const result = await Class.update(id, data);
            res.json({ success: true, message: "Class updated", result });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;

            await Class.delete(id);
            res.json({ success: true, message: "Class deleted" });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
};

module.exports = ClassController;
