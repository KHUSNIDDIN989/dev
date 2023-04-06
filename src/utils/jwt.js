import jwt from "jsonwebtoken";

const sign = (payload) =>
  jwt.sign(payload, process.env.JWT_SECERT_KEY, { expiresIn: 20 });

const verify = (payload) => jwt.verify(payload, process.env.JWT_SECERT_KEY);

export { sign, verify };
