module.exports = function(req, res, next) {
    const { session } = req;  //destructuring session 
  
    if (!session.user) {  //does the session have a user object? 
      session.user = { 
          username: "", 
          cart: [], 
          total: 0 
        };  // if it doesn't exist add a user object to the session 
    }
  
    next(); //calling next after allows the reuquest to reach the endpoint 
  };





