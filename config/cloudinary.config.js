// config/cloudinary.config.js

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dn5vbgf22",
  api_key: "719683833233233",
  api_secret: "W3Q9loGSQXpbm9TXa1RIBU_8rP0",
});

const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png"],
    folder: "movie-project", // The name of the folder in cloudinary
    // resource_type: 'raw' => this is in case you want to upload other type of files, not just images
  },
});

//                     storage: storage
module.exports = multer({ storage });
