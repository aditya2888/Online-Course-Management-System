import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
import courseRoutes from "./routes/course.routes.js"

const app = express()

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

// Connect Database
connectDB()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/courses', courseRoutes)

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Course Management System API' });
});

export default app