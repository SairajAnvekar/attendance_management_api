const mongoose = require('mongoose'),
      UserModel = require('@AppManagerModels/user');
      AttendenceModel = require('@AppManagerModels/attendance');
const models = {
  User: mongoose.model('User'),
  Attendance: mongoose.model('Attendance'),
}
module.exports = models;