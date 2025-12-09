const Grade = require("../../models/Grade");

const GradeController = {
  async getAll(req, res) {
    try {
      const grades = await Grade.getAll();
      res.json({ success: true, data: grades });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async create(req, res) {
    try {
      const id = await Grade.create(req.body);
      res.json({ success: true, id });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      await Grade.update(req.params.id, req.body);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await Grade.delete(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = GradeController;
