const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const cookieParser = require("cookie-parser")


//! Access Port 

const PORT = process.env.PORT || "6000"
const DB_URL = process.env.DATABASE_URL || ""

mongoose.connect(DB_URL).then(() => {
    console.log("Connection made successfull")
}).catch(err => {
    console.log('Fatal error unable to build an connection' , err)
})

const login = require("./routes/login")
const agent = require('./routes/agent')
const uploads = require("./routes/uploads")
const verifyJsonToken = require("./middleware/verifyToken")
const { upload } = require("./middleware/multer")
const agentlist = require("./routes/agentList")

const app = express(); 
app.use(cookieParser());
app.use(express.json(),cors(),express.urlencoded({extended: false}))

app.use("/login",login)
app.use("/agent", verifyJsonToken, agent)
app.use("/uploads", verifyJsonToken, upload.single("file"),uploads)
app.use("/agentlist",verifyJsonToken,agentlist)

app.listen(PORT , () => {
    console.log("server is now ready to work on the port" + PORT)
})