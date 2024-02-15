import { ApplicationError } from "../../error handler/applicationError.js";
import PostModel from "./post.model.js";


export default class PostController{


    getAllPosts(req,res){     
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const posts=PostModel.getAll().slice(startIndex,endIndex);
        res.status(200).send(JSON.stringify(posts));
    }

    getPostByUser(req,res){
        const userId=req.userId;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const userPosts=PostModel.getByUser(userId).slice(startIndex,endIndex);
        if(userPosts.length==0){
            res.status(200).send('No posts yet');
        }else{
            res.status(200).send(userPosts);
        }
    }

    getPostById(req,res){
        const {postId}=req.query;
        const post=PostModel.getById(postId);
        if(!post){
            throw new ApplicationError(404,'No post found! ');
        }else{
return res.status(200).send(post);
        }
    }


    addPost(req,res){
        const userId=req.userId;    //pending jwtAuth
        if(!userId){
            throw new ApplicationError(401,'Unauthorized! Please login to continue');
           }
        const {caption}=req.body;
        const imageUrl=req.file.filename;   
        const result=PostModel.add(userId,caption,imageUrl);
        res.status(201).send({message:'Post added Successfully',post:result});

    }

  updatePost(req,res){
    const userId=req.userId;
   if(!userId){
    throw new ApplicationError(401,'Unauthorized! Please login to continue');
   }
   console.log(userId);
   console.log(req.body);
    const {postId,caption}=req.body;
    const imageUrl=req.file.filename;
    const postUpdated=PostModel.update(postId,userId,caption,imageUrl);
    if(!postUpdated){
        throw new ApplicationError(404,'Post not found!');
    }else{
        res.status(200).send({message:"Post updated successfully!",Updated_post:postUpdated});
    }
  }  

  deletePost(req,res){
    const {postId}=req.query;
    const userId=req.userId;
    if(!userId){
        throw new ApplicationError(401,'Unauthorized! Please login to continue');
       }
    const postDeleted=PostModel.delete(postId,userId);
    if(!postDeleted){
        throw new ApplicationError(404,'Post not found!');
    }else{
        res.status(200).send({message:"Post deleted successfully!",Deleted_post:postDeleted});
    }
  }

  filterPosts(req,res){
    const {caption}=req.query;
    const posts=PostModel.getByCaption(caption);
    if(posts.length==0){
        res.status(200).send('No posts with this caption yet');
    }else{
        res.status(200).send(posts);
    }

  }



}