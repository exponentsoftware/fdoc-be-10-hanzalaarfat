const { user } = require("../Models");
const db = require("../Models");
const Todo = db.todo;
const User = db.user;

exports.addtodo = async (req, res) => {
  try {
    const { userId, username, title, category, status = false } = req.body;
    /// category = shudld be this value "task", "hobby", "work"],
    //console.log(title, category);
    const todalen = await db.todo.findAll({ where: { userId: userId } });
    // res.status(200).json({ to: todalen.length });
    if (todalen.length < 2) {
      const user = await User.findByPk(userId);
      console.log(user);
      if (user) {
        const todo = {
          username,
          title,
          category,
          userId,
          status,
        };

        Todo.create(todo)
          .then((data) => {
            return res.status(201).json({
              message: "Successfully addded a Todo",
              todo: data,
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Todo.",
            });
          });
      } else {
        res.status(500).send({
          message: " userid not found. must be enter correct userid",
        });
      }
    } else {
      res.status(500).send({
        message: " limit exceed",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Todo.",
    });
  }
};

/////////////////////////////// getAll Todo by user id /////////////////////////////////////////////////////
exports.getAllTodoById = async (req, res) => {
  let userId = req.params.userId;
  const { page = 1, limit = 2 } = req.query; ///////////Pagination

  const todo = await Todo.findAll({
    where: { userId: userId },
    attributes: ["todoId", "title", "status", "username", "category"],
    include: [
      {
        model: User,
        as: "userDetails",
        attributes: ["userId", "username", "email"],
      },
    ],
    limit: limit,
    offset: page,
  });
  if (todo) {
    console.log("after op", limit);
    // console.log("rows", todo.rows.length);
    const record_count = todo;
    res
      .status(200)
      .json({ success: true, total: record_count, todo, pageNo: page });
  } else {
    res.status(404).json({
      success: false,
      message: `Not Found any Todo Data`,
    });
  }
};

/////////////////////////////// update Todo by todo id /////////////////////////////////////////////////////

exports.updatetodo = async (req, res) => {
  try {
    let todoId = req.params.todoId;
    //// before req.body validate then update
    Todo.update(req.body, { where: { id: todoId } })
      .then((result) =>
        res.status(200).json({ success: true, message: result })
      )
      .catch((err) => res.status(400).json({ error: err }));
  } catch (err) {
    res.status(404).json({
      success: false,
      message: `Not update Todo Data`,
    });
  }
};

exports.deletetodo = async (req, res) => {
  try {
    let id = req.params.id;
    const todo = await Todo.destroy({ where: { id: id } });
    console.log(todo);
    if (todo) {
      res.status(201).json({ success: true, message: "Todo removed", todo });
    } else {
      res.status(204).json({ success: false, message: "not deleted todo" });
    }
  } catch (err) {
    res.status(204).json({ success: false, message: "not deleted todo", err });
  }
};

////////////////////////// For Admin //////////////////////
exports.getalltodo = async (req, res) => {
  const todo = await User.findAll({
    attributes: ["userId", "username", "email"],
    include: [
      {
        model: Todo,
        as: "todoDetails",
        attributes: ["todoId", "title", "status", "username", "category"],
      },
    ],
  });
  if (!todo) {
    res.status(404).json({ success: false, message: "Not Found any Todo" });
  }
  res
    .status(200)
    .json({ success: true, message: "All User's todos", user: todo });

  res.status(200).json({ todo });
};
