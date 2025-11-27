const express = require('express');
const app = express();

require('dotenv').config();
const connectDB = require('./config/mongoose_connection');
const cookieParser = require('cookie-parser');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// static frontend
app.use(express.static('public'));

// routes
const authRoutes = require('./routes/auth_routes');
const referralRoutes = require('./routes/referral_routes');

app.use('/api/auth', authRoutes);
app.use('/api/referral', referralRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running http://localhost:${process.env.PORT || 3000}`);
});
