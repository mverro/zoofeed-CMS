const { where } = require("sequelize");
const { user, food, ticket, cart } = require("../models");

class CartController {
  static async getCart(req, res) {
    try {
      let result = await cart.findAll({
        include: [user, food, ticket],
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async create(req, res) {
    try {
      let user = req.userData;
      let userId = user.id;

      let result = await cart.create({
        userId: +userId,
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delete(req, res) {
    try{
        const id = +req.params.id;
        let result = await cart.destroy({
            where: { id },
          });

          result === 1
          ? res.status(200).json({
              message: `Id ${id} has been Deleted!`,
            })
          : res.status(404).json({
              message: `id ${id} not found!'`,
            });

    }catch (err) {
        res.status(500).json({ message: err.message });
    }

  }

  static async update(req,res){
    try{

        let qty = +req.body.qty;
        let id = +req.body.id;

        let result = await cart.update({
            qty : +qty
          },
          {
            where: { id },
          });

        result[0] === 1
          ? res.status(200).json({
              message: `Id ${id} has been Updated!`,
            })
          : res.status(404).json({
              message: `Couldn't Update id:${id}.'`,
            });

    }catch(err){
        res.status(500).json({ message: err.message });

    }
  }


}

module.exports = CartController;
