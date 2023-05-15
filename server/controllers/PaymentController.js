const { user, sequelize, order, payment, userTicket } = require("../models");
const qr = require("qrcode");
const { findOrderById } = require("../helper/findOrderById");
const { generateQRCode } = require("../helper/generateQRCode");
const { Op } = require('sequelize');


class PaymentController {
  static async get(req, res) {
    try {
      let result = await payment.findAll({
        include: [user, order],
        order: [ ['status', 'ASC'],['id', 'ASC']]
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ mssage: err.message });
    }
  }

  static async getFiltered(req, res) {
    try {
      const { userName } = req.query;

      const result = await payment.findAll({
        include: [
          { model: user },
          { model: order },
        ],
        order: [ ['status', 'ASC'],['id', 'ASC']],
        where: { '$user.name$': { [Op.like]: `%${userName}%` } }
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getbyUser(req, res) {
    const userId = +req.userData.id;

    try {
      let result = await payment.findAll({
        include: [user, order],
        where: { userId: +userId },
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ mssage: err.message });
    }
  }

  static async update(req, res) {
    const t = await sequelize.transaction();
    try {
      
      const method = req.body.method;
      const orderId = +req.body.orderId;

      const result = await payment.update(
        {
          method: method,
          status: true,
        },
        { where: { orderId: orderId } },
        { transaction: t }
      );

      const orders = await findOrderById(orderId, t);
      let orderCart = await orders[0].dataValues.carts;

      for (let order of orderCart) {
        let Carts = await order.dataValues;
        if (Carts.tickets.length !== 0) {
          let userId = Carts.userId;
          let qty = +Carts.qty;
          for (let i = 0; i < qty; i++) {
            let ticketTypeId = Carts.tickets[0].dataValues.ticketTypeId;
            let createTicket = await userTicket.create(
              {
                userId: +userId,
                ticketTypeId: +ticketTypeId,
              },
              { transaction: t }
            );
            const userTicketid = +createTicket.id;
            const data = createTicket.dataValues;
            const barcode = await generateQRCode(
              data,
              userId,
              orderId,
              ticketTypeId
            );
            const ticketQR = await userTicket.update(
              { barcode: barcode },
              { where: { id: userTicketid }, transaction: t }
            );
          }
        }
      }

      await t.commit();
      if (result[0] === 1) {
        res
          .status(200)
          .json({ message: `order id:${orderId} payment successfully!` });
      } else {
        res.status(404).json({ message: `order id:${orderId} not found!` });
      }
    } catch (err) {
      await t.rollback();
      res.status(500).json({ mssage: err.message });
    }
  }
}

module.exports = PaymentController;
