const express = require("express");
const authController = require("./../controllers/authController");
const medInfoController = require("./../controllers/medInfoController");

const router = express.Router();

router.post(
  "/submitMedicals/:id",
  authController.protect,
  medInfoController.submitMedicals
);

module.exports = router;
