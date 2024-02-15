import express from "express";
import LikeController from "./like.controller.js";
const likeController=new LikeController();
const likeRouter=express.Router();
likeRouter.get('/',likeController.getAllLikes);
likeRouter.post('/toggle/',likeController.likeToggler);
export default likeRouter;