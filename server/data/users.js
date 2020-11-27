import bcrypt from "bcryptjs"

const users = [
    {
        name: "Adminuser",
        email: "admon@dog@gmail.com",
        password: bcrypt.hashSync("123456",10),
        isAdmin: true
    },
    {
        name: "John Doe",
        email: "admoeen@dog@gmail.com",
        password: bcrypt.hashSync("123456",10),
    },
    {
        name: "Jane Doe",
        email: "admonee@dog@gmail.com",
        password: bcrypt.hashSync("123456",10),
    }
]

export default users