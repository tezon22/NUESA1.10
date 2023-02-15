const express = require("express");
const router = express.Router();
const Controller = require("../controllers/userController");

router.get("/logout", Controller.logout);
router.get("/auth/google", Controller.googleLogin);
router.get("/auth/google/callback", Controller.googleLoginHome);
router.post("/register", Controller.register);
router.post("/login", Controller.login);


module.exports = router;