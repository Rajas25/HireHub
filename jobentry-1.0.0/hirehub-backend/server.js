// backend/server.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

// ===== MySQL CONNECTION POOL =====
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hirehub',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connected to MySQL');
        connection.release();
    } catch (err) {
        console.error('❌ MySQL connection error:', err.message);
        console.log('⚠️  Make sure MySQL is running on port 3306');
        console.log('   - Check if MySQL service is started');
        console.log('   - Verify credentials in .env file');
    }
})();

// ===== HELPERS =====

// Generate JWT
function generateToken(userId, email) {
    return jwt.sign(
        { id: userId, email },
        process.env.JWT_SECRET || 'hirehub_secret_key',
        { expiresIn: '7d' }
    );
}

// ===== ROUTES =====

// ✅ REGISTER (POST)
app.post('/api/register', async (req, res) => {
    try {
        const { fullname, email, password, user_type } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const [existing] = await pool.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            `INSERT INTO users (fullname, email, password, user_type)
             VALUES (?, ?, ?, ?)`,
            [fullname, email, hashedPassword, user_type || 'jobseeker']
        );

        const userId = result.insertId;
        const token = generateToken(userId, email);

        res.status(201).json({
            success: true,
            message: 'Registration successful!',
            token,
            user: {
                id: userId,
                fullname,
                email,
                user_type: user_type || 'jobseeker'
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

// ✅ LOGIN (POST)
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        const [rows] = await pool.query(
            'SELECT id, fullname, email, password, user_type FROM users WHERE email = ?',
            [email]
        );
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user.id, user.email);

        res.json({
            success: true,
            message: 'Login successful!',
            token,
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                user_type: user.user_type
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

// ✅ GET CURRENT USER (Protected – GET)
app.get('/api/me', async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hirehub_secret_key');
        const [rows] = await pool.query(
            'SELECT id, fullname, email, user_type FROM users WHERE id = ?',
            [decoded.id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user: rows[0] });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

// ✅ Root – welcome message
app.get('/', (req, res) => {
    res.json({
        message: 'HireHub API (MySQL)',
        endpoints: {
            register: 'POST /api/register',
            login: 'POST /api/login',
            me: 'GET /api/me (requires token)'
        }
    });
});

// Optional GET info (so visiting /api/register in browser shows message)
app.get('/api/register', (req, res) => {
    res.json({ message: 'This endpoint accepts POST requests for registration.' });
});

app.get('/api/login', (req, res) => {
    res.json({ message: 'This endpoint accepts POST requests for login.' });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📋 Test endpoints:`);
    console.log(`   POST http://localhost:${PORT}/api/register`);
    console.log(`   POST http://localhost:${PORT}/api/login`);
});