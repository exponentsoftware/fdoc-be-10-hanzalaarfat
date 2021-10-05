const express = require("express");
const router = express.Router();
const likeController = require("../controller/likeController");
const viewController = require("../controller/viewController");
const ratingController = require("../controller/ratingController");
const commentController = require("../controller/commentController");
const tagController = require("../controller/tagController");

router.post("/like", likeController.addlikes);
// router.get("/like", likeController.getMostTodoLike);

router.post("/view", viewController.addViews);

router.post("/rating", ratingController.addRating);

router.get("/comment/:id", commentController.getcommentByTodoId);
router.put("/comment/:cid/:uid", commentController.updatetodoCommentByUser);
router.delete("/comment/:cid/:uid", commentController.deletCommentByUser);
router.post("/comment", commentController.addComment);

router.get("/tag/:id", tagController.getTagByTodoId);
router.put("/tag/:tid/:uid", tagController.updatetodoTagByUser);
router.delete("/tag/:tid/:uid", tagController.deletTagByUser);
router.post("/tag", tagController.addTag);

module.exports = router;
