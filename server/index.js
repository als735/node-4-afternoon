require("dotenv").config(); 
const express = require("express");
const session = require("express-session"); 
const checkForSession = require("./middlewares/checkForSession"); // require our middleware 
const swagController = require("./controllers/swagController"); 
const authController = require("./controllers/authController"); 
const cartController = require("./controllers/cartController"); 
const searchController = require("./controllers/searchController"); 

const app = express(); // app is equal to express invoked 

let {SERVER_PORT, SESSION_SECRET} = process.env; //destructure form .env 

//Middleware 

app.use(express.json());// middleware so we can read JSON form the request body 
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true 
    })
); // session so we can create sessions -- 

app.use(checkForSession); // when using your own simple middleware you do not need to invoke it like you would json. 

//end of Middleware 

//////EndPoints 

//Auth endpoints 
app.post("/api/register", authController.register); 
app.post("/api/login", authController.login); 
app.post("/api/signout", authController.signout); 
app.get("/api/user", authController.getUser); 
//Swag endpoints 
app.get("/api/swag", swagController.read) // get endpoint that calls the read method on our controller 
//Cart endpoints 
app.post("/api/cart/checkout", cartController.checkout); 
app.post("/api/cart/:id", cartController.add); 
app.delete("/api/cart/:id", cartController.delete); 
// Search endpoints 
app.get("/api/search", searchController.search); 


app.listen(SERVER_PORT, () => {
    console.log(`Haunting on Host ${SERVER_PORT}.`); 
});  
