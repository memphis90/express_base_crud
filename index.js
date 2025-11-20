import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './route/userRoute.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/crud';

mongoose.connect(MONGODB_URL).then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

app.use('/api/users', userRoute);

app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

