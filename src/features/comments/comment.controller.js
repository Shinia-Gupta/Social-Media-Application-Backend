import { ApplicationError } from "../../error handler/applicationError.js";
import PostModel from "../posts/post.model.js";
import CommentModel from "./comment.model.js";

export default class CommentController {
  getAllComments(req, res) {
    const { postId } = req.query;
    const post = PostModel.getById(postId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    if (!post) {
      throw new ApplicationError(404, "Post not found!");
    }
    const comments = CommentModel.getAll(postId).slice(startIndex, endIndex);
    if (comments.length == 0) {
      res.status(200).send({ message: "No comments on this post yet! " });
    } else {
      res.status(200).send({ comments: comments });
    }
  }

  addComment(req, res) {
    const userId = req.userId;
    if (!userId) {
      throw new ApplicationError(
        401,
        "You are unauthorized to comment on this post! Please login to continue"
      );
    }
    const { postId, content } = req.body;
    const commentAdded = CommentModel.add(userId, postId, content);
    if (commentAdded) {
      res.status(201).send(`You commented ${commentAdded} on post ${postId}`);
    }
  }

  updateComment(req, res) {
    const userId = req.userId;
    if (!userId) {
      throw new ApplicationError(
        401,
        "You are unauthorized to update comment on this post! Please login to continue"
      );
    }
    const { id, postId, content } = req.body;
    const commentUpdated = CommentModel.update(id, userId, postId, content);
    if (!commentUpdated) {
      res
        .status(200)
        .send({
          message:
            "You are trying to update a post's comment which either does not exist or you are not authorizaed to update it",
        });
    } else {
      res.status(200).send({ comment_updated: commentUpdated });
    }
  }

  deleteComment(req, res) {
    const userId = req.userId;
    if (!userId) {
      throw new ApplicationError(
        401,
        "You are unauthorized to delete comment on this post! Please login to continue"
      );
    }
    const { id, postId } = req.body;
    const commentDeleted = CommentModel.delete(id, userId, postId);
    if (!commentDeleted) {
      res
        .status(200)
        .send({
          message:
            "You are trying to delete a post's comment which either does not exist or you are not authorizaed to delete it",
        });
    } else {
      res.status(200).send({ comment_deleted: commentDeleted });
    }
  }
}
