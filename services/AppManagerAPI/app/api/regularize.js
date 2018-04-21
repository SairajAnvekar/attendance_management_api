const mongoose = require('mongoose'),
      jwt = require('jsonwebtoken'),
      config = require('@config');

      const api = {};

api.getAll = (Regularize, Token) => (req, res) => {
  if (Token) {
    Regularize.find({}, (error, Regularize) => {
      if (error) return res.status(400).json(error);
      res.status(200).json(Regularize);
      return true;
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });
}

api.save =(Regularize, Token) => (req, res) =>{
  if (Token) {
     const regularize = new Regularize({
          emp_id: req.body.emp_id,
          date: req.body.date,
          checkin:req.body.in_time,
          checkout:req.body.out_time

        });
        
        regularize.save((error, regularize)  => {
            if (error) return res.status(400).json(error);
            res.status(200).json({ success: true, regularize: regularize });
        })    
  }
}
module.exports = api;