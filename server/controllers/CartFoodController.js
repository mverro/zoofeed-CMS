const {cartFood,cart,food} = require("../models");

class CartFoodController{

    static async get(req,res){
        try{
            let result = await cartFood.findAll({
                include : [cart,food],
            });
            res.status(200).json(result)

        }catch(err){
            res.status(500).json({message:err.message});
        }
    }
    


}

module.exports = CartFoodController;