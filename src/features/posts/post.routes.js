import express from 'express';
import PostController from './post.controller.js';
import { blogware } from '../../middlewares/fileupload.middleware.js';
const postController=new PostController();
const postRouter=express.Router();

postRouter.get('/',postController.getAllPosts);
postRouter.get('/caption',postController.filterPosts);
postRouter.get('/userposts',postController.getPostByUser);
postRouter.post('/addPost',blogware.single('imageUrl'),postController.addPost);
postRouter.put('/updatePost',blogware.single('imageUrl'),postController.updatePost);
postRouter.delete('/deletePost',postController.deletePost);

export default postRouter;