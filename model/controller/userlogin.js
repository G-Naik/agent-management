const userLoginSchema = require("../schema/login");
const jwt = require("jsonwebtoken");

const userlogin = async (request, response) => {
  try {
    const { email, password } = request.body;

    const checkCredentails = await userLoginSchema.findOne({ email: email });

    if (!checkCredentails) {
      return response.status(401).json({
        message: "Authentication Failed",
      });
    }
    const matchPassword = checkCredentails.password === password;
    if (!matchPassword) {
      return response.status(401).json({
        message: "Authentication Failed Password Mismatch",
      });
    }

    const payload = {
      id: checkCredentails.id,
      email: checkCredentails.email,
    };

    const token = jwt.sign(payload, process.env.AUTH_SECRET_TOKEN, {
      expiresIn: "1h",
    });
    response.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return response.status(200).json({
      message: "Login successfull",
      token: token,
    });
  } catch (err) {
    return response.status(403).json({
      message: "invalid authorization",
    });
  }
};

module.exports = { userlogin };
