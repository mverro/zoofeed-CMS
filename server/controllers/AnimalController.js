const {
  classType,
  habitat,
  food,
  animal,
  animalFood,
  user,
  animalUser,
} = require("../models");
const {
  checkFileUpdate,
  checkFileDelete,
  checkData,
} = require("../helper/checkfile");
const { Op } = require("sequelize");

class AnimalController {
  static async getAnimal(req, res) {
    try {
      let result = await animal.findAll({
        include: [classType, habitat],
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async add(req, res) {
    try {
      const user = req.userData;
      if (user.roleId === 2) {
        const { name, age, sex, imageUrl, classTypeId, habitatId } = req.body;
        let result = await animal.create({
          name: name,
          age: +age,
          sex: sex,
          imageUrl: imageUrl,
          classTypeId: +classTypeId,
          habitatId: +habitatId,
        });

        res.status(201).json(result);
      } else {
        checkData(req);
        res.status(403).json({ message: "Please login as Zookeeper" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const user = req.userData;
      if (user.roleId === 2) {
        const id = +req.params.id;
        const temp = await animal.findByPk(id);
        checkFileDelete(temp);
        let resultAnimal = await animal.destroy({
          where: { id },
        });
        let resultAF = await animalFood.destroy({
          where: {
            animalId: id,
          },
        });

        resultAnimal === 1
          ? res.status(200).json({
              message: `Id ${id} has been Deleted!`,
            })
          : res.status(404).json({
              message: `id ${id} not found!'`,
            });
      } else {
        res.status(403).json({ message: "Please login as Zookeeper" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    try {
      const user = req.userData;
      if (user.roleId === 2) {
        const id = +req.params.id;
        const temp = await animal.findByPk(id);
        checkFileUpdate(temp, req);
        const { name, age, sex, imageUrl, classTypeId, habitatId } = req.body;
        const result = await animal.update(
          {
            name: name,
            age: +age,
            sex: sex,
            imageUrl: imageUrl,
            classTypeId: classTypeId,
            habitatId: +habitatId,
          },
          {
            where: { id },
          }
        );

        result[0] === 1
          ? res.status(200).json({
              message: `Id ${id} has been Updated!`,
            })
          : res.status(404).json({
              message: `Couldn't Update id:${id}.'`,
            });
      } else {
        checkData(req);
        res.status(403).json({ message: "Please login as Zookeeper" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAnimalDetail(req, res) {
    try {
      const id = +req.params.id;
      let result = await animalFood.findAll({
        where: {
          animalId: id,
        },
        include: [animal, food],
      });
      let resultAF = {};
      let foods = [];
      if (result.length === 0) {
        result = await animal.findByPk(id);
        resultAF = {
          ...result.dataValues,
          foods: foods,
        };
      } else {
        foods = result.map((el) => {
          return el.food.dataValues;
        });
        resultAF = {
          ...result[0].animal.dataValues,
          foods: foods,
        };
      }
      let classTypeData = await classType.findAll({
        where: {
          id: resultAF.classTypeId,
        },
      });
      let habitatData = await habitat.findAll({
        where: {
          id: resultAF.habitatId,
        },
      });
      res.status(200).json({
        resultAF,
        classTypeData,
        habitatData,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async findKeeper(req, res) {
    try {
      const id = +req.params.id;
      let result = await animal.findAll({ where: { id: id }, include: [user] });
      let dataUser = result[0].dataValues.users.map((el) => {
        delete el.dataValues.animalUser;
        delete el.dataValues.password;
        return el.dataValues;
      });

      let keeper = dataUser.filter((user) => user.roleId === 2);

      res.status(200).json(keeper);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async search(req, res) {
    try {
      const searchQuery = req.query.key;
      const results = await animal.findAll({
        where: {
          name: { [Op.iLike]: `%${searchQuery}%` },
        },
      });
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = AnimalController;
