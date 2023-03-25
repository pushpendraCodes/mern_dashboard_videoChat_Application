

const mongoose = require('mongoose');
const env = require("dotenv")
env.config()

mongoose.connect(process.env.REACT_DB_URL)
  .then(() =>  console.log('Connected!'));


