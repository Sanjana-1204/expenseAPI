const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes.js')
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
// const { requireAuth } = require('./middleware/authMiddleware.js');
// const authController = require('./controller/authController');
const budgetRoutes = require('./routes/budgetRoutes')
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require(
    'express-rate-limit');
const { globalErrorHandler } = require('./middleware/errorHandler.js');
require('dotenv').config();

connectDB();

const app = express();


app.use(helmet());
app.use(morgan('dev'));
app.set('json spaces', 2);
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // in milliseconds
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 64
});
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
// PORT is loaded as a string form the .env file 
// so its best to convert it into an int
const PORT = parseInt(process.env.PORT);
console.log(PORT);

connectDB().then(() => {
    // 2. ONLY start the server if the database connection works
    app.listen(PORT, '0.0.0.0', () => {
        console.log(PORT);
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

// global error handling middleware
// express sees the 4 argumenst with error in it and 
// then sends error to this mmiddleware automatically
app.use(globalErrorHandler)

