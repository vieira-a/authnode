const router = require("express").Router();
const userController = require("../controllers/userController");
const checkToken = require("../middleware/authMiddleware");

router
  .route("/user/register")
  .post((req, res) => userController.create(req, res));

router.route("/user/login").post((req, res) => userController.login(req, res));

router
  .route("/user/:id")
  .get(checkToken, (req, res) => userController.getById(req, res));

module.exports = router;
