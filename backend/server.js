const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDatabase = require('./config/database');
const errorHandler = require('./middleware/errorMiddleware');
const campusRoutes = require('./routes/campusRoutes');
const userRoutes = require('./routes/userRoutes');

connectDatabase();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/campuses', campusRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
