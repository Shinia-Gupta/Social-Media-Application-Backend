import { ApplicationError } from "../../error handler/applicationError.js";
import LikeModel from "./like.model.js";
import PostModel from "../posts/post.model.js";
export default class LikeController{


    getAllLikes(req,res){
        const {postId}=req.body;
        const userId=req.userId;
        if(!userId){
            throw new ApplicationError(401,'You are not authorized to like the posts! Please login or register to continue'); 
        }
        if(!postId){
            throw new ApplicationError(404,'Post not found'); 
        }
        const post=PostModel.getById(postId);
        if(post){
        const likes=LikeModel.getAll(postId);
        if(likes<=0){
            res.status(200).send('No likes yet! Be the first one to like this post!');
        }else{
            res.status(200).send({likes:likes});
        }
    }else{
        throw new ApplicationError(404,'Post not found');
    }
    }

    likeToggler(req,res){
        const userId=req.userId;
        if(!userId){
            throw new ApplicationError(401,'You are not authorized to like the posts! Please login or register to continue'); 
        }
        const {postId}=req.body;

        if(!postId){
            throw new ApplicationError(404,'Post not found'); 
        }
        const post=PostModel.getById(postId);
        if(post){
        const result=LikeModel.toggleLike(userId,postId);
        res.status(200).send({status:"success",message:result});
        }else{
            throw new ApplicationError(404,'Post not found');
        }
    }
}