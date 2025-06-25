require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Connect to MongoDB, then start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Tax Engine API' });
});


    // Start server after DB connection
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
  });

// Simple root route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Tax Engine API' });
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  passwordHash: String,
  mfaEnabled: { type: Boolean, default: true },
  mfaCode: String,
  mfaCodeExpires: Date,
});

const User = mongoose.model('User', userSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendMfaCode(email, code) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your MFA Code',
    text: `Your MFA code is: ${code}`,
  };
  await transporter.sendMail(mailOptions);
}

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const existingUser = await User.findOne({ email });
    if(existingUser) return res.status(400).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ email, passwordHash });
    await user.save();

    res.json({ message: 'User registered' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password) return res.status(400).json({ error: 'Email and password required' });
  try {
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ error: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if(!valid) return res.status(400).json({ error: 'Invalid email or password' });

    if(user.mfaEnabled) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      user.mfaCode = code;
      user.mfaCodeExpires = Date.now() + 5 * 60 * 1000;
      await user.save();

      await sendMfaCode(email, code);

      return res.json({ mfaRequired: true, message: 'MFA code sent to email' });
    } else {
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    }
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/mfa-verify', async (req, res) => {
  const { email, code } = req.body;
  if(!email || !code) return res.status(400).json({ error: 'Email and code required' });
  try {
    const user = await User.findOne({ email });
    if(!user || !user.mfaCode || user.mfaCodeExpires < Date.now()) {
      return res.status(400).json({ error: 'MFA code expired or invalid' });
    }
    if(user.mfaCode !== code) {
      return res.status(400).json({ error: 'Invalid MFA code' });
    }
    user.mfaCode = null;
    user.mfaCodeExpires = null;
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.status(401).json({ error: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];
  if(!token) return res.status(401).json({ error: 'Token missing' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch(err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

function calculateTax(state, income) {
  income = Number(income);
  if(isNaN(income) || income < 0) return 0;

  const rates = {
    CA: 0.1,
    TX: 0.05,
    NY: 0.09,
    FL: 0.06,
    WA: 0.07
  };
  const rate = rates[state] || 0.05;
  return income * rate;
}

app.post('/api/calculate-tax', authMiddleware, (req, res) => {
  const { state, income } = req.body;
  if(!state || income == null) return res.status(400).json({ error: 'State and income required' });

  const tax = calculateTax(state, income);
  res.json({ tax });
});
