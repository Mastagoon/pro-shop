import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

const auth = asyncHandler(async(req,res,next) => {
    if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        res.status(401)
        throw new Error("Unauthorized.")
    }
    let token = req.headers.authorization.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select("-password")
        next()
    } catch (err) {
        res.status(401)
        throw new Error("Unauthorized, invalid token.")
    }
})

export default auth