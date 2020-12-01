import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

// @desc        Authenticate user and get token
// @route       POST /api/users/login
// @access      Public
export const authUser = asyncHandler(async (req,res) => {
    const { email,password } = req.body
    const user = await User.findOne({ email })
    if(!user) {
        res.status(401)
        throw new Error(`this email address is not registered.`)
    }
    if(!await user.matchPassword(password)) {
        res.status(401)
        throw new Error(`invalid email or password`)
    }
    return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: ""
    })

})

// @desc        Fetch one product
// @route       GET /api/products/:id
// @access      Public
export const getProductById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(!product) {
        res.status(404)
        throw new Error("Product not found!")
    }
    res.json(product)
})