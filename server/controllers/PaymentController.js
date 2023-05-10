const { user, sequelize, order, payment } = require("../models");

class PaymentController {
  static async get(req, res) {
    try {
      let result = await payment.findAll({
        include: [user, order],
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ mssage: err.message });
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

  static async create(req,res){
    try{
        

    }catch(err){
        res.status(500).json({ mssage: err.message });

    }
  }

}

module.exports = PaymentController;
