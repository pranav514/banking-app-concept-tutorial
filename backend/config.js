const dotenv = require("dotenv")
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const db_url = process.env.MONGO_URL
module.exports = {
    JWT_SECRET,
    db_url
}