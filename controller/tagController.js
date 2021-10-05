const db = require("../Models");

const Tag = db.tag;
exports.addTag = async (req, res) => {
  const { userId, todoId, tagTitle } = req.body;
  try {
    //console.log(userId, todoId);
    const newTag = new Tag({
      userId,
      todoId,
      tagTitle,
    });
    newTag.save().then((tag, error) => {
      if (tag) {
        return res.status(201).json({
          message: `taged by this User id:  ${userId} added successfully`,
        });
      }
      if (error) {
        return res.status(400).json({
          message: "tag is not added",
          error,
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while adding Tag on the todo.",
    });
  }
};

exports.getTagByTodoId = async (req, res) => {
  try {
    let id = req.params.id;
    const tag = await Tag.findAll({ where: { todoId: id } });
    if (!tag) {
      res.status(404).json({
        success: false,
        message: `Not Found any tag on this todo id : ${id} `,
      });
    }
    res.status(200).json({
      success: true,
      message: `All tag on this todo id : ${id}`,
      tag,
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while getting comment the Todo.",
    });
  }
};

exports.updatetodoTagByUser = async (req, res) => {
  try {
    let { tid, uid } = req.params;
    Tag.update(req.body, {
      where: { tagId: tid, userId: uid },
    })
      .then((result) =>
        res.status(200).json({ success: true, message: result })
      )
      .catch((err) => res.status(400).json({ error: err }));
  } catch (err) {
    res.status(404).json({
      success: false,
      message: `Not update tag Todo Data`,
    });
  }
};

exports.deletTagByUser = async (req, res) => {
  try {
    let { tid, uid } = req.params;
    Tag.destroy({ where: { tagId: tid, userId: uid } })
      .then((result) =>
        res.status(200).json({ success: true, message: `Tag removed ` })
      )
      .catch((err) => res.status(400).json({ error: err }));
  } catch (err) {
    res.status(404).json({
      success: false,
      message: `Not removed Tag Data`,
    });
  }
};
