
const mongoose  = require("mongoose")


const chatSchema   = new mongoose.Schema({
  
  
      chat_host: {
        type: String,
      
      
       
       
      },
      user_type: {
        type: String,
       
      },
      chat_members_id: {
        type: Array,
       
      },
      chat_members_name: {
        type: Array,
       
      },
      
      is_active: {
        type: Boolean,
       
      },
      chat_host_id: {
        type: String,
       
      },
   
      chat_url: {
        type: String,
       
      }
    
   

})

module.exports = mongoose.model('create_Chat', chatSchema)

