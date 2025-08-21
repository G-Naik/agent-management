const jwt = require("jsonwebtoken")

const generateToken = (user) => {
    console.log(user)
    return jwt.sign(user.process.env.AUTH_SECRET_TOKEN)
}

module.exports = {generateToken}