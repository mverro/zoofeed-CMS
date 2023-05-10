const { cart, sequelize, order,food,ticket,ticketType } = require("../models");

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
    try {
      let createOrder = await order.create({transaction: t});
      const orderId = createOrder.id;
      

      for (const d of data) {
        const instance = await cart.update(
          {
            orderId: orderId,
          },
          { where : {id : d.cartId}},
          { transaction: t }
        );
        result.push(instance);
      }

      const orders = await order.findAll({
        include: [
          {
            model: cart,
            include: [
              {
                model: food,
                required: false 
              },
              {
                model: ticket,
                include: [
                  {
                    model: ticketType
                  }
                ],
                required: false 
              }
            ]
          }
        ]
      },{ transaction: t });

      const orderCart = orders[0].dataValues.carts;
      let total = 0;

      for (const order of orderCart) {
        let Carts = order.dataValues
        if (Carts.food.length !== 0) { 
          let foods = Carts.food[0].dataValues
          total += Carts.qty * foods.price;
        } else{ 
          let tickets = Carts.tickets[0].dataValues
          let ticketsType = tickets.ticketType.dataValues
          total += Carts.qty * ticketsType.price;
        }
      }

      const resultOrder = await order.update({ total: total },{where: {id : orderId} },{ transaction: t });

      await t.commit();

      res.status(200).json({
        message: `${result.length} entities have been created successfully!`,
        entities: resultOrder,
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
