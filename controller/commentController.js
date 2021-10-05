const db = require("../Models");

const Comment = db.comment;
exports.addComment = async (req, res) => {
  const { userId, todoId, comment } = req.body;
  try {
    //console.log(userId, todoId);
    const newComment = new Comment({
      userId,
      todoId,
      comment,
    });
    newComment.save().then((comment, error) => {
      if (comment) {
        return res.status(201).json({
          message: `commented by this User id:  ${userId} added successfully`,
        });
      }
      if (error) {
        return res.status(400).json({
          message: "Comment in not added",
          error,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while adding comment on the todo.",
    });
  }
};

exports.getcommentByTodoId = async (req, res) => {
  try {
    let id = req.params.id;
    const comment = await Comment.findAll({ where: { todoId: id } });
    if (!comment) {
      res.status(404).json({
        success: false,
        message: `Not Found any comment on this todo id : ${id} `,
      });
    }
    res.status(200).json({
      success: true,
      message: `All Comment on this todo id : ${id}`,
      comment,
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while getting comment the Todo.",
    });
  }
};

exports.updatetodoCommentByUser = async (req, res) => {
  try {
    let { cid, uid } = req.params;
    Comment.update(req.body, {
      where: { commentId: cid, userId: uid },
    })
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

exports.deletCommentByUser = async (req, res) => {
  try {
    let { cid, uid } = req.params;
    Comment.destroy({ where: { commentId: cid, userId: uid } })
      .then((result) =>
        res.status(200).json({ success: true, message: `comment removed ` })
      )
      .catch((err) => res.status(400).json({ error: err }));
  } catch (err) {
    res.status(404).json({
      success: false,
      message: `Not removed Comment Data`,
    });
  }
};
