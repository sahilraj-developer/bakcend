const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
const connectDb = require('./config/connectdb');

const DATABASE_URL = process.env.DATABASE_URL;

connectDb(DATABASE_URL);

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.get('/',(req,res)=>{
  res.send({data:"health checker"})
})
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
