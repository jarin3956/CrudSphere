const mongoose = require('mongoose')

const Admin = new mongoose.Schema({
    name:{ type:String , required:true },
    email:{ type:String , required:true , unique:true },
    password:{ type:String , required:true },
    quote: { type:String }
},
    { collection: 'admin-data' }    
)

const model = mongoose.model('adminData',Admin)

module.exports = model