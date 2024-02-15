import jwt from 'jsonwebtoken';
import { ApplicationError } from '../error handler/applicationError.js';

const jwtAuth=(req,res,next)=>{
    const token=req.headers['authorization'];   //want to take it from payload or cookie...
// const token=res.cookie.jwtToken;
    if(!token){
        throw new ApplicationError(401,"Unauthorized access can not be granted! Please login or register!");
    }

    try {
        const payload=jwt.verify(token,'UniqueBlogToken#2024');
        console.log(payload);
        req.userId=payload.userId;
    } catch (error) {
        throw new ApplicationError(401,"Please login or register to continue!") //add error handler middleware to the pipeline?
    }
    next();
}

export default jwtAuth;