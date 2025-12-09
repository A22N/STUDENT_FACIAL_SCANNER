const Student = require("../../models/Student");
const Class = require("../../models/Class");

const AdminStudentController = {
    async index(req, res) {
        try {
            const students = await Student.getAll();
            const classes = await Class.getAll();

            res.render("admin/students", {
                students,
                classes,
                active: "students"
            });

        } catch (err) {
            console.error(err);
            res.status(500).send("DB ERROR");
        }
    },

    create: async (req, res) => {
    try {
        await Student.create(req.body);
        res.redirect("/admin/students");
    } catch (err) {
        console.error(err);
        res.redirect("/admin/students/add?error=1");
    }
    },

    update: async (req, res) => {
    try {
        await Student.update(req.params.id, req.body);
        res.redirect("/admin/students");
    } catch (err) {
        console.error(err);
        res.redirect(`/admin/students/edit/${req.params.id}?error=1`);
    }
    },

    delete: async (req, res) => {
    try {
        await Student.delete(req.params.id);
        res.redirect("/admin/students");
    } catch (err) {
        console.error(err);
        res.redirect("/admin/students?error=1");
    }
    }

};

module.exports = AdminStudentController;
