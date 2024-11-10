const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',  // Frontend URL
  methods: ['GET', 'POST'],        // Allow only GET and POST requests
  credentials: true,                // Allow cookies to be sent with requests
}));

// Middleware to parse cookies
app.use(cookieParser());

// Route to set a cookie
app.get('/set-cookie', (req, res) => {
  // Setting a simple cookie
  res.cookie('username', 'JohnDoe', {
    maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
    httpOnly: true,              // Makes the cookie inaccessible to JavaScript
    secure: true,               // Set to true if using HTTPS
  });
  res.send('Cookie has been set!');
});

// Route to retrieve the cookie
app.get('/get-cookie', (req, res) => {
  const username = req.cookies.username;
  res.send(`Hello, ${username}!`);
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
