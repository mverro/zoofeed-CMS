const { user, role, animal } = require("../models");
const fs = require("fs");
const { decryptPwd } = require("../helper/encrypt");
const { tokenGenerator, tokenVerifier } = require("../helper/jsonwebtoken");

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
      const { name, age, email, imageUrl } = req.body;
      let result = await user.update(
        {
          name: name,
          age: +age,
          email: email,
          imageUrl: imageUrl,
        },
        { where: { id: id } }
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;

      const temp = await user.findByPk(id);
      if (temp !== null) {
        let fileName = temp.dataValues.imageUrl;
        const split = fileName.split("/");
        fileName = split[split.length - 1];
        if (fileName !== "portrait-placeholder.png") {
          let deletefile = fs.unlinkSync(`./public/images/${fileName}`);
        }
      }

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
