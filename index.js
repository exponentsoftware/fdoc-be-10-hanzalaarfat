const express = require("express");
const db = require("./Models");
const env = require("dotenv");
const crypto = require("crypto");
const User = db.user;
const Payment = db.payment;
env.config();

const Razorpay = require("razorpay");
const Vonage = require("@vonage/server-sdk");
// This razorpayInstance will be used to
// access any resource from razorpay
const razorpayInstance = new Razorpay({
  // Replace with your key_id
  key_id: process.env.key_id,

  // Replace with your key_secret
  key_secret: process.env.key_secret,
});

/// for sms
const vonage = new Vonage({
  apiKey: process.env.apiKey,
  apiSecret: process.env.apiSecret,
});

const todoRoute = require("./router/todorouter");
const userRoute = require("./router/userRouter");
const adminRoute = require("./router/adminRoute");
const likeRoute = require("./router/likeRouter");

const app = express();
app.use(express.json());
db.sequelize.sync();
// db.sequelize.sync({ force: true });
app.use(express.static(__dirname));

app.use("/todo", todoRoute);

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/user", likeRoute);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/" + "index.html");
});
app.post("/createOrder", (req, res) => {
  // STEP 1:
  const { amount, currency, receipt, notes } = req.body;

  // STEP 2:
  razorpayInstance.orders.create(
    { amount, currency, receipt, notes },
    (err, order) => {
      //STEP 3 & 4:
      if (!err) res.json(order);
      else res.send(err);
    }
  );
});

app.post("/verifyOrder", (req, res) => {
  // STEP 7: Receive Payment Data
  let verifyMsg =
    "This message is to confirm that Your Orderd successfully placed";
  const { order_id, payment_id, amount, userId, phone } = req.body;
  const razorpay_signature = req.headers["x-razorpay-signature"];

  // Pass yours key_secret here
  const key_secret = process.env.key_secret;

  // STEP 8: Verification & Send Response to User

  // Creating hmac object
  let hmac = crypto.createHmac("sha256", key_secret);

  // Passing the data to be hashed
  hmac.update(order_id + "|" + payment_id);

  // Creating the hmac in the required format
  const generated_signature = hmac.digest("hex");

  if (razorpay_signature === generated_signature) {
    User.update(
      { subsription: new Date(), amount: amount },
      { where: { userId: userId } }
    )
      .then((result) => {
        if (result) {
          console.log("update user");
          const payment = {
            orderId: order_id,
            paymentId: payment_id,
            amount: amount,
            userId: userId,
          };
          Payment.create(payment)
            .then((data) => {
              if (data) {
                console.log("add payment");

                const from = "VIRTUAL_NUMBER";
                const to = phone;
                vonage.message.sendSms(
                  from,
                  to,
                  verifyMsg,
                  (err, responseData) => {
                    if (err) {
                      console.log(err);
                      console.log("message err send");
                    } else {
                      console.log("message successfully send");
                      console.dir(responseData);
                    }
                  }
                );

                res.json({
                  success: true,
                  message: "Payment has been verified",
                });
              }
              res.json({
                success: false,
                message: "Payment verification failed",
              });
            })
            .catch((err) => {
              res.json({
                success: false,
                message: "Payment verification failed",
              });
            });
        } else {
        }
      })

      .catch((err) => res.status(400).json({ error: err }));
  } else {
    res.json({
      success: false,
      message: "Payment verification failed",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is up and running at the port 3000");
});
