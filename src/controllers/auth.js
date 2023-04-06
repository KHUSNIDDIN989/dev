import { sign } from "../utils/jwt.js";
import { User } from "../model/users.js";
import * as uuid from "uuid";
import bcrypt from "bcrypt";
import Joi from "joi";

const REGTR_USER = (req, res) => {
  try {
    const { user_name, user_email, user_password, profile_img } = req.body;
    const data = req.readFile("users");
    const user_id = uuid.v4();

    const schema = Joi.object({
      user_name: Joi.string().min(3).max(15).required(),
      user_email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com"] },
      }),
      user_password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    });


    const { error, value } = schema.validate(
      user_name,
      user_email,
      user_password
    );
        
    if(error) return res.json({error: "Barcha malumot to'liq emas"}) 

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

const LOGIN_USER = (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const data = req.readFile("users");
    const foundUser = data.find(
      (e) => e.user_email == user_email || e.user_password == user_password
    );

    if (!foundUser)
      return res.json({
        status: 401,
        massage: "Bu user alaqachon ruyxatdan utgan",
      });

    const jwtToken = sign({ user_id: foundUser.user_id });

    res.json({ status: 200, massage: "Ok", jwtToken, data: foundUser });
  } catch (err) {
    console.log(err);
  }
};

export { REGTR_USER, LOGIN_USER };
