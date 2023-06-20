const express = require('express');
const app =express();

require('dotenv').config();
const port = process.env.PORT;

const cors = require('cors');

app.use(cors());

const conenctDb =require('./config/connectdb')

const DATABASE_URL = process.env.DATABASE_URL;

conenctDb(DATABASE_URL);

// json - when we making apis


const userRoutes = require('./routes/userRoutes');

app.use(express.json())




// load routes

app.use('/api/user',userRoutes)


app.listen(port,console.log(`app is runningat http://loacalhost:${port}`))


