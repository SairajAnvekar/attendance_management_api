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
     console.log("req.query.emp_id");
    console.log(req.query);
    Attendance.find({ emp_id: req.query.emp_id }, (error, Attendance) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(Attendance);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.checkAttendance = (Attendance, Token) => (req, res) => {
  if (Token) {     
      Attendance.find({ emp_id: req.query.emp_id, date : Date.now() }, (error, Attendance) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(Attendance);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}


api.store = (User, Attendance, Token) => (req, res) => {
  if (Token) {

    Attendance.find({ date : Date.now() }, (error, attendance) => {
      if(attendance.length < 1){
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

      }
      else{
        res.status(200).json({ success: true, message: "attendance is allready  added" })
      }
    });    
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.edit = (User, Attendance, Token) => (req, res) => {
  if (Token) {  
  const emp_id = req.query.emp_id;
   Attendance.findOneAndUpdate({ emp_id: emp_id }, req.body, (error, attendance) => {
          if (error) res.status(400).json(error);
          res.status(200).json(attendance);
        })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.checkout = (User, Attendance, Token) => (req, res) => {
  if (Token) {
  const emp_id = req.body.emp_id; 
  const attendance_id = req.body.attendance_id;   
   Attendance.findOneAndUpdate({ emp_id: emp_id, _id: attendance_id }, {out_time : Date.now()}, (error, attendance) => {
          if (error) res.status(400).json(error);
          res.status(200).json(attendance);
        })   
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

module.exports = api;
