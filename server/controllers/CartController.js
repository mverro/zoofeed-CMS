const { food, ticket, cart, cartFood, cartTicket,ticketType } = require("../models");
const {sequelize} = require("../models");

class CartController {

  static async getCart(req, res) {
    const userId = req.userData.id;
    try {
      let result = await cart.findAll({
        include: [
          {
            model: food,
          },
          {
            model: ticket,
            include: [ticketType], 
          },
        ],
        where: { userId: +userId },
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
    const id = +req.params.id;
    const userId = +req.userData.id;
  
    try {
      await sequelize.transaction(async (t) => {
        const getCart = await cart.findOne({
          include: [food, ticket],
          where: { id, userId },
          transaction: t,
        });
  
        if (!getCart) {
          return res.status(404).json({
            message: `Cart with id ${id} not found!`,
          });
        }
        
        const isTicket = getCart.dataValues.tickets.length;
  
        if (isTicket) {
          
          const ticketData = getCart.tickets[0].dataValues;
          const ticketId = +ticketData.id;
          const qty = +getCart.qty;
  
          await ticket.increment("stock", {
            by: qty,
            where: { id: ticketId },
            transaction: t,
          });
  
          await cartTicket.destroy({
            where: { cartId: id },
            transaction: t,
          });

        } else {
          
          console.log({masuk : 111})
          const foodData = getCart.food[0].dataValues;
          const foodId = +foodData.id;
          const qty = +getCart.qty;
  
          await food.increment("stock", {
            by: qty,
            where: { id: foodId },
            transaction: t,
          });
  
          await cartFood.destroy({
            where: { cartId: id },
            transaction: t,
          });
        }
  
        await cart.destroy({
          where: { id },
          transaction: t,
        });
  
        return res.status(200).json({
          message: `Cart with id ${id} has been deleted!`,
        });
      });
    } catch (err) {
      return res.status(500).json({
        message: `Error deleting cart with id ${id}: ${err.message}`,
      });
    }
  }


  static async update(req, res) {
    try {
      let qty = +req.body.qty;
      let id = +req.body.id;

      let result = await cart.update(
        {
          qty: +qty,
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
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = CartController;
