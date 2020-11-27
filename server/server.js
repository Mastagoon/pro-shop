import express from "express"
import products from "./data/products.js"
import env from "dotenv"
import connectDB from "./config/db.js"
import colors from "colors"

env.config();

connectDB()

const app = express();

app.get("/api/products", (req,res) => {
    res.json(products);
})
app.get("/api/products/:id", (req,res) => {
    const product = products.find(p => p._id == req.params.id)
    if(product) return res.json(product)
    return res.status(404).json({message: "Product not found"});
})

app.listen(process.env.PORT,console.log(`server running on ${process.env.PORT}`.yellow.bold));