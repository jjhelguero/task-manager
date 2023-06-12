const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const multer = require('multer')

const app = express()
const port = process.env.PORT || 3000
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1_000_000,
  },
  fileFilter(req,file,cb) {
    console.log(`Attempting to upload ${file.originalname}`)
    if(!file.originalname.match(/\.(doc|docx)$/)) {
        return cb(new Error('Please upload a a Word document!'))
    }
    // return callback success
    console.log('Upload successful')
    cb(undefined, true)
  }
});

app.post('/upload',upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter);

app.listen(port, () => {
    console.log(`Server is on port ${port}`)
})