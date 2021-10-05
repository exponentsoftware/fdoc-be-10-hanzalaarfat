const Active = require("./Models/Active_user");
const ActiveWeek = require("./Models/CrrentWeek");
exports.update_Expiry_day = async (res, token, _id, email, name, user) => {
  ///////////////////////////////// ager expiry h to dirct login kara dega //////////
  const expiryExist = await Active.findOne({ _id: _id });
  if (expiryExist) {
    return res.status(200).json({ token, _id, email, name, user });
  } else {
    const active = new Active({
      _id,
      name,
      lastlogin: new Date(),
    });
    const userRegister = await active.save();
    if (userRegister) {
      // return res.status(200).json({ token, _id, email, name, user });
    } else {
      return res.status.json({
        message: "incoreet usr or email",
      });
    }
  }
};
