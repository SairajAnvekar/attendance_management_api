const mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('@config');
const moment = require('moment');

const api = {};

function querryBuilder(model, filter) {

  var props = Object.keys(model.schema.paths);
  console.log(props);
  return 'test';
}
api.getAll = (Leave, Token) => (req, res) => {
  if (Token) {
    const querry = {};
    const emp_id = req.query.emp_id;
    if (emp_id) {
      querry = {
        emp_id: emp_id
      };
    }


    Leave.aggregate([{
      $lookup: {
        from: "users",
        localField: "emp_id",
        foreignField: "_id",
        as: "users"
      }
    }, {
      $unwind: "$users"
    }, {
      $project: {
        "_id": 1,
        "start_date": 1,
        "end_date": 1,
        "approveStatus": 1,
        "desc": 1,
        "username": "$users.username",
        "emp_no": "$users.emp_id",
        "email": "$users.email",
      },

    }]).exec((error, leave) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(leave);
      return true;
    });

  } else return res.status(403).send({
    success: false,
    message: 'Unauthorized'
  });
}

api.save = (Leave, User, Token) => (req, res) => {
  if (Token) {
    console.log(req.body);
    User.findOne({
      _id: req.body.emp_id
    }, (error, user) => {
      console.log(user);
      if (error) return res.status(400).json(error);
      const leaves = moment(req.body.end_date).diff(moment(req.body.start_date), 'days') + 1;
      if (user.leaves.privilege > leaves) {
        const leave = new Leave({
          emp_id: req.body.emp_id,
          start_date: moment(req.body.start_date).format('MM/DD/YYYY'),
          end_date: moment(req.body.end_date).format('MM/DD/YYYY'),
          desc: req.body.desc
        });
        leave.save((error, leave) => {
          if (error) return res.status(400).json(error);
          res.status(200).json({
            success: true,
            leave: leave
          });
        });
      } else return res.status(403).send({
        success: false,
        message: 'Do dont have leaves in your account'
      });
    });
  } else return res.status(403).send({
    success: false,
    message: 'Unauthorized'
  });
}
module.exports = api;