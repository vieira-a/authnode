const router = require("express").Router();
const userController = require("../controllers/userController");

router
  .route("/user/register")
  .post((req, res) => userController.create(req, res));

router.route("/user/login").post((req, res) => userController.login(req, res));

router.route("/user").get((req, res) => {
  res.status(200).json({ msg: "Route user is OK" });
});

module.exports = router;
