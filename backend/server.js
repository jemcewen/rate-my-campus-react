const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDatabase = require('./config/database');
const errorHandler = require('./middleware/errorMiddleware');

connectDatabase();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/campuses', require('./routes/campusRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
