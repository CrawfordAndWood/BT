//configure storage
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: async (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Allowed only .png, .jpg, .jpeg and .gif"));
    }
  },
});

const uploadImage = () => {
  return upload.any("image");
};

module.exports = uploadImage;
