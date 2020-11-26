import express from "express"
import products from "./data/products.js"
import env from "dotenv"

env.config();

const app = express();

app.get("/api/products", (req,res) => {
    res.json(products);
})
app.get("/api/products/:id", (req,res) => {
    const product = products.find(p => p._id == req.params.id)
    console.log(product)
    if(product) return res.json(product)
    return res.status(404).json({message: "Product not found"});
})

app.listen(process.env.PORT,console.log("server running on "+process.env.PORT));