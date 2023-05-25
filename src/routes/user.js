const router = require("express").Router();

router.route("/user").get((req, res) => {
  res.status(200).json({ msg: "Route user is OK" });
});

module.exports = router;
