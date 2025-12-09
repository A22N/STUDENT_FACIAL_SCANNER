const Device = require("../../models/Device");

const AdminDeviceController = {
    async index(req, res) {
        const devices = await Device.getAll();
        res.render("admin/device/index", {
            devices,
            active: "device"
        });
    },

    async addForm(req, res) {
        res.render("admin/device/add", {
            active: "device"
        });
    },

    async editForm(req, res) {
        const { id } = req.params;
        const device = await Device.getById(id);

        res.render("admin/device/edit", {
            device,
            active: "device"
        });
    }
};

module.exports = AdminDeviceController;
