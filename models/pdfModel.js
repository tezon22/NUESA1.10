const mongoose = require("mongoose")
const Schema = mongoose.Schema

const pdf = new Schema({
  department:{
    type: String
  },
  url:{
    type: String
  },
  courseCode:{
    type: String
  },
  courseTitle:{
    type: String
  },
  title:{
    type: String
  },
  size:{
    type: Number
  },
  level:{
    type: String
  },
  thumbnail:{
    type: String
  },
  keywords:{
    type: String
  },
  uplodedAt: {
    type: Date, 
    default: Date.now 
  }
})

module.exports = mongoose.model("pdfs", pdf)