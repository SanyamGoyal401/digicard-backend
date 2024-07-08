const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const {PORT} = require('./config/server');
const auth = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cookieParser());

const businessRoutes = require('./routes/business');
const userRoutes = require('./routes/user');

app.use(cors({
    origin: 'https://e-digicards.vercel.app',
    credentials: true  // This enables credentials in the CORS request
}));

app.get('/', (req, res)=>{
    console.log("Server is up");
    res.json({'msg': 'Server is up'});
})

app.use('/business', businessRoutes);
app.use('/user', userRoutes);

app.listen(PORT, async()=>{
    await connectDB();
    console.log(`Server is running at ${PORT}`);
})