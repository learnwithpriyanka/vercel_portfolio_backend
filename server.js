// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = 5000;
require('dotenv').config();

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Contact form endpoint
app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send message.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
