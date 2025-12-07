const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes
app.use("/api/expenses", require("./routes/expenseRoutes"));

// Check server
app.get("/", (req, res) => {
    res.send("Expense Tracker Backend Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
