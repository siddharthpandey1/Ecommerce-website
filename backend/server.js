import express from 'express'
import 'dotenv/config'
import ConnectDB from './database/db.js'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'
import cors from 'cors'

const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

const PORT = process.env.PORT || 4000
app.use(express.json());

app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/cart', cartRoute)
app.use('/api/v1/orders', orderRoute)

app.listen(PORT,()=>{
    ConnectDB()
    console.log(`Server is listing at port: ${PORT}`);    
})
