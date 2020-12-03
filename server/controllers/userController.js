import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

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
        token: generateToken(user._id)
    })

})

// @desc        Register a new user
// @route       POST /api/users
// @access      Public
export const registerUser = asyncHandler(async (req,res) => {
    const { name,email,password } = req.body
    const userExists = await User.findOne({ email })
    if(userExists) {
        res.status(400)
        console.log("throwing email exists error.")
        throw new Error(`this email address is already used.`)
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(!user) {
        res.status(400)
        throw new Error("Invalid user data")
    }
    return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    })

})

// @desc        Get user profile
// @route       GET /api/users/profile
// @access      Private
export const getUserProfile = asyncHandler(async (req,res) => {
    let user = await User.findById(req.user._id)
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
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