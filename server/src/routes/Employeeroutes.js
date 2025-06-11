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

// Validation patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{10,15}$/;

// Employee routes
router.post('/add-employee', async (req, res) => {
  const requiredFields = [
    'firstName', 'lastName', 'dateOfBirth',
    'nationalId', 'email', 'phoneNumber',
    'password', 'role'
  ];

  const missingFields = requiredFields.filter(field => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(', ')}`
    });
  }

  try {
    const existingEmployee = await prisma.employee.findFirst({
      where: {
        OR: [
          { email: req.body.email },
          { nationalId: req.body.nationalId }
        ]
      }
    });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: existingEmployee.email === req.body.email
          ? 'Email already in use'
          : 'National ID already in use'
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newEmployee = await prisma.employee.create({
      data: {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        dateOfBirth: new Date(req.body.dateOfBirth),
        nationalId: req.body.nationalId,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword,
        role: req.body.role
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: newEmployee
    });

  } catch (error) {
    console.error('Error in /add-employee:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while creating employee'
    });
  }
});




// Employee Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const employee = await prisma.employee.findUnique({ where: { email } });

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
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
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        role: employee.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all employees
router.get('/fetch-all', jwtMiddleware, async (req, res) => {
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
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      message: 'Employees fetched successfully',
      data: employees
    });
  } catch (error) {
    console.error('Fetch employees error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch employees'
    });
  }
});

// Delete employee
router.delete('/:id', jwtMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.employee.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete employee'
    });
  }
});

export default router;