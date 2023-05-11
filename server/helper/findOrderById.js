const{order,cart,ticket,food,ticketType} = require('../models')

async function findOrderById(orderId, t) {
    return await order.findAll(
      {
        where: { id: orderId },
        include: [
          {
            model: cart,
            include: [
              {
                model: food,
                required: false,
              },
              {
                model: ticket,
                include: [
                  {
                    model: ticketType,
                  },
                ],
                required: false,
              },
            ],
          },
        ],
      },
      { transaction : t}
    );
  }

  module.exports = {findOrderById}
  
    



