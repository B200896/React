const express = require('express');
const cors = require('cors');
const uploadRoutes = require('./Routes/fileRoutes');  // Your routes file
const app = express();

// Middlewares
app.use(cors());  // Enable CORS

// Middleware for parsing JSON request bodies
app.use(express.json());  // Parse application/json

// Middleware for parsing URL encoded data (useful for form submissions)
app.use(express.urlencoded({ extended: true }));  // Parse application/x-www-form-urlencoded

// Your routes
app.use('/api', uploadRoutes);

// Default route for testing
app.get('/', (req, res) => {
    res.send("Server is running");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
