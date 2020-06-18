const db = require("../config/db.js");
const config = require("../config/config.js");
const ROLEs = config.ROLEs;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  // -> Check Username is already in use
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send("Fail ->Email already taken!");
      return;
    }
      next();
  });
};


const signUpVerify = {};
signUpVerify.checkDuplicateEmail = checkDuplicateEmail;

module.exports = signUpVerify;