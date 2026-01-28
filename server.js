const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes.js')
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
// const { requireAuth } = require('./middleware/authMiddleware.js');
// const authController = require('./controller/authController');
const budgetRoutes = require('./routes/budgetRoutes')

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

// 1. Connect to Database
connectDB().then(() => {
    // 2. ONLY start the server if the database connection works
    app.listen(4000, '0.0.0.0', () => {
        console.log('✅ HARDCODED SERVER RUNNING ON: http://127.0.0.1:4000');
    });
}).catch((err) => {
    console.log("Database connection failed, server not started.");
    console.error(err);
});


app.use(authRoutes);
// app.get('/expenses', requireAuth, authController.expenses)
// app.use('/expense', expenseRoutes);
app.use(expenseRoutes);
app.use(budgetRoutes);

// app.use((req, res) => {
//     res.status(404).sendFile('./vi')
// })

