const {ticket,cartTicket,cart} = require('../models')
const {sequelize} = require('../models')

class CartTicketController{

    static async get(req,res){
        try{
            let result = await cartTicket.findAll({
            });
            res.status(200).json(result)

        }catch(err){
            res.status(500).json({message:err.message});
        }
    }

    static async create(req, res) {
        let transaction;
        try {
          transaction = await sequelize.transaction();
    
          let ticketId = req.body.ticketId;
          let qty = req.body.qty;
          let userId = req.userData.id;
    
          let createCart = await cart.create(
            {
              userId: +userId,
              qty: +qty,
            },
            { transaction }
          );
    
          let ticketStock = await ticket.decrement("stock", {
            by: +qty,
            where: { id: ticketId },
            transaction,
          });
    
          let cartId = createCart.id;
          let result = await cartTicket.create(
            {
              cartId: +cartId,
              ticketId: +ticketId,
            },
            { transaction }
          );
    
          await transaction.commit();
    
          res.status(200).json(result);
        } catch (err) {
          if (transaction) await transaction.rollback();
          res.status(500).json({ message: err.message });
        }
      }
    
      static async delete(req, res) {
        try {
          let id = req.params.id;
    
          let result = await cartTicket.destroy({
            where: { id: +id },
          });
    
          result === 1
            ? res.status(200).json({
                message: `Id ${id} has been Deleted!`,
              })
            : res.status(404).json({
                message: `id ${id} not found!'`,
              });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }
    


}

module.exports = CartTicketController;