import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwtMiddleware from '../middleware/jwtmiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const prisma = new PrismaClient();

// ✅ Create a new booking (client ID from JWT)
router.post('/add-booking', jwtMiddleware, async (req, res) => {
  const clientId = req.userId; // Retrieved from JWT
  console.log(clientId)
  const { destination, travelDates, budget, travelers, preferences, specialRequests } = req.body;

  if (!destination || !travelDates || !budget || !travelers) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const booking = await prisma.booking.create({
      data: {
        clientId,
        destination,
        travelDates,
        budget,
        travelers,
        preferences,
        specialRequests,
        // status defaults to 'pending'
      },
    });
    res.status(201).json({ message: 'Booking confirmed! Sit tight while we craft your perfect trip.', booking });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});




// ✅ Get all bookings with full client details
router.get('/fetch-all', async (_req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        client: true, // includes all fields from the Client model
      },
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Fetch all bookings error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});







// ✅ Get booking by ID
router.get('/:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        client: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error('Fetch booking by ID error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});



// ✅ Cancel (Delete) booking by ID
router.post('/:id/cancel', jwtMiddleware, async (req, res) => {
  const { id } = req.params;
  const clientId = req.userId;

  try {
    // First check if booking exists
    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    // Verify the booking belongs to the requesting client
    if (booking.clientId !== clientId) {
      return res.status(403).json({ message: 'Unauthorized to cancel this booking.' });
    }

    // Immediately delete the booking
    await prisma.booking.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Booking cancelled successfully.",
    });
  } catch (error) {
    console.error('Cancel (delete) booking error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


// ✅ Delete booking by ID
router.delete('/:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const bookingExists = await prisma.booking.findUnique({ where: { id } });

    if (!bookingExists) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    await prisma.booking.delete({ where: { id } });
    res.status(200).json({ message: 'Booking deleted successfully.' });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// ✅ Delete all bookings
router.delete('/delete', jwtMiddleware, async (_req, res) => {
  try {
    await prisma.booking.deleteMany({});
    res.status(200).json({ message: 'All bookings deleted successfully.' });
  } catch (error) {
    console.error('Delete all bookings error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});




export default router;






