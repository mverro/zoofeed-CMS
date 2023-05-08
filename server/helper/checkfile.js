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

const checkFileDelete = (data) => {
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
  }
};

const checkData = (req) => {
    const fileName = req.file.filename;
        fs.unlinkSync(`./public/images/${fileName}`);
}

module.exports = { checkFileUpdate, checkFileDelete, checkData };
