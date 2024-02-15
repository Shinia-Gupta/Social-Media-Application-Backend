export default class CommentModel {
  constructor(id, userId, postId, content) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.content = content;
  }

  static getAll(postId) {
    // Filter comments based on postId and return only the content
    return comments
      .filter((c) => c.postId == postId)
      .map((c) => c.content);
  }

  static add(userId, postId, content) {
    const newComment=new CommentModel(comments.length+1,userId,postId,content);
    comments.push(newComment);
    return newComment.content;
  }

  static update(id,userId, postId, content) {
    const commentToUpdateIndex=comments.findIndex(c=>c.id==id && c.postId==postId && c.userId==userId);
if(commentToUpdateIndex!=-1){
    comments[commentToUpdateIndex].content=content;
    return comments[commentToUpdateIndex].content;
}
return null;
  }

  static delete(id,userId, postId) {
    const commentToDeleteIndex=comments.findIndex(c=>c.id==id && c.postId==postId && c.userId==userId);
    if(commentToDeleteIndex!=-1){
        const commentDel= comments[commentToDeleteIndex].content;
        comments.splice(commentToDeleteIndex,1);
        return commentDel;
    }
    return null; 
  }
}

var comments = [
  new CommentModel(1, 1, 3, "Comment 1"),
  new CommentModel(2, 2, 2, "Comment 2"),
  new CommentModel(3, 3, 3, "Comment 3"),
  new CommentModel(4, 3, 1, "Comment 4"),
];
