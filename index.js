import express from "express";
import bodyParser from "body-parser";
import swagger from 'swagger-ui-express';

import userRouter from "./src/features/users/user.routes.js";
import postRouter from "./src/features/posts/post.routes.js";
import commentRouter from "./src/features/comments/comment.routes.js";
import likeRouter from "./src/features/likes/like.routes.js";
import saveRouter from "./src/features/saves/save.routes.js";

import { ApplicationError } from "./src/error handler/applicationError.js";
import jwtAuth from "./src/middlewares/jwtAuth.middleware.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";

import apiDocs from "./swagger.json" assert {type:'json'};

const app = express();

app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use('/api-docs',swagger.serve,swagger.setup(apiDocs));

app.use("/api/users", userRouter);
app.use("/api/posts", jwtAuth, postRouter);
app.use("/api/comments", jwtAuth, commentRouter);
app.use("/api/likes", jwtAuth, likeRouter);
app.use("/api/saves", jwtAuth, saveRouter);


app.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).send(err.message);
  }
  console.log(err);
  res.status(500).send("Internal Server Error! Please try again later! ");
});

app.use((req, res) => {
  res
    .status(404)
    .send(
      "API not found!Please check our documentation for more information at http://localhost:3200/api-docs "
    );
});
export default app;
