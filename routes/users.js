const express = require("express");
const router = express.Router();
const Controller = require("../controllers/userController");
const passport = require("passport");

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.status(401).json({ message: "Not authenticated" });
    }
};
  
const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "admin" || req.user.role === "superuser") {
      return next();
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
};
  
const isSuperUser = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === "superuser") {
      return next();
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
}
  
  
//USER AUTHENTICATION
router.get("/users/logout", Controller.logout);
router.get("/auth/google", Controller.googleLogin);
router.get("/auth/google/callback", Controller.googleLoginHome);
router.post("/users/register", Controller.register);
router.post("/users/login", Controller.login);

//USER DETAILS
router.get("/users", isAuthenticated, isAdmin, Controller.getUsers);
router.get("/users/:id", isAuthenticated, isAdmin, Controller.getUser);
router.delete("/users", isAuthenticated, isAdmin, Controller.deleteUsers);
router.delete("/users/:id", isAuthenticated, isAdmin, Controller.deleteUser);

//USER PROMOTION
router.put("/users/:userId/promote", isAuthenticated, isSuperUser, Controller.promoteUser);

module.exports = router;