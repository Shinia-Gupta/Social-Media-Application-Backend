export default class LikeModel {
  constructor(id, userId, postId) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
  }

  static getAll(postId) {
    const likeCount = likes.reduce((acc, like) => {
      if (like.postId == postId) {
        acc++;
      }
      return acc;
    }, 0);
    return likeCount;
  }

  static toggleLike(userId, postId) {
    const like=likes.findIndex(like=>like.userId==userId && like.postId==postId);
    if(like!==-1){
        likes.splice(like,1);
        return "like removed ";
    }else{
        likes.push(new LikeModel(likes.length+1,userId,postId));
        return "liked";
    }

  }
}

var likes = [
  new LikeModel(1, 2, 2),
  new LikeModel(2, 1, 2),
  new LikeModel(3, 3, 1),
  new LikeModel(4, 2, 3),
];
