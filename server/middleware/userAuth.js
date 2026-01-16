import jwt from "jsonwebtoken";
import { SECURITY_SECRET } from "../setup/config/env.js";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "User is not authorized. Login again",
    });
  }
  try {
    const tokenDecode = await jwt.verify(token, SECURITY_SECRET);
   
    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id };
    } else {
      return res.json({
        success: false,
        message: "User is not authorized. Login again",
      });
    }

    next();
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export default userAuth;
