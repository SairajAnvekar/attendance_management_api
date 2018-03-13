const mongoose = require('mongoose');
const type = mongoose.Schema;
var DateOnly = require('mongoose-dateonly')(mongoose);
const Schema = mongoose.Schema({
  emp_id: {
    type: String,
    required: true
  },

  date: {
    type: DateOnly,
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