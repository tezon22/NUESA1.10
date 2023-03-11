const express = require('express')
const uploadRouter = express.Router()
const {pdfs, admissions} = require("../models/uploadModels")

uploadRouter.post('/uploadPdf', async (req, res)=>{
  const {department, url, courseCode, courseTitle, title, size, level, thumbnail, keywords } = req.body

  if(!department || !url || !courseCode || !courseTitle || !title || !size || !level || !thumbnail || !keywords){
    res.status(401).json({message: "Please fill all fields"})
  }
  try{
    const pdf = await pdfs.create({
      department, url, courseCode, courseTitle, title, size, level, thumbnail, keywords
    })
    
    if(pdf){
      res.status(200).json({message: "pdf uploaded"})
    }
  }catch(err){
    res.status(400).json({message: "pdf not uploaded", error: `${err}`})
  }
})

uploadRouter.get("/uploadAdmission", async (req, res)=>{
  const allAdmissionInfo = await admissions.find()

  if(allAdmissionInfo){
   res.status(200).json(allAdmissionInfo)
  }else{
    res.status(500).json({mesage: "internal server error"})
  }
})

uploadRouter.post("/uploadAdmission", async (req, res) => {
  const { title, body } = req.body
  
  if(!title || !body){
    res.status(401).json({message: "Please fill all fields"})
  }

  try{
    const admissionInfo = admissions.create({title, body})

    if(admissionInfo){
      res.status(200).json({message: "admissionInfo uploaded"})
    }

  }catch(err){
    res.status(400).json({message: "admissionInfo not uploaded", error: `${err}`})
  }
})

module.exports = uploadRouter