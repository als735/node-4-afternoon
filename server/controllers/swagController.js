const swag = require('../models/swag'); 

module.exports = { 
    read: (req, res, next) => {  //export an object with a read method 
        res.status(200).send(swag); 
    }
}; 