const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')

const app = express();

app.use(express.json());
app.use(cors());

app.use('/admin', adminRouter);
app.use('/users', userRouter);

mongoose.connect("mongodb+srv://hydham007:L4YGOqcfwnT6BEBV@cluster0.i8mm9gd.mongodb.net/", {dbName: "course-selling"})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
