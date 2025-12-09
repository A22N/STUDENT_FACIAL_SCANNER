const Student = require("../../models/Student");
const Class = require("../../models/Class");
const Grade = require("../../models/Grade");
const Attendance = require("../../models/Attendance");

const AdminController = {
    async dashboard(req, res) {
        try {
            const students = await Student.getAll();
            const classes = await Class.getAll();
            const grades = await Grade.getAll();
            const attendance = await Attendance.getByDate();

            res.render("admin/dashboard/index", {
                students,
                classes,
                grades,
                attendance,
                active: "dashboard"
            });

        } catch (err) {
            console.error(err);
            res.status(500).send("DB ERROR");
        }
    }
};

module.exports = AdminController;
