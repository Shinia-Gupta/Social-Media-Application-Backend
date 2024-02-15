import express from 'express';
import CommentController from './comment.controller.js';

const commentRouter=express.Router();
const commentController=new CommentController();

commentRouter.get('/',commentController.getAllComments);
commentRouter.post('/add',commentController.addComment);
commentRouter.put('/update',commentController.updateComment);
commentRouter.delete('/delete',commentController.deleteComment);
export default commentRouter;