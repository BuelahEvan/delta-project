const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');  //https://www.npmjs.com/package/multer-storage-cloudinary

cloudinary.config({        //THESE ARE ENV VARIABLES
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});
                //CloudinaryStorage means like in googledrive creating new folder in that we r uploading files
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowedFormats: ["png","jpg","jpeg"]
  },
});

module.exports={
    cloudinary,
    storage,
}