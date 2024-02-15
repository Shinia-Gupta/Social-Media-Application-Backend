import express from 'express';
import UserController from './user.controller.js';

const userController=new UserController();
const userRouter=express.Router();

userRouter.get('/',userController.getAllUsers);
userRouter.post('/signup',userController.postRegister);
userRouter.post('/signin',userController.postLogin);

export default userRouter;