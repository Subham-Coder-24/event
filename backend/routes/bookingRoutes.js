const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookingsByUserId,
  getBookingById,
} = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createBooking);
router.get("/", protect, getBookingsByUserId); // This route is protected

router.get("/:id", protect, getBookingById);

module.exports = router;
