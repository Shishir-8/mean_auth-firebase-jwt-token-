import express from "express"
import cookieParser from "cookie-parser"
import 'dotenv/config'
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js"
import cors from "cors"



const app = express()
connectDB()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


app.use(express.json())
app.use(cookieParser())





app.use("/api/auth", authRoutes)


app.listen(3000, () => {
    console.log('Server is running..')
})