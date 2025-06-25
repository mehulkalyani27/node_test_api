const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: `Welcome, ${req.user.username}`,
    data: req.user,
  });
});

module.exports = router;