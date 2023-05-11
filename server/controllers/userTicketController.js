const { user, ticketType, userTicket } = require("../models");

class UserTicketController {
  static async get(req, res) {
    try {
      let result = await userTicket.findAll({
        include: [user, ticketType],
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ mssage: err.message });
    }
  }

  static async getbyUser(req, res) {
    const userId = +req.userData.id;

    try {
      let result = await userTicket.findAll({
        include: [ticketType],
        where: { userId: +userId },
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ mssage: err.message });
    }
  }

  static async update(req, res) {
    const roleId = req.userData.roleId;
    const id = req.body.id;
    try {
      if (roleId === 1) {
        res.status(403).json({ message: "Please login as Zookeeper" });
      }
      const result = await userTicket.update(
        {
            status : true
        },
        {
          where: { id },
        }
      );

      result[0] === 1
        ? res.status(200).json({
            message: `Id ${id} has entered into Zoo`,
          })
        : res.status(404).json({
            message: `Cant found id:${id}.'`,
          });
    } catch (err) {
      res.status(500).json({ mssage: err.message });
    }
  }
}

module.exports = UserTicketController;
