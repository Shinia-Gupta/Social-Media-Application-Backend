import jwt from "jsonwebtoken";
import { ApplicationError } from "../../error handler/applicationError.js";
import UserModel from "./user.model.js";

export default class UserController {
  getAllUsers(req, res) {
    const users = UserModel.getAll();
    return res.status(200).send(JSON.stringify(users));
  }

  postRegister(req, res) {
    const { name, email, password } = req.query;
    const result = UserModel.add(name, email, password);
    res.status(201).send({ message: "User added successfully!", user: result });
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    const loggedInUser = UserModel.confirmLogin(email, password);
    if (!loggedInUser) {
      throw new ApplicationError(404, "User not found! ");
    } else {
      const token = jwt.sign(
        { userId: loggedInUser.id, email: loggedInUser.email },
        "UniqueBlogToken#2024",
        {
          expiresIn: "2h",
        }
      );
      res.status(200)
      .cookie("jwtToken", token, { maxAge: 900000, httpOnly: false })
      .cookie("userId", loggedInUser.id, { maxAge: 900000, httpOnly: false })
      .send(
        JSON.stringify({
          message: "User logged in successfully!",
          token: token,
        })
      );
    }
  }
}
