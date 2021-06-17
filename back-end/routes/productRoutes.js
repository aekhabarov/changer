const router = require("express").Router();

router.route("/").get(async (req, res) => {
  res.status(200);
});

module.exports = router;
