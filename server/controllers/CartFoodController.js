const {cartFood,cart,food} = require("../models");

class CartFoodController{

    static async get(req,res){
        try{
            let result = await cartFood.findAll({
            });
            res.status(200).json(result)

        }catch(err){
            res.status(500).json({message:err.message});
        }
    }

    static async create(req, res){
        try{
            
            let foodId = req.body.foodId;
            let qty = req.body.qty;
            let userId = req.userData.id;

            let createCart = await cart.create({
                userId: +userId,
                qty: +qty,
            })

            let foodStock = await food.decrement("stock",{
                by: +qty,
                where:{id: foodId}
            })

            let cartId = createCart.id;
            let result = await cartFood.create({
                cartId : +cartId,
                foodId : +foodId
            });

            res.status(200).json(result);

        }catch(err){
            res.status(500).json({message:err.message});
        }

    }

    static async delete(req,res){

        try{
            let id = req.params.id;
    
            let result = await cartFood.destroy({
                where: {id : +id}
            })

            result === 1
          ? res.status(200).json({
              message: `Id ${id} has been Deleted!`,
            })
          : res.status(404).json({
              message: `id ${id} not found!'`,
            });

        }catch(err){
            res.status(500).json({message:err.message});
        }

    }
    


}

module.exports = CartFoodController;