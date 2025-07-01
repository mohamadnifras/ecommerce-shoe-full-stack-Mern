require('dotenv').config();
const express = require('express')
const userRoutes = require('./src/routes/userRoutes')
const connectDB = require('./src/config/db')
const cookieParser = require('cookie-parser')
const productRoutes = require('./src/routes/productRoutes')
const cartRoutes = require('./src/routes/cartRoutes')
const errorHandler = require('./src/middlewares/errorHandler')
const orderRoutes = require('./src/routes/orderRoutes')
const adminRoutes = require('./src/routes/adminRoutes')
const wishlistRoutes = require('./src/routes/wishlistRoutes')
const cors = require('cors')


const app = express()

const  originsPort  = process.env.CLIENT_URL;

const corsOptions = {
    origin:originsPort,
    methods:['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())


//Connect to DB
connectDB()

//user Routes
app.use('/api/user', userRoutes)
app.use('/api/user', productRoutes)
app.use('/api/user', cartRoutes)
app.use('/api/user', orderRoutes)
app.use('/api/user', wishlistRoutes)

//Admin Routes
app.use('/api/admin', adminRoutes)
app.use('/api/admin', productRoutes)
app.use('/api/admin', orderRoutes)


//errorHandler
app.use(errorHandler);


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

