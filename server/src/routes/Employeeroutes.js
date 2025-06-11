import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jwtMiddleware from '../middleware/jwtmiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const prisma = new PrismaClient();
const SALT_ROUNDS = 10;
const SECRET_KEY = process.env.SECRET_KEY;

// Validators
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{10,15}$/;

router.post('/add-employee', async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    nationalId,
    email,
    phoneNumber,
    password,
    confirmPassword,
    role
  } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !dateOfBirth || !nationalId || !email || !phoneNumber || !password || !confirmPassword || !role) {
    return res.status(400).json({ message: 'All required fields must be filled.' });
  }

  // Validate password match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  // Validate password length
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }

  // Validate email format
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  // Validate phone format
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ message: 'Invalid phone number format.' });
  }

  try {
    // Check if email exists in either Employee or Client tables
    const [existingEmployee, existingClient] = await Promise.all([
      prisma.employee.findFirst({
        where: { email },
        select: { id: true }
      }),
      prisma.client.findFirst({
        where: { email },
        select: { id: true }
      })
    ]);

    if (existingEmployee || existingClient) {
      // Only one response will be sent here
      return res.status(409).json({ 
        message: 'Email already in use.',
        existsIn: existingEmployee ? 'employee' : 'client'
      });
    }

    // Check if national ID already exists
    const existingNationalId = await prisma.employee.findFirst({
      where: { nationalId },
      select: { id: true }
    });

    if (existingNationalId) {
      // Only one response will be sent here
      return res.status(409).json({ message: 'National ID already in use.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new employee
    const newEmployee = await prisma.employee.create({
      data: {
        firstName,
        middleName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        nationalId,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
      },
    });

    // Only one response will be sent here
    return res.status(201).json({ 
      message: 'Employee registered successfully.', 
      employee: newEmployee 
    });

  } catch (error) {
    console.error('Employee creation error:', error);
    // Only one response will be sent here
    return res.status(500).json({ message: 'Internal server error.' });
  }
});


// ✅ Employee Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const employee = await prisma.employee.findUnique({ where: { email } });

    if (!employee) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      {
        userId: employee.id,
        email: employee.email,
        role: employee.role,
      },
      SECRET_KEY,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        id: employee.id,
        email: employee.email,
        role: employee.role,
        firstName: employee.firstName,
        lastName: employee.lastName,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// ✅ Get all employees (Protected)
router.get('/fetch-all',jwtMiddleware, async (_req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
      },
    });
    res.status(200).json(employees);
  } catch (error) {
    console.error('Fetch employees error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// ✅ Get employee by ID (Protected)
router.get('/:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
      },
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error('Get employee by ID error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// ✅ Delete employee by ID (Protected)
router.delete('/delete/:id',jwtMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const exists = await prisma.employee.findUnique({ where: { id } });

    if (!exists) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    await prisma.employee.delete({ where: { id } });
    res.status(200).json({ message: 'Employee deleted successfully.' });
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// ✅ Delete all employees (Protected)
router.delete('/', jwtMiddleware, async (_req, res) => {
  try {
    await prisma.employee.deleteMany();
    res.status(200).json({ message: 'All employees deleted successfully.' });
  } catch (error) {
    console.error('Delete all employees error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});






router.put('/update-agent', jwtMiddleware, async (req, res) => {
  const employeeId = req.userId;
  console.log('Employee ID from JWT:', employeeId);

  const {
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber,
    nationalId,
    currentPassword,
    newPassword
  } = req.body;

  try {
    const existingEmployee = await prisma.employee.findUnique({
      where: { id: employeeId }
    });

    if (!existingEmployee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    const updateData = {};

    if (firstName) updateData.firstName = firstName;
    if (middleName !== undefined) updateData.middleName = middleName;
    if (lastName) updateData.lastName = lastName;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;

    if (nationalId && nationalId !== existingEmployee.nationalId) {
      const nationalIdExists = await prisma.employee.findUnique({
        where: { nationalId },
        select: { id: true }
      });

      if (nationalIdExists) {
        return res.status(400).json({ message: 'National ID already in use.' });
      }

      updateData.nationalId = nationalId;
    }

    if (email && email !== existingEmployee.email) {
      const emailExists = await prisma.employee.findUnique({
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

      const passwordValid = await bcrypt.compare(currentPassword, existingEmployee.password);
      if (!passwordValid) {
        return res.status(401).json({ message: 'Current password is incorrect.' });
      }

      updateData.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
    }

    if (Object.keys(updateData).length > 0) {
      const updatedEmployee = await prisma.employee.update({
        where: { id: employeeId },
        data: updateData,
        select: {
          id: true,
          firstName: true,
          middleName: true,
          lastName: true,
          email: true,
          phoneNumber: true,
          nationalId: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return res.status(200).json({
        message: 'Employee information updated successfully.',
        employee: updatedEmployee
      });
    }

    return res.status(200).json({ message: 'No changes detected.' });

  } catch (error) {
    console.error('Update employee error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});




export default router;