const jwt = require("jsonwebtoken")

const verifyJsonToken = (req , res , next ) => { 
    try {
    const authorizationHeader = req.headers['authorization']    
    const token = authorizationHeader && authorizationHeader.split(" ")[1] || req.cookies.token  ; 

    if (!token) {
            return res.status(401).json({
                message : "Access denied"
            })
        }
        
        const decodeToken = jwt.verify(token , process.env.AUTH_SECRET_TOKEN)
        req.email = decodeToken.email;
        console.log("token verified")
        next(); 
    } catch (err) {
        res.status(403).json({
            message : "Invalid Token"
        })
    }
}

module.exports =  verifyJsonToken;