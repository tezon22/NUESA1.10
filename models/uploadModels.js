const mongoose = require("mongoose")
const Schema = mongoose.Schema

const pdfSchema = new Schema({
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
  uploadedAt:{
    type: Date,
    default: Date.now()
  }
})

const admissionSchema = new Schema({
  title:{
    type: String
  },
  body:{
    type: String
  },
  uploadedAt:{
    type: Date,
    default: Date.now()
  }
})

const pdfModel = mongoose.model("pdfs", pdfSchema)
const admissionModel = mongoose.model("admissions", admissionSchema)

module.exports = {
  pdfs: pdfModel,
  admissions: admissionModel
}
