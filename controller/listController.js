const db = require("../config/db");
const config = require("../config/config");
const List = db.list;
const User = db.user;
const ListItem = db.listItem;

const asyncMiddleware = require("express-async-handler");
const { validationResult } = require("express-validator/check");
const { body } = require("express-validator/check");

// const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//post list
exports.list = asyncMiddleware(async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(404).json({ errors: errors.array() });
      return;
    }
    await List.create({
      nameList: req.body.nameList,
      colorHexList: req.body.colorHexList,
      statusList: req.body.statusList,
    });
    res.status(201).send({
      status: "List has been created",
    });
  } catch (err) {
    return next(err);
  }
});

//getlist

exports.showList = asyncMiddleware(async (req, res) => {
  const list = await List.findAll({
    attributes: ["id", "nameList", "colorHexList", "statusList"],
    include: [
      {
        model: User,
        attributtes: ["email"],
        include: [
          {
            model: ListItem,
            attributes: [
              "id",
              "ListidList",
              "nameListItem",
              "descListItem",
              "isDoneListitem",
            ],
          },
        ],
      },
    ],
  });
  res.status(200).json({
    description: "All List",
    list: list,
  });
});

//get list by id
exports.showListId = asyncMiddleware(async (req, res) => {
  const list = await List.findOne({
    where: { id: req.params.id },
    attributes: ["id", "nameList", "colorHexList", "statusList"],
  });
  res.status(200).json({
    description: "List by id",
    list: list,
  });
});

//update list

exports.updateListById = asyncMiddleware(async (req, res) => {
  const list = await List.update(
    {
      statusList: req.body.statusList,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  if (list.statusList === true) {
    return res.status(201).send({
      reason: "active",
    });
  } else {
    return res.status(400).send({
      reason: "unarchive",
    });
  }
});

exports.updateList = asyncMiddleware(async (req, res) => {
  const list = await List.update({
    id: req.body.id,
    nameList: req.body.nameList,
    colorHexList: req.body.colorHexList,
  });
  res.status(201).send({
    status: "list has been update",
    list: list,
  });
});

exports.deleteList = asyncMiddleware(async (req, res) => {
  const list = await List.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(201).send({
    status: "List has been delete",
  });
});
