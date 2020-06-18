const db = require("../config/db");
const config = require("../config/config");
const User = db.user;
const List = db.list;
const asyncMiddleware = require("express-async-handler");
const { validationResult } = require("express-validator/check");
const { body } = require("express-validator/check");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = asyncMiddleware(async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).json({ errors: errors.array() });
      return;
    }

    // Save User to Database
    //signup
    console.log("Processing func -> SignUp");
    await User.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 6),
    });
  } catch (err) {
    return next(err);
  }
  res.status(201).send({
    status: "User registered successfully!",
  });
});

exports.signin = asyncMiddleware(async (req, res) => {
  console.log("Sign-In");
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  const statusIsValid = (req.body.status, user.status);

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({
      auth: false,
      accessToken: null,
      reason: "Invalid Password!",
    });
  }
  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400,
  });
  res.status(200).send({
    auth: true,
    type: "Bearer",
    accessToken: token,
    id: user.id,
  });
});
