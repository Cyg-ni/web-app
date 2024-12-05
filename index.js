const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.json());

// Use user routes
app.use('/users', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
