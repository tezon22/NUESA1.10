const express = require('express')
const pdfRouter = express.Router()
const pdfModel = require("../models/pdfModel")

pdfRouter.post('/', async (req, res)=>{
  const {department, url, courseCode, courseTitle, title, size, level, thumbnail, keywords } = req.body

  if(!department || !url || !courseCode || !courseTitle || !title || !size || !level || !thumbnail || !keywords){
    res.status(401).json({message: "Please fill all fields"})
  }

  const pdf = await pdfModel.create({
    department, url, courseCode, courseTitle, title, size, level, thumbnail, keywords, uploadedAt: Date.now
  })

  if(pdf){
    res.status(200).json({message: "pdf uploaded"})
  }else if(!pdf){
    res.status(400).json({message: "pdf not uploaded"})
  }
})

module.exports = pdfRouter