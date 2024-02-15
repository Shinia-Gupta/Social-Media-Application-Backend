import { ApplicationError } from "../../error handler/applicationError.js";

export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static getAll() {
    return users;
  }

  static getById(userId){
    return users.findIndex(u=>u.id==userId);
  }

  static add(name, email, password) {
    const isUserExisting = users.findIndex((u) => u.email == email);
    if (isUserExisting != -1) {
      throw new ApplicationError(
        400,
        "User already exists! Please login or use a different email"
      );
    }
    const id = users.length + 1;
    const newUser = new UserModel(id, name, email, password);
    users.push(newUser);
    return newUser;
  }

  static confirmLogin(email, password) {
    const user=users.find(u=>u.email==email && u.password==password);
    return user;
  }
}

var users = [
  {
    id: 1,
    name: "Shreya",
    email: "shreya@blog.com",
    password: "shreya123",
  },
  {
    id: 2,
    name: "Anubhav",
    email: "anubhav@blog.com",
    password: "anubhav123",
  },
  {
    id: 3,
    name: "Abhishek",
    email: "abhishek@blog.com",
    password: "abhishek123",
  },
];
