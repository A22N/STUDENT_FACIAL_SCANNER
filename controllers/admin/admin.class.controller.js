const Class = require("../../models/Class");
const Grade = require("../../models/Grade");

const AdminClassController = {
    async index(req, res) {
        try {
            const classes = await Class.getAll();
            const grades = await Grade.getAll();

            res.render("admin/classes", {
                classes,
                grades,
                active: "classes"
            });

        } catch (err) {
            console.error(err);
            res.status(500).send("DB ERROR");
        }
    }
};

module.exports = AdminClassController;
