const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  emp_id: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now ,
    required: true
  },

  in_time: {
    type: Date,
    timestamps: true,
     default: Date.now    
  },

  out_time: {
    type: Date,
    timestamps: true   
  },

  marked: {
    type: Boolean,  
  },  

});

mongoose.model('Attendance', Schema);