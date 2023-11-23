const mongoose  = require('mongoose');
require('dotenv').config();
// console.log(process.env.MONGODB_URI);


const connection = mongoose.connect(process.env.MONGODB_URL)

module.connect={connection}