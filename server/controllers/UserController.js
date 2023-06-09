const { user, role, animal,sequelize } = require("../models");
const fs = require("fs");
const { decryptPwd } = require("../helper/encrypt");
const { tokenGenerator } = require("../helper/jsonwebtoken");
const {
  checkUpload,checkUserDelete
} = require("../helper/checkfile");

class UserController {
  static async getUsers(req, res) {
    try {
      let users = await user.findAll();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async createUser(req, res) {
    try {
      const { name, age, email, password, roleId } = req.body;
      let result = await user.create({
        name: name,
        age: +age,
        email: email,
        password: password,
        roleId: +roleId,
      });

      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {

    try {
      const id = +req.params.id;
      const temp = await user.findByPk(id);
      const tempImage = temp.imageUrl;
      const { name, age, email, imageUrl } = req.body;

      let result = await user.update(
        {
          name: name,
          age: +age,
          email: email,
          imageUrl: imageUrl,
        },
        { where: { id: id }}
      );
  
      let emailFound = await user.findOne({ where: { id: id }});
      checkUpload(tempImage, imageUrl); 
  
      let access_token = tokenGenerator(emailFound);
  
      res.status(200).json({
        access_token: access_token,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  

  static async delete(req, res) {
    try {
      const id = +req.params.id;

      const temp = await user.findByPk(id);
      checkUserDelete(temp);
      let result = await user.destroy({
        where: { id: id },
      });
      result === 1
        ? res.status(200).json({ message: `id ${id} has been deleted` })
        : res.status(404).json({ message: `id ${id} not found!` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAccount(req, res) {
    try {
      let result = req.userData;
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let emailFound = await user.findOne({ where: { email: email } });

      if (emailFound) {
        if (decryptPwd(password, emailFound.password)) {
          let access_token = tokenGenerator(emailFound);
          res.status(200).json({
            access_token: access_token,
          });
        } else {
          res.status(403).json({ message: "invalid password" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = UserController;
