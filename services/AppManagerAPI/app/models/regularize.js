const mongoose = require('mongoose');
const type = mongoose.Schema;
var DateOnly = require('mongoose-dateonly')(mongoose);
const Schema = mongoose.Schema({ 
    emp_id: {
        type: String,           
    },    
    date: {
        type: DateOnly,
        default: Date.now ,
        required: true
    },
    checkin: {
       type:  Date
    },

    checkout: {
       type:  Date
    },
    reason:String,
    approveStatus:{type:Boolean,default:false}
});

mongoose.model('Regularize', Schema);