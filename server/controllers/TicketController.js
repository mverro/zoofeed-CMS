const { ticket, ticketType } = require("../models");

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
    try {
      const id = +req.body.id;
      const stock = +req.body.stock;
      let result = await ticket.update(
        {
          stock: stock,
        },
        { where: { id: id } }
      );
      result[0] === 1
        ? res.status(200).json({
            message: `Id ${id} has been Updated!`,
          })
        : res.status(404).json({
            message: `Couldn't Update id:${id}.'`,
          });
    } catch (err) {
      res.status(500).json({ mssage: err.message });
    }
  }
}

module.exports = TicketController;
