const User = require("../models/user");
const PrizeOwner = require("../models/prizeOwner");
const Prize = require("../models/prize");

exports.getUser = (req, res) => {
  const userId = req.body?.userId;
  User.findById(userId)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.log(err));
};

exports.getPrizes = (req, res) => {
  Prize.find()
    .then((allPrize) => {
      res.json(allPrize);
      // console.log(allPrize);
    })
    .catch((err) => console.log(err));
};

exports.postLatestPrize = (req, res) => {
  const user = req.body.user;

  PrizeOwner.findOne({ user: user }).then((userDoc) => {
    if (userDoc) {
      res.json(userDoc);
    }
  });
};

exports.postUser = (req, res) => {
  const user = req.body.user;

  if (user) {
    User.findOne({ "user.email": user.email })
      .then((userDoc) => {
        if (userDoc?.user.email === user?.email) {
          res.json(userDoc);
          User.deleteOne({ userDoc }, (err) => {
            if (err) {
              console.log(err);
            } else {
              // console.log("no err");
            }
          });
          return;
        } else {
          const newUser = new User({ user: user });
          newUser
            .save()
            .then(() => {
              res.cookie("user", newUser);
              res.json(newUser);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => console.log(err));
  }
};

exports.postPrize = (req, res) => {
  const user = req.body?.user;
  const prize = req.body?.prize;

  PrizeOwner.findOneAndUpdate(
    { "user.email": user?.email },
    {
      $push: { prize: prize },

      $set: { user: user },
    },
    { new: true }
  ).then((userDoc) => {
    if (userDoc) {
      res.json(userDoc);
      console.log("user found");
    } else {
      const newPrizeOwner = new PrizeOwner({ user: user, prize });
      newPrizeOwner.save().then(() => {
        console.log("prize Owner saved");
        res.json(newPrizeOwner);
      });
    }
  });
};

// exports.deleteUser = (req, res) => {
//   console.log("iuwfiuwaiufiufhawfi");
//   const user = req.body.user;
//   console.log(user);
//   User.findByIdAndRemove(user?._id)
//     .then(() => {
//       console.log("User deleted");
//     })
//     .catch((err) => console.log(err));
// };
