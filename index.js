const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware to parse cookies
app.use(cookieParser());

// Check if the app is in production to set secure cookies

// Enable CORS with credentials and appropriate origin
app.use(cors({
  origin: 'https://frontend-one-sigma-24.vercel.app',  // Replace with your Vercel frontend URL
  methods: ['GET', 'POST'],
  credentials: true,  // Allow cookies to be sent with requests
}));

// Route to set a cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'JohnDoe', {
    maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
    httpOnly: true,              // Prevents access via JavaScript
    secure: true,       // Only secure cookies in production (HTTPS)
    sameSite: 'None',            // Required for cross-site cookies
  });
  res.send('Cookie has been set!');
});

// Route to retrieve the cookie
app.get('/get-cookie', (req, res) => {
  const username = req.cookies.username;
  if (username) {
    res.send(`Hello, ${username}!`);
  } else {
    res.send('No cookie found!');
  }
});

// Start the server on port 4000
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
