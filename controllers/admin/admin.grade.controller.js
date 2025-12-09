const Grade = require("../../models/Grade");

const AdminGradeController = {
    async index(req, res) {
        try {
            const grades = await Grade.getAll();

            res.render("admin/grades", {
                grades,
                active: "grades"
            });

        } catch (err) {
            console.error(err);
            res.status(500).send("DB ERROR");
        }
    }
};

module.exports = AdminGradeController;
