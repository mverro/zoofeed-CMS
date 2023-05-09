const {ticket,cartTicket,cart} = require('../models')


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
    


}

module.exports = CartTicketController;