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
exports.listItem = asyncMiddleware(async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(404).json({ errors: errors.array() });
            return;
        }
        await List.create({
            nameListItem: req.body.nameListItem,
            descListItem: req.body.descListItem,
            isDoneListItem: req.body.isDoneListItem,
            LisidList: req.params.LisidList
            
        });
        res.status(201).send({
            status: "Listitem has been created"
        })
    } catch (err) {
        return next(err);
    }
})

//getlist

exports.showListItem = asyncMiddleware(async (req, res) => {
    const listItem = await ListItem.findAll({
        attributes: ["id", "nameListItem", "descListItem", "isDoneListItem", "ListidList"],
      
    });
    res.status(200).json({
        description: "All List",
        list: list
    })
})


//update list

exports.updateListItem = asyncMiddleware(async (req, res) => {
    await ListItem.update(
        {
            id: req.body.id,
            nameListItem: req.body.nameListItem,
            descListItem: req.body.descListItem,

       }
   )
});

exports.updateList = asyncMiddleware(async (req, res) => {
    const listItem = await ListItem.update({
      
        nameListItem: req.body.nameListItem,
        descListItem: req.body.descListItem,
        isDoneListItem: req.body.isDoneListItem,
        ListidList: req.body.ListidList
    },
        {
            where: {
                id: req.params.id
            }
        });
    res.status(201).send({
        status: "listItem has been update"
    })

});

exports.deleteList = asyncMiddleware(async (req, res) => {
    const lisItem = await ListItem.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(201).send({
        status: "List has been delete"
    })
})