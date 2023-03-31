import { sign } from "../utils/jwt.js";
import { User } from "../model/users.js";
import * as uuid from "uuid";
import bcrypt from "bcrypt";

const REGTR_USER = (req, res) => {
  try {
    const { user_name, user_email, user_password, profile_img } = req.body;
    const data = req.readFile("users");
    const user_id = uuid.v4();
    const foundUser = data.find(
      (e) => e.user_email == user_email || e.user_name == user_name
    );

    if (foundUser)
      return res.json({
        status: 401,
        massage: "Bu user alaqachon ruyxatdan utgan",
      });

    const jwtToken = sign({ user_id });
    const user = new User(
      user_id,
      user_name,
      user_email,
      bcrypt.hashSync(user_password, 12),
      profile_img
    );

    req.writeFile("users", user);

    res.json({ status: 200, massage: "Ok", jwtToken });
  } catch (err) {
    console.log(err);
  }
};

export { REGTR_USER };
