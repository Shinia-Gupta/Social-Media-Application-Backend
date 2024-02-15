import express from "express";
import SaveController from "./save.controller.js";
const saveController=new SaveController();
const saveRouter=express.Router();
saveRouter.get('/',saveController.getAllSavedPosts);
saveRouter.post('/toggle/',saveController.savePosts);
export default saveRouter;