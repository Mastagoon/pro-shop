import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`mongodb connected: ${con.connection.host}`.cyan.underline)
    } catch(err) {
        console.error(`mongodb error: ${err.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB