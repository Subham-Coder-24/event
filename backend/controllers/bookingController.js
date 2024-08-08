const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createBooking = async (req, res) => {
  const { eventId, quantity } = req.body;
  const userId = req.user.id;
  try {
    // Fetch the event to get the price
    const event = await prisma.event.findUnique({
      where: { id: parseInt(eventId, 10) },
    });
    if (!event) return res.status(404).json({ error: "Event not found" });

    const total = event.price * quantity;

    const newBooking = await prisma.booking.create({
      data: {
        eventId: parseInt(eventId, 10),
        userId: parseInt(userId, 10),
        quantity: parseInt(quantity, 10),
        total,
      },
      include: {
        event: true,
        user: true,
      },
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};
// Get all bookings for a specific user
const getBookingsByUserId = async (req, res) => {
  const userId = parseInt(req.user.id, 10); // Assuming user ID is added to the request object by authentication middleware
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit, 10) || 5; // Default to limit 5 if not provided

  const offset = (page - 1) * limit;

  try {
    const totalBookings = await prisma.booking.count({
      where: { userId },
    });

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        event: true,
        user: true,
      },
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc", // Assuming you want to order by creation date, adjust as needed
      },
    });

    const totalPages = Math.ceil(totalBookings / limit);

    res.json({
      bookings,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// Get a single booking by ID
const getBookingById = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        event: true,
        user: true,
      },
    });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch booking" });
  }
};

module.exports = {
  createBooking,
  getBookingsByUserId,
  getBookingById,
};
