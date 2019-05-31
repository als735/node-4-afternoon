//responsible for adding items to a users cart and deleting items from their cart 

const swag = require("../models/swag"); 

module.exports = {
    add: (req, res) => {
        const {id} = req.params; // brings id in 
        let {user} = req.session; // checking which user it is in the session 

        //this will return -1 if it isn't in the cart 
        const index = user.cart.findIndex(swag => swag.id == id); 

        if (index === -1){ // if it isn't in the cart
            const selectedSwag = swag.find(swag => swag.id == id); //find the swag 

            user.cart.push(selectedSwag); //add to cart 
            user.total += selectedSwag.price; //increase price 
        }
        res.status(200).send(user); //if it is in the cart though just return the rquest sessions user object with a status of 200 
    }, 
    delete: (req, res) => {
        const {id} = req.params; 
        const {user} = req.session; 

        const index = user.cart.findIndex(swag => swag.id == id); // will return -1 if it isn't in the cart 
        const selectedSwag = swag.find(swag => swag.id == id); // find the swag 

        if(index !== -1) { // if its in the cart 
            user.cart.splice(index, 1); // remove from cart 
            user.total -= selectedSwag.price; //subtract price 
        }

        res.status(200).send(user); // if it isn't in the cart then do nothing to the cart and send status of 200 

    }, 
    checkout: (req, res) => {
        //responsible for resetting the value cart to an empty array and total to 0 when this method is hit 
        const {user} = req.session; 
        user.cart = []; 
        user.total = 0; 

        res.status(200).send(user); 

    }
}