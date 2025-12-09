const db = require("../config/db");

// Placeholder: fetch users from device (not implemented yet)
async function fetchDeviceUsers() {
    return [];
}

// Placeholder: save persons fetched from device
async function saveDevicePersons() {
    return true;
}

// Placeholder: attempt to auto match students with device records
async function autoMatchStudents() {
    return 0;
}

module.exports = { 
    fetchDeviceUsers,
    saveDevicePersons,
    autoMatchStudents
};
