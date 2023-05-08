const { animal, user, animalUser } = require("../models");

class AnimalUserController {
  static async get(req, res) {
    try {
      let result = await animalUser.findAll({
        include: [animal, user],
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async add(req, res) {
    try {
      const { animalId } = req.body;
      let userId = req.userData.id;
      let roleId = req.userData.roleId;
      if (roleId === 1) {
        let resultLike = await animal.increment("like", {
          by: 1,
          where: { id: +animalId },
        });
      }


      let result = await animalUser.create({
        userId: +userId,
        animalId: +animalId
      })

      res.status(200).json(result)
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const animalId = +req.params.id
      let userId = req.userData.id;
      let roleId = req.userData.roleId;

      if (roleId === 1) {
        let resultLike = await animal.decrement("like", {
          by: 1,
          where: { id: +animalId },
        });
      }

      let result = await animalUser.destroy({
        where: {
          userId: userId,
          animalId: animalId,
        },
      });

      res.status(200).json({ message: "deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async info(req, res) {
    try {
      let userId = req.userData.id;
      let result = await animalUser.findAll({
        where: {
          userId: userId,
        },
        include: [user, animal],
      });
      let resultUA = {};
      let animals = [];
      if (result.length === 0) {
        result = await user.findByPk(userId);
        resultUA = {
          ...result.dataValues,
          animals: animals,
        };
      } else {
        animals = result.map((el) => {
          return el.animal.dataValues;
        });
        resultUA = {
          ...result[0].user.dataValues,
          animals: animals,
        };
      }
      res.status(200).json({
        resultUA: resultUA,
      });
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = AnimalUserController;
