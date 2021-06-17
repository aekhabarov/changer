const router = require("express").Router();
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");
const authMidlleware = require("../midllewares/auth-midlleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMidlleware, userController.getUsers);

module.exports = router;
