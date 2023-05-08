const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadMulter = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
}).single("imageUrl");

let upload = (req, res, next) => {
  uploadMulter(req, res, function (err) {
    if (err) {
      return next(err);
    }
    if (!req.file) {
      req.body.imageUrl = "https://merritthealthcare.com/wp-content/uploads/2021/12/portrait-placeholder.png"
      return next();
    }
    let imageUrl =
      req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
    req.body.imageUrl = imageUrl;
    next();
  });
};

module.exports = {
  upload,
};
