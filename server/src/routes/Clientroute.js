
import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // bcryptjs for compatibility
import jwt from 'jsonwebtoken'; // Add this import
import jwtMiddleware from '../middleware/jwtmiddleware.js';

import dotenv from 'dotenv';
dotenv.config(); 

const router = express.Router();
const client = new PrismaClient();
const SALT_ROUNDS = 10;
const SECRET_KEY = process.env.SECRET_KEY;

// Regex validators
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactRegex = /^\+?\d{10,15}$/;

// ✅ Signup Route
router.post('/signup', async (req, res) => {
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ message: 'Invalid or missing request body.' });
  }

  const { firstName, lastName, email, contact, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !contact || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  if (!contactRegex.test(contact)) {
    return res.status(400).json({ message: 'Invalid contact number. Must be 10 to 15 digits, optionally starting with +.' });
  }

  try {
    // Check if email or contact already exists
    const existingUser = await client.client.findFirst({
      where: { OR: [{ email }, { contact }] },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email or contact already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await client.client.create({
      data: { firstName, lastName, email, contact, password: hashedPassword },
      select: { id: true, firstName: true, lastName: true, email: true, contact: true, createdAt: true }
    });

    return res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});





// ✅ Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // First check the client table
    const clientUser = await client.client.findUnique({ where: { email } });

    if (clientUser) {
      const passwordMatch = await bcrypt.compare(password, clientUser.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { 
          userId: clientUser.id, 
          email: clientUser.email,
          role: 'client' // Explicitly setting role for client
        },
        SECRET_KEY,
        { expiresIn: '24h' }
      );

      return res.status(200).json({ 
        message: 'Login successful', 
        token, 
        user: clientUser,
        role: 'client'
      });
    }

    // If not found in client table, check employee table
    // Note: Replace 'employee' with your actual Prisma model name for employees
    
    const employeeUser = await client.employee.findUnique({ where: { email } });

    if (employeeUser) {
      const passwordMatch = await bcrypt.compare(password, employeeUser.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { 
          userId: employeeUser.id, 
          email: employeeUser.email,
          role: employeeUser.role // Role comes from employee table
        },
        SECRET_KEY,
        { expiresIn: '24h' }
      );

      return res.status(200).json({ 
        message: 'Login successful', 
        token, 
        user: employeeUser,
        role: employeeUser.role
      });
    }
    

    // If user not found in either table
    return res.status(401).json({ message: 'Invalid credentials' });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ✅ Fetch all clients (Protected Route)
router.get('/fetch-all', jwtMiddleware, async (_req, res) => {
  try {
    const clients = await client.client.findMany({
      select: { id: true, firstName: true, lastName: true, email: true, contact: true, createdAt: true }
    });
    res.status(200).json(clients);
  } catch (error) {
    console.error('Fetch all clients error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// ✅ Fetch client by ID (Protected Route)
router.get('/:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const clientData = await client.client.findUnique({
      where: { id },
      select: { id: true, firstName: true, lastName: true, email: true, contact: true, createdAt: true }
    });

    if (!clientData) {
      return res.status(404).json({ message: 'Client not found.' });
    }

    res.status(200).json(clientData);
  } catch (error) {
    console.error('Fetch client by ID error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// ✅ Delete client by ID (Protected Route)
router.delete('/:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const clientExists = await client.client.findUnique({ where: { id } });

    if (!clientExists) {
      return res.status(404).json({ message: 'Client not found.' });
    }

    await client.client.delete({ where: { id } });
    res.status(200).json({ message: 'Client deleted successfully.' });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// ✅ Delete all clients (Protected Route)
router.delete('/', jwtMiddleware, async (_req, res) => {
  try {
    await client.client.deleteMany({});
    res.status(200).json({ message: 'All clients deleted successfully.' });
  } catch (error) {
    console.error('Delete all clients error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


router.put('/update-client', jwtMiddleware, async (req, res) => {
  const clientId = req.userId;
  console.log('Client ID from JWT:', clientId);
  const { 
    firstName, 
    lastName, 
    email, 
    contact, 
    currentPassword, 
    newPassword 
  } = req.body;

  try {
    const existingClient = await client.client.findUnique({
      where: { id: clientId }
    });

    if (!existingClient) {
      return res.status(404).json({ message: 'Client not found.' });
    }

    const updateData = {};

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (contact) updateData.contact = contact;

    if (email && email !== existingClient.email) {
      const emailExists = await client.client.findUnique({
        where: { email },
        select: { id: true }
      });

      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use.' });
      }
      updateData.email = email;
    }

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required to change password.' });
      }

      const passwordValid = await bcrypt.compare(currentPassword, existingClient.password);
      if (!passwordValid) {
        return res.status(401).json({ message: 'Current password is incorrect.' });
      }

      updateData.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
    }

    if (Object.keys(updateData).length > 0) {
      const updatedClient = await client.client.update({
        where: { id: clientId },
        data: updateData,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          contact: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return res.status(200).json({
        message: 'Client information updated successfully.',
        client: updatedClient
      });
    }

    return res.status(200).json({ message: 'No changes detected.' });

  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});



// Protected search endpoint
router.get('/search/:email',jwtMiddleware,  async (req, res) => {
  const { email } = req.params;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'Email query parameter is required' });
  }

  try {
    const foundClient = await client.client.findUnique({
      where: { email },
      include: {
        bookings: {
          include: {
            plan: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!foundClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const { password, ...clientData } = foundClient;
    res.status(200).json(clientData);
  } catch (error) {
    console.error('Client search error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected password reset endpoint
router.post('/reset-password', jwtMiddleware, async (req, res) => {
  const { clientId, newPassword } = req.body;

  if (!clientId || !newPassword) {
    return res.status(400).json({ message: 'Client ID and new password are required' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    
    await client.client.update({
      where: { id: clientId },
      data: { password: hashedPassword }
    });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;