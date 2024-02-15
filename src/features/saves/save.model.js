import PostModel from "../posts/post.model.js";


export default class SaveModel{

    constructor(id,postId,userId){
        this.id=id;
        this.postId=postId;
        this.userId=userId;
    }

    // static getAll(userId){
    //     const posts=PostModel.getAll();
    //     const saved= saves
    //     .filter((s) => s.userId == userId);

    //     return posts.filter(post=>post.id==saved.postId);
        
    // }
    static getAll(userId) {
        // Filter the saves array to get saved posts for the given userId
        const savedPosts = saves.filter(s => s.userId === userId);
    
        // Extract postId values from the saved posts
        const savedPostIds = savedPosts.map(savedPost => savedPost.postId);
    
        // Filter the posts array based on the extracted postId values
        const posts = PostModel.getAll().filter(post => savedPostIds.includes(post.id));
    
        return posts;
    }
    

    static toggleSave(postId, userId) {
        const savedPostIndex = saves.findIndex((save) => save.postId === postId && save.userId === userId);
        if (savedPostIndex === -1) {
            saves.push(new SaveModel(saves.length + 1, postId, userId));
            return { status: "Success", message: "Post Saved" };
        } else {
            saves.splice(savedPostIndex, 1);
            return { status: "Success", message: "Post UnSaved" };
        }
    }
    
}

var saves=[
    new SaveModel(1, 2, 2),
    new SaveModel(2, 1, 2),
    new SaveModel(3, 3, 1),
    new SaveModel(4, 2, 3),
]