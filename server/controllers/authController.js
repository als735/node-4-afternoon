// responsible for logging users in/registering/siging out/retrieving user info 

const users = require("../models/users"); 

let id = 1; 

module.exports = {
    register: (req, res) => {
        const {session} = req; // sessions allow us to figure out whose talking to us from the request 
        const {username, password} = req.body; // looks for username and password on request body and then creates a user object 
        users.push({id, username, password}); // pushing the new user object to the users array 
        id++; // increments by the value of id so we can keep the value of id unique. 
        session.user.username = username; // sets the value of username on the request session's user object to be the value of username from the req body 
        res.status(200).send(session.user); // returns the updated user object with a status of 200 
    }, 
    login: (req, res) => {
        const {session} = req; 
        const {username, password} = req.body; 

        const user = users.find(user => user.username === username && user.password === password);
// This method should use username and password from the request body to find a user object in the users array with the same user/pass combination. 
        if (user) {
          session.user.username = user.username;
          res.status(200).send(session.user);
        } else {
          res.status(500).send('Unauthorized.');
        }
// If it finds a user with that combination, it should update the value of username on the request session's user object to value of username from the request body. It should then send a status of 200 with the updated user object. If it doesn't find a user it should send a status of 500.
    }, 
    signout: (req, res) => {
        req.session.destroy();
        res.status(200).send(req.session);
// his method is responsible for destroying the session and returning the session (which should be undefined at that point).
    }, 
    getUser: (req, res) => {
        const { session } = req;
        res.status(200).send(session.user);
    }
// This method is responsible for reading the user object off of session and return it with a status of 200.
}; 