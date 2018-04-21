const mongoose = require('mongoose');
var  ObjectId = mongoose.Schema.ObjectId;
const Schema = mongoose.Schema({ 
    name: { 
        type: String ,
        unique: true
    },
    members:[{ type: String}],
    manager_id: ObjectId,
});

mongoose.model('Team', Schema);