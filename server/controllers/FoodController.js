const { food, animal, animalFood } = require("../models");
const {
  checkFileUpdate,
  checkFileDelete,
  checkData,
} = require("../helper/checkfile");
const { Op } = require('sequelize');

class FoodController {
  static async getFood(req, res) {
    try {
      let result = await food.findAll({
        include: [animal],
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async add(req, res) {
    try {
      const roleId = req.userData.roleId;
      if (roleId === 2) {
        const { name, type, imageUrl } = req.body;
        let resultfood = await food.create({
          name,
          type,
          imageUrl,
        });

        res.status(201).json(resultfood);
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
      const roleId = req.userData.roleId;
      if (roleId === 2) {
        const id = +req.params.id;
        const temp = await food.findByPk(id);
        checkFileDelete(temp);
        let resultfood = await food.destroy({
          where: { id },
        });

        let resultAF = await animalFood.destroy({
          where: {
            foodId: id,
          },
        });

        resultfood === 1
          ? res.status(200).json({
              message: `Id ${id} has been Deleted!`,
            })
          : res.status(404).json({
              message: `Couldn't delete id:${id}.'`,
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
      const roleId = req.userData.roleId;
      if (roleId === 2) {
        const id = +req.params.id;
        const temp = await food.findByPk(id);
        checkFileUpdate(temp, req);
        const { name, type, imageUrl } = req.body;
        const result = await food.update(
          {
            name: name,
            type: type,
            imageUrl: imageUrl,
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

  static async getFoodDetail(req, res) {
    try {
      const id = +req.params.id;
      let result = await animalFood.findAll({
        where: {
          foodId: id,
        },
        include: [animal, food],
      });
      let resultAF = {};
      let animals = [];
      if (result.length === 0) {
        result = await food.findByPk(id);
        resultAF = {
          ...result.dataValues,
          animals: animals,
        };
      } else {
        animals = result.map((el) => {
          return el.animal.dataValues;
        });
        resultAF = {
          ...result[0].food.dataValues,
          animals: animals,
        };
      }

      let consumed = resultAF.animals.map((animal) => {
        return animal;
      });

      res.status(200).json({ resultAF, consumed });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async search(req, res) {
    try {
      const searchQuery = req.query.key;
      const results = await food.findAll({
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

module.exports = FoodController;
