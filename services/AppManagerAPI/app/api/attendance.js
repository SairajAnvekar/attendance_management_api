const mongoose = require('mongoose');
const api = {};

api.getAll = (User, Attendance, Token) => (req, res) => {
  if (Token) {
    Attendance.find({}, (error, Attendance) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(Attendance);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.getByEmp = (User, Attendance, Token) => (req, res) => {
  if (Token) {
    Attendance.find({ emp_id: req.query.emp_id }, (error, Attendance) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(Attendance);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.store = (User, Attendance, Token) => (req, res) => {
  if (Token) {
    const attendance = new Attendance({
      emp_id: req.body.emp_id,
      date: req.body.date,
      in_time: req.body.in_time,
      out_time: req.body.out_time,
    });

    attendance.save((error, attendance)  => {
      if (error) return res.status(400).json(error);
      res.status(200).json({ success: true, attendance: attendance });
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

module.exports = api;
