const {
  cart,
  sequelize,
  order,
  food,
  ticket,
  ticketType,
  payment
} = require("../models");
const {findOrderById} = require('../helper/findOrderById')

class OrderController {
  static async get(req, res) {
    try {
      let result = await order.findAll({
        include: [cart],
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ mssage: err.message });
    }
  }

  static async create(req, res) {
    const data = req.body.data;
    const result = [];
    const t = await sequelize.transaction();
    const userId = +req.userData.id
    try {
      let createOrder = await order.create({ transaction: t });
      const orderId = +createOrder.id;

      for (const d of data) {
        const instance = await cart.update(
          {
            orderId: orderId,
            status : true
          },
          { where: { id: d.cartId } },
          { transaction: t }
        );
        result.push(instance);
      }

      const orders = await findOrderById(orderId, t);
      let orderCart = await orders[0].dataValues.carts;
      let total = 0;

      for (let order of orderCart) {
        let Carts = await order.dataValues;
        if (Carts.food.length !== 0) {
          let foods = await Carts.food[0].dataValues;
          total += (await Carts.qty) * foods.price;
          console.log(total);
        } else {
          let tickets = await Carts.tickets[0].dataValues;
          let ticketsType = await tickets.ticketType.dataValues;
          total += (await Carts.qty) * ticketsType.price;
        }
      }

      const resultOrder = await order.update(
        { total: total },
        { where: { id: orderId } },
        { transaction: t }
      );

      const initpayment = await payment.create({
        userId : userId,
        orderId : orderId,
        total : total,
      },{transaction:t})

      await t.commit();

      res.status(200).json({
        message: `${result.length} entities have been created successfully!`,
      });
    } catch (err) {
      await t.rollback();
      res.status(500).json({ mssage: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;

      let result = await order.destroy({
        where: {
          id: id,
        },
      });

      result === 1
        ? res.status(200).json({
            message: `Id ${id} has been Deleted!`,
          })
        : res.status(404).json({
            message: `Couldn't delete id:${id}.'`,
          });
    } catch (err) {
      res.status(500).json({ mssage: err.message });
    }
  }
}

module.exports = OrderController;
