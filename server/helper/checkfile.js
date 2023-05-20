const fs = require("fs");

const checkFileUpdate = (data, req) => {
  if (data) {
    let fileName = data.dataValues.imageUrl;
    if (fileName) {
      const split = fileName.split("/").slice(0, -1).join("/") + "/";
      const split2 = fileName.split("/");
      fileName = split2[split2.length - 1];
      if (split === "http://localhost:3000/images/") {
        fs.unlinkSync(`./public/images/${fileName}`);
      }
    }
  } else {
    const fileName = req.file.filename;
    fs.unlinkSync(`./public/images/${fileName}`);
  }
};

const checkUserDelete = (data) => {
  if (temp !== null) {
    let fileName = temp.dataValues.imageUrl;
    const split = fileName.split("/");
    fileName = split[split.length - 1];
    if (fileName !== "portrait-placeholder.png") {
      let deletefile = fs.unlinkSync(`./public/images/${fileName}`);
    }
  }
}

const checkUpload = (tempImage,imageUrl) => {

  if (tempImage === 'images/portrait-placeholder.png'){
    return
  }
  if (tempImage !== imageUrl) {
    let fileName = tempImage;
    fs.unlinkSync(`./public/${fileName}`);
  }

}

const checkFileDelete = (data) => {
  if (data) {
    let fileName = data.dataValues.imageUrl;
    if (fileName) {
        fs.unlinkSync(`./public/${fileName}`);
    }
  }
};

const checkData = (req) => {
    const fileName = req.file.filename;
        fs.unlinkSync(`./public/images/${fileName}`);
}

module.exports = { checkFileUpdate, checkFileDelete, checkData, checkUpload, checkUserDelete };
