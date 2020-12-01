import express, { json } from "express"
import env from "dotenv"
import connectDB from "./config/db.js"
import color from "colors"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

//routes
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"

env.config();

connectDB()

const app = express();
app.use(express.json())
// express.json

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)

//error handling
app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT,console.log(`server running on ${process.env.PORT}`.yellow.bold));