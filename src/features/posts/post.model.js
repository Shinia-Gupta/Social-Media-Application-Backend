import UserModel from "../users/user.model.js";

export default class PostModel {
  constructor(id, userId, caption, imageUrl) {
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
    this.save = false;
    this.archive = false;
  }

  static getAll() {
    return posts;
  }

  static getByUser(userId) {
    return posts.filter((post) => post.userId == userId);
  }

  static getById(postId) {
    return posts.find((post) => post.id == postId);
  }

  static add(userId, caption, imageUrl) {
    // const userId=req.userId
    const id = posts.length + 1;
    const newPost = new PostModel(id, userId, caption, imageUrl);
    posts.push(newPost);
    return newPost;
  }

  static update(postId, userId, caption, imageUrl) {
    const postExistingIndex = posts.findIndex(
      (post) => post.id == postId && post.userId == userId
    );
    if (postExistingIndex != -1) {
      posts[postExistingIndex].caption = caption;
      posts[postExistingIndex].imageUrl = imageUrl;
    }
    return posts[postExistingIndex];
  }

  static delete(postId, userId) {
    const postExistingIndex = posts.findIndex(
      (post) => post.id == postId && post.userId == userId
    );
    if (postExistingIndex != -1) {
      posts.splice(postExistingIndex, 1);
    }
    return posts[postExistingIndex];
  }

  static getByCaption(caption) {
    return posts
      .filter((post) => post.caption.includes(caption))
      .map((post) => ({
        userId: post.userId,
        caption: post.caption,
        imageUrl: post.imageUrl,
      }));
  }


}

var posts = [
  new PostModel(1, 1, "Post 1 caption1", "img1.jpg"),
  new PostModel(2, 3, "Post 2 caption", "img2.jpg"),
  new PostModel(3, 2, "Post 3 caption1", "img3.jpg"),
  new PostModel(4, 1, "Post 4 caption", "img4.jpg"),
];
