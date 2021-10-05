const express = require("express");
// const mongoose = require('mongoose')

const db = require("../Models");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const env = require("dotenv");
const date = require("../datefarmat");
env.config();

exports.signup = async (req, res, next) => {
  const { email, password, username, role = "user", phone } = req.body;

  try {
    const user = await db.user.findOne({ where: { email: email } });

    if (!user) {
      const newUser = new db.user({
        email,
        password,
        username,
        role,
        phone,
        date: date.currentDate,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            console.log(newUser);

            res.status(200).json({ message: "User Registered Successfully" });
          });
        });
      });
    } else {
      res.send("alredy email exist");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.login = async function (req, res, next) {
  const { email, password, username, role, phone } = req.body;

  //Check If User Exists
  // await db.user.find({ email: email }).exec((err, user) => {
  try {
    const user = await db.user.findOne({ where: { email: email } });
    console.log("email", email);
    console.log("user", user);
    if (user) {
      console.log("lll", user);
      bcrypt.compare(password, user.password, async (err, isMatch) => {
        console.log("alllmacth", user.dataValues);
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign(
            { _id: user._id, user: user.dataValues },
            process.env.SECRET_KEY,
            {
              expiresIn: "24h",
            }
          );
          console.log(user.id);
          res.status(200).json({ token, user: user.dataValues });

          // res.status(200).json({ token, userid: user.id })
          // const active_usr = await db.activeuser.findAndCountAll({
          //   where: { userId: user.id },
          // });
          // console.log("active usr", active_usr.count);
          // if (active_usr.count == 0) {
          //   console.log("Active user block", active_usr.count);
          //   const activeuser = new db.activeuser({
          //     day: day,
          //     month: month,
          //     userId: user.id,
          //   });
          //   activeuser.save().then((active) => {
          //     res.status(200).json({ token, userid: user.id });
          //   });
          // } else {
          //   res.status(200).json({ token, userid: user.id });
          // }
        } else {
          return res.status(403).json({ message: "Wrong Password" });
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
};
