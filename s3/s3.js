require("dotenv").config()
const S3 = require("aws-sdk/clients/s3");
const { promises } = require("dns");
const { createReadStream } = require("fs");

const s3 = new S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

const uploadFunc = async (filedetails) => {
    try {
        const actualFile = createReadStream(filedetails.path)

        const uploadedImage = s3.upload({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: filedetails.fileName,
            Body: actualFile,
        }).promise()

        return uploadedImage
    } catch (error) {
        return error
    }
}


const getImageFunc = async (fileDetails) => {
    try {
        const config = {
            Key: fileDetails,
            Bucket: process.env.AWS_S3_BUCKET_NAME
        }
        return s3.getObject(config).createReadStream()
    } catch (error) {
        return error
    }
}




module.exports = { uploadFunc , getImageFunc}