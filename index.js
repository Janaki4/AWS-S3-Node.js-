'use strict';

const express = require('express')
const app = express()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
app.use(express.json())
const { uploadFunc, getImageFunc } = require("./s3/s3")

app.post("/upload/image", upload.single('img'), async (req, res) => {
    try {
        const fileDetails = req.file
        const uploadedresult = await uploadFunc({ path: fileDetails.path, fileName: fileDetails.filename })
        // const uploadedresult = await uploadFunc({path:'uploads\\Faker.png' , fileName:"abs"})
        console.log(req.file, uploadedresult)
        res.status(200).send(uploadedresult.key)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/image/:id', async (req, res) => {
    try {
        const imageFromS3 = await getImageFunc(req.params.id)
        // this will automatically pipe the data into res or wherever we are pipiing as it is coming as a stream . Stream will get data as chucks.
        imageFromS3.pipe(res)
        // res.status(200).json(imageFromS3)
    } catch (error) {
        res.status(400).send(error)
    }
})


app.listen(3000, (port) => {
    console.log(3000)
})