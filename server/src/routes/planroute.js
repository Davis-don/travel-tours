import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwtMiddleware from '../middleware/jwtmiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const prisma = new PrismaClient();

// ✅ Create a plan for a booking (one-to-one)
router.post('/add-plan/:bookingId', jwtMiddleware, async (req, res) => {
  const { bookingId } = req.params;
  const { estimatedPrice, agentNotes } = req.body;

  if (!estimatedPrice || !agentNotes) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const existingBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!existingBooking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    const existingPlan = await prisma.plan.findUnique({
      where: { bookingId },
    });

    if (existingPlan) {
      return res.status(400).json({ message: 'A plan already exists for this booking.' });
    }

    const plan = await prisma.plan.create({
      data: {
        bookingId,
        estimatedPrice,
        agentNotes,
      },
    });

    // Update booking status to 'Pending Payment'
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'Pending Payment' },
    });

    res.status(201).json({ message: 'Plan created and booking status updated.', plan });
  } catch (error) {
    console.error('Create plan error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


// ✅ Get all plans
router.get('/fetch-all', async (_req, res) => {
  try {
    const plans = await prisma.plan.findMany({
      include: {
        booking: {
          select: {
            id: true,
            destination: true,
            client: {
              select: { firstName: true, lastName: true, email: true }
            }
          }
        }
      },
    });
    res.status(200).json(plans);
  } catch (error) {
    console.error('Fetch all plans error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// ✅ Get plan by booking ID
router.get('/:bookingId', async (req, res) => {
  const { bookingId } = req.params;

  try {
    const plan = await prisma.plan.findUnique({
      where: { bookingId },
      include: {
        booking: true,
      },
    });

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found for this booking.' });
    }

    res.status(200).json(plan);
  } catch (error) {
    console.error('Fetch plan by booking ID error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// ✅ Update a plan by booking ID
router.put('/:bookingId', jwtMiddleware, async (req, res) => {
  const { bookingId } = req.params;
  const { estimatedPrice, agentNotes } = req.body;

  try {
    const plan = await prisma.plan.findUnique({ where: { bookingId } });

    if (!plan) {
      return res.status(404).json({ message: 'Plan not found for this booking.' });
    }

    const updatedPlan = await prisma.plan.update({
      where: { bookingId },
      data: {
        estimatedPrice,
        agentNotes,
        updatedAt: new Date(),
      },
    });

    res.status(200).json({ message: 'Plan updated successfully.', plan: updatedPlan });
  } catch (error) {
    console.error('Update plan error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// DELETE /plans/delete/:bookingId
router.delete('/delete/:bookingId', jwtMiddleware, async (req, res) => {
  
  const { bookingId } = req.params;


  try {
    const existingPlan = await prisma.plan.findFirst({
      where: { bookingId },
    });

    if (!existingPlan) {
      return res.status(404).json({ message: 'Plan not found for this booking.' });
    }

    await prisma.plan.delete({
      where: { id: existingPlan.id }, // Must delete by primary key `id`, not bookingId
    });

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'pending' },
    });

    res.status(200).json({ message: 'Plan deleted and booking status updated to pending.' });
  } catch (error) {
    console.error('Delete plan error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});



export default router;
