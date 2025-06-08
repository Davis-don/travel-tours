import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import clientRoutes from './routes/Clientroute.js';
import bookingRoutes from './routes/Bookingroutes.js';
import employeeRoutes from './routes/Employeeroutes.js'
import planRoutes from './routes/planroute.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

// ✅ Correct and complete CORS setup
app.use(cors({
  //  origin: "https://travel-tours-client.onrender.com",
    origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: true,
  optionsSuccessStatus: 200,
}));

// ✅ Enable JSON parsing
app.use(express.json());

// ✅ Register routes
app.use('/client', clientRoutes);
app.use('/booking', bookingRoutes);
app.use('/employee', employeeRoutes);
app.use('/plans', planRoutes)

app.get("/", (_req, res) => {
  res.send("server running");
});

// Delete accommodation by ID
const router = express.Router();
const client = new PrismaClient();

router.delete('/delete-accommodation-by-id', async (req, res) => {
  const { id } = req.query;

  // ✅ Validate ID presence
  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  try {
    // ✅ Fetch accommodation to get the publicId
    const accommodation = await client.accommodation.findUnique({
      where: { id: String(id) },
      select: { publicId: true }
    });

    if (!accommodation) {
      return res.status(404).json({ message: `Accommodation with id ${id} not found.` });
    }

    // ✅ Log the public ID
    console.log(`Public ID for accommodation ${id}: ${accommodation.publicId}`);

    // ✅ Delete accommodation from database
    const deleted = await client.accommodation.delete({ where: { id: String(id) } });

    res.json({
      message: `Accommodation with id ${id} successfully deleted.`,
      accommodation: deleted,
    });
  } catch (error) {
    console.error('Error deleting accommodation:', error);
    res.status(500).json({ message: `Failed to delete accommodation: ${error.message}` });
  }
});

// Delete all accommodations
router.delete('/delete-all-accommodations', async (req, res) => {
  try {
    // ✅ Fetch all accommodations to get their publicIds
    const accommodations = await client.accommodation.findMany({
      select: { publicId: true }
    });

    // ✅ Delete Cloudinary images one by one
    for (const accommodation of accommodations) {
      await deleteCloudinaryImage(accommodation.publicId);
    }

    // ✅ Delete all accommodations from the database
    const deleted = await client.accommodation.deleteMany();

    res.json({ message: `Deleted ${deleted.count} accommodation(s) successfully.`, count: deleted.count });
  } catch (error) {
    console.error('Error deleting all accommodations:', error);
    res.status(500).json({ message: `Failed to delete all accommodations: ${error.message}` });
  }
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default router;
