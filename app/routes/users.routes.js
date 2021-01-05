const authJwt = require("../middleware/authJwt.js");
// Dokumentasi API atau Routes API
module.exports = app => {
    const users = require("../controllers/users.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Users
    router.post("/signup", users.create);

    //Login user
    router.post("/login", users.login);

    //Change Password
    router.put("/change-password", authJwt.authenticateUser, users.changePassword);
  
    // Retrieve all Users
    router.get("/", users.findAll);
  
    // Retrieve a single Users with id
    router.get("/:id", users.findOne);
  
    // Update a Users with id
    router.put("/:id", users.update);
  
    // Delete a Users with id
    router.delete("/delete", authJwt.authenticateUser, users.delete);

    // Save news
    router.post("/save", users.saveNews);
    // Like news
    router.post("/like", users.likeNews);
    
    // Get user with News Saved
    router.get("/save/:id", users.getSavedUser)
  
    app.use('/api/users', router);
  };