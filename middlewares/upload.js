const multer = require("multer");

const storage = multer.memoryStorage(); // nhận file & buffer base64
const upload = multer({ storage });

module.exports = upload;
