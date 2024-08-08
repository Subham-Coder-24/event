const express = require("express");
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getAllCategories,
  createCategory,
  updateCategory,
} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.get("/categories", getAllCategories);
router.post("/categories", protect, isAdmin, createCategory);
router.put("/categories/:id", protect, isAdmin, updateCategory);

router.post("/", protect, isAdmin, createEvent);

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

module.exports = router;
