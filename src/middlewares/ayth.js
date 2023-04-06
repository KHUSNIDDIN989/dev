import  { verify } from "../utils/jwt.js";

const VERIFY_TOKEN = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
        return res.json({ status: 401, message: "token required" });
    }

    verify(token, process.env.SCRET_KEY, (err, decode) => {
      if (err instanceof jwt.TokenExpiredError) {
        return res.json({ status: 401, message: "token expired" });
      }

      if (err instanceof jwt.JsonWebTokenError) {
        return res.json({ status: 401, message: "invalid token" });
      }

      req.tokenVerifyData = decode;
    });

    next();
  } catch (err) {
    console.log(err);
  }
};

export { VERIFY_TOKEN };
