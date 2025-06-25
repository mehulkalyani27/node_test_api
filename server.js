// Import Required Modules
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Database Connection
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.rotes');
const protectedRoutes = require('./routes/protected.routes');

// Load Environment Variables
dotenv.config();

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 Connect to Database
connectDB();

// ✅ Middleware to parse JSON

app.get("/", (_, res) => {
  res.send("Welcome to Test API");
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('api',protectedRoutes);


// 🚀 Start Express Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
