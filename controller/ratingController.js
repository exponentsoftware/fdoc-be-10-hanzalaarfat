const db = require("../Models");
// const User = db.user;
// const Comment = db.comment;
// const Todo = db.todo;
const Rating = db.rating;
// const Rating = db.like;

exports.addRating = async (req, res) => {
  const { userId, todoId, rating } = req.body;
  try {
    //console.log(userId, todoId);

    const todo_rating = await db.rating.findOne({
      where: { todoId: todoId },
    });
    // console.log(todo_rating.dataValues);
    if (!todo_rating || !todo_rating.dataValues["userId"]) {
      // viewed_by = []
      const ratings = new Rating({
        userId,
        todoId,
        rating,
      });
      ratings.save().then((todo, error) => {
        if (todo) {
          return res.status(201).json({
            message: `Rated by this User id:  ${userId} added successfully`,
          });
        }
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }
      });
    } else {
      const todo_rating = await db.rating.findOne({
        where: { todoId: todoId, userId: userId },
      });
      if (!todo_rating) {
        // viewed_by = []
        const ratings = new Rating({
          userId,
          todoId,
          rating,
        });
        ratings.save().then((todo, error) => {
          if (todo) {
            return res.status(201).json({
              message: `Rated by this User ${userId} added successfully`,
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
          message: `Already rated by this id: ${userId}`,
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while liking the Todo.",
    });
  }
};
