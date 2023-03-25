
const mongoose  = require("mongoose")


const adminSchema   = new mongoose.Schema({
  
    username: {
      type: String,
      unique: true,
      requied: true,
       
       
      },
   
      name: {
        type: String,
       
        requied: true,
       
      },
      password: {
        type: String,
       
      },
   
      u_type: {
        type: String,
       
      },
      addedBy: {
        type: String,
       
      },
      addedBy_id: {
        type: String,
       
      },
      is_active: {
        type: Boolean,

       
      }
   

})

module.exports = mongoose.model('admin', adminSchema)

