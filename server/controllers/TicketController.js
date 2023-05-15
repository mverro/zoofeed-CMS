const { ticket, ticketType, sequelize } = require("../models");

class TicketController {
  static async get(req, res) {
    try {
      let result = await ticket.findAll({
        include: [ticketType],
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ mssage: err.message });
    }
  }

  static async create(req, res) {
    try {
      const ticketTypeId = +req.body.ticketTypeId;
      const stock = +req.body.stock;

      let result = await ticket.create({
        ticketTypeId: ticketTypeId,
        stock: stock,
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ mssage: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      let result = await ticket.destroy({
        where: { id: id },
      });

      result === 1
        ? res.status(200).json({
            message: `Id ${id} has been Deleted!`,
          })
        : res.status(404).json({
            message: `id ${id} not found!'`,
          });
    } catch (err) {
      res.status(500).json({ mssage: err.message });
    }
  }

  static async updateStock(req, res) {
    const t = await sequelize.transaction();
    try {
      const id = +req.body.id;
      const stock = +req.body.stock;
      const price = +req.body.price;
      let result = await ticket.update(
        {
          stock: stock,
        },
        { where: { id: id } },
        { transaction: t }
      );

      let reusltType = await ticketType.update(
        {
          price: price,
        },
        { where: { id: id } },
        { transaction: t }
      );

      await t.commit();

      result[0] === 1
        ? res.status(200).json({
            message: `Id ${id} has been Updated!`,
          })
        : res.status(404).json({
            message: `Couldn't Update id:${id}.'`,
          });
    } catch (err) {
      await t.rollback();
      res.status(500).json({ mssage: err.message });
    }
  }

  static async getbyId(req, res) {
    const id = +req.params.id;
    try {
      let result = await ticket.findOne({
        where: { id: id },
        include: [ticketType],
      });

      res.status(200).json({ result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = TicketController;
