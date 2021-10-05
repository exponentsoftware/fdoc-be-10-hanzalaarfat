const db = require("../Models");
const Like = db.like;

exports.addlikes = async (req, res) => {
  try {
    const { userId, todoId } = req.body;

    const todo_like = await Like.findOne({ where: { todoId: todoId } });
    // console.log(todo_like.dataValues["userId"]);
    if (!todo_like || !todo_like.dataValues["userId"]) {
      // viewed_by = []
      const like = new Like({
        userId,
        todoId,
      });
      like.save().then(async (todo, error) => {
        if (todo) {
          let liked = await Like.increment("liked", {
            by: 1,
            where: { todoId: todoId },
          });
          return res.status(201).json({
            message: `liked_by ${userId} added successfully`,
          });
        }
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }
      });
    } else {
      const todo_like = await Like.findOne({
        where: { todoId: todoId, userId: userId },
      });
      if (!todo_like) {
        const like = new Like({
          userId,
          todoId,
        });
        like.save().then(async (todo, error) => {
          if (todo) {
            let liked = await Like.increment("liked", {
              by: 1,
              where: { todoId: todoId },
            });
            return res.status(201).json({
              message: `liked_by ${userId} added successfully`,
            });
          }
          if (error) {
            return res.status(400).json({
              message: "Something went wrong",
            });
          }
        });
      } else {
        return res.status(400).json({
          message: `already liked_by this user id : ${userId}`,
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while liking the Todo.",
    });
  }
};
