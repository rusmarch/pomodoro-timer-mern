require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error-middleware');
const connectDB = require('./config/db');

connectDB();

const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

//Routes
app.use('/api', require('./router/userRoutes'));
app.use('/api/tasks', require('./router/taskRoutes'));

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT = ${PORT}`));
