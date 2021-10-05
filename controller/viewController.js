const db = require("../Models");
const View = db.view;

exports.addViews = async (req, res) => {
  try {
    const { userId, todoId } = req.body;

    const todo_view = await View.findOne({ where: { todoId: todoId } });
    // console.log(todo_view.dataValues["userId"]);
    if (!todo_view || !todo_view.dataValues["userId"]) {
      // viewed_by = []
      const view = new View({
        userId,
        todoId,
      });
      view.save().then(async (todo, error) => {
        if (todo) {
          let viwed = await View.increment("view", {
            by: 1,
            where: { todoId: todoId },
          });
          return res.status(201).json({
            message: `view_by ${userId} added successfully`,
          });
        }
        if (error) {
          return res.status(400).json({
            message: "Something went wrong",
          });
        }
      });
    } else {
      const todo_view = await View.findOne({
        where: { todoId: todoId, userId: userId },
      });
      if (!todo_view) {
        const view = new View({
          userId,
          todoId,
        });
        view.save().then(async (todo, error) => {
          if (todo) {
            let viwed = await View.increment("view", {
              by: 1,
              where: { todoId: todoId },
            });
            return res.status(201).json({
              message: `view_by ${userId} added successfully`,
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
          message: `Already viewed by this id: ${userId}`,
        });
      }
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while liking the Todo.",
    });
  }
};
