import SaveModel from "./save.model.js";
import PostModel from "../posts/post.model.js";
import { ApplicationError } from "../../error handler/applicationError.js";
export default class SaveController{

    getAllSavedPosts(req,res){
        const userId=req.userId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const savedPosts=SaveModel.getAll(userId).slice(startIndex,endIndex);
        if(savedPosts.length==0){
            res.status(200).send('No saved posts');
        }else{
            return res.status(200).send(savedPosts);
        }
    }

    savePosts(req,res){
        const {postId}=req.query;
        const userId=req.userId;
        if(!userId){
            throw new ApplicationError(401,'Unauthorized! Please login to continue');
           }
        const postToSave=PostModel.getById(postId);
        
        if(!postToSave){
            throw new ApplicationError(404,'Post not found!');
        }else{
            const postSaved=SaveModel.toggleSave(postId,userId);
            res.status(200).send(postSaved);
        }
      }

      
}