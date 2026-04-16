const express = require("express");
const {
  createOrder,
  verifyPayment,
  createCustomQuoteRequest
} = require("../controllers/paymentController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyPayment);
router.post("/custom-quote", protect, createCustomQuoteRequest);

module.exports = router;