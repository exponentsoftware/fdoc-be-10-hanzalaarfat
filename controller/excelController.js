const db = require("../Models");
const User = db.user;
const Todo = db.todo;
const Comment = db.comment;

const excel = require("exceljs");

exports.allUserexcel = (req, res) => {
  let users = [];
  User.findAll({
    attributes: ["userId", "username", "email"],
    include: [
      {
        model: Todo,
        as: "todoDetails",
        attributes: ["todoId", "title", "status", "username", "category"],
      },
    ],
  }).then((data) => {
    data.forEach((user) => {
      users.push({
        userId: user.userId,
        email: user.email,
        username: user.username,
      });
    });
    // res.status(200).json({ users, mess: typeof users });
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("User");

    worksheet.columns = [
      { header: "Id", key: "userId", width: 5 },
      { header: "Email", key: "email", width: 25 },
      { header: "User Name", key: "username", width: 25 },
    ];

    // worksheet.columns = [
    //   { header: "Id", key: "id", width: 5 },
    //   { header: "Email", key: "email", width: 25 },
    //   { header: "Date", key: "date", width: 25 },
    //   { header: "Title", key: "title", width: 25 },
    //   { header: "Status", key: "status", width: 25 },
    //   { header: "Category", key: "category", width: 25 },
    // ];

    // Add Array Rows
    worksheet.addRows(users);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "users.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};
exports.getalltodoExcel = async (req, res) => {
  let todos = [];
  const todo = await Todo.findAll();
  if (!todo) {
    res.status(404).json({ success: false, message: "Not Found any Todo" });
  }
  todo.forEach((obj) => {
    todos.push({
      todoId: obj.TodoId,
      title: obj.title,
      status: obj.status ? "Complited" : "Not Compalited",
      username: obj.username,
      category: obj.category,
    });
  });
  console.log(todos);
  let workbook = new excel.Workbook();
  let worksheet = workbook.addWorksheet("Todo");

  worksheet.columns = [
    { header: "ToIdo", key: "todoId", width: 25 },
    { header: "Title", key: "title", width: 25 },
    { header: "status", key: "status", width: 25 },
    { header: "UserName", key: "username", width: 25 },
    { header: "Category", key: "category", width: 25 },
  ];

  worksheet.addRows(todo);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=" + "todo.xlsx");

  return workbook.xlsx.write(res).then(function () {
    res.status(200).end();
  });
};

exports.commentExcel = async (req, res) => {
  const comment = await Comment.findAll();

  let Comments = [];

  comment.forEach((obj) => {
    Comments.push({
      commentId: obj.commentId,
      comment: obj.comment,
      userId: obj.userId,
      todoId: obj.todoId,
    });
  });

  let workbook = new excel.Workbook();
  let worksheet = workbook.addWorksheet("Comments");

  worksheet.columns = [
    { header: "commentId", key: "commentId", width: 25 },
    { header: "Comment", key: "comment", width: 25 },
    { header: "UserId", key: "userId", width: 25 },
    { header: "TodoId", key: "todoId", width: 25 },
  ];

  // Add Array Rows
  worksheet.addRows(Comments);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + "comments.xlsx"
  );

  return workbook.xlsx.write(res).then(function () {
    res.status(200).end();
  });
};
