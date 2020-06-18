const verifySignUp = require("./verifySignUp");
const authJwt = require("./verifyJwtToken");
const authController = require("../controller/authController.js");
const listController = require("../controller/listController");
const listItemController = require("../controller/listItemController");

module.exports = function (app) {
  app.post(
    "/api/signup",
    [verifySignUp.checkDuplicateEmail],
    authController.signup
  );
  app.post("/api/signin", authController.signin);

  //list
  app.post("/api/list", [authJwt.verifyToken], listController.list);

  app.get("/api/list", [authJwt.verifyToken], listController.showList);
  app.get("/api/list/:id", [authJwt.verifyToken], listController.showListId);
  app.put("/api/list/:id", [authJwt.verifyToken], listController.updateList);
  app.delete("/api/list/:id", [authJwt.verifyToken], listController.deleteList);

  //list item

  app.post("/api/listItem", [authJwt.verifyToken], listItemController.listItem);

  app.get(
    "/api/listItem",
    [authJwt.verifyToken],
    listItemController.showListItem
  );
  app.put(
    "/api/listItem",
    [authJwt.verifyToken],
    listItemController.updateListItem
  );
  app.put(
    "/api/listItem/:id",
    [authJwt.verifyToken],
    listItemController.updateList
  );
  app.delete(
    "/api/listItem/:id",
    [authJwt.verifyToken],
    listItemController.deleteList
  );
};
