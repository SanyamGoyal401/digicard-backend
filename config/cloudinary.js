const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const {cloud_name, api_key, api_secret} = require('./server')

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'business_images',
    allowedFormats: ['jpg', 'png', 'jpeg']
  }
});

module.exports = { cloudinary, storage };