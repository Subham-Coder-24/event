const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new event
const createEvent = async (req, res) => {
  const { name, description, date, location, price, img, categoryId } =
    req.body;
  try {
    const event = await prisma.event.create({
      data: {
        name,
        description,
        date: new Date(date),
        location,
        price: parseFloat(price),
        img,
        category: categoryId
          ? { connect: { id: parseInt(categoryId) } }
          : undefined,
      },
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  const { category, search } = req.query;

  try {
    const events = await prisma.event.findMany({
      where: {
        AND: [
          category ? { category: { name: category } } : {},
          search
            ? {
                OR: [
                  { name: { contains: search, mode: "insensitive" } },
                  { description: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
        ],
      },
      include: {
        category: true,
      },
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await prisma.event.findUnique({
      where: { id: parseInt(id) },
      include: { category: true },
    });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an event by ID
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, description, date, location, price, endTime, categoryId } =
    req.body;
  try {
    const event = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        date: date ? new Date(date) : undefined,
        endTime: new Date(endTime),
        location,
        price,
        category: categoryId ? { connect: { id: categoryId } } : undefined,
      },
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an event by ID
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.event.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params; // Get the category ID from the URL
  const { name } = req.body; // Get the new category name from the request body

  if (!name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
      },
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getAllCategories,
  createCategory,
  updateCategory,
};
