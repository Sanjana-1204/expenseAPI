const express = require('express');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes.js')
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const budgetRoutes = require('./routes/budgetRoutes')
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { globalErrorHandler, AppError } = require('./middleware/errorHandler.js');
require('dotenv').config();



const app = express();

// --- MIDDLEWARE --- //
app.use(helmet());
app.use(morgan('dev'));
app.set('json spaces', 2);

// Rate Limiting: 100 requests / 15min
// Strict limit applied to prevent brute-force login attempts
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 64
});
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
const PORT = 4000;

// --- DATABASE CONNECTION --- //
connectDB().then(() => {
    // app is alive only when the connection is secured
    app.listen(PORT, '0.0.0.0', () => {
        console.log('Database successfully connected');
    });
}).catch((err) => {
    console.log('Server failed to connect', err);
});

// --- ROUTES --- //
app.use(authRoutes);

app.use(expenseRoutes);

app.use(budgetRoutes);

// --- ERROR HANDLING MIDDLEWARE --- //
app.use(globalErrorHandler);

