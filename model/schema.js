
const mongoose = require('mongoose');


const toDoSchema = new mongoose.Schema({
    purpose:{
        type:String,
        required:true
    },
    day:{
        type:Number,
        required:true
    },
    month:{
        type:Number,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    status:{
        
        type:String,
            enum:['Pending','Success','Failed']
    }

})

const TODO = mongoose.model('TODO',toDoSchema);

module.exports=TODO;