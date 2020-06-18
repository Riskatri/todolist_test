const env = require("./env.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  logging: false,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../model/user")(sequelize, Sequelize);
db.list = require("../model/list")(sequelize, Sequelize);
db.listItem = require("../model/listItem")(sequelize, Sequelize);

db.user.hasMany(db.list, {
  foreignKey: "userId",
});

db.list.hasMany(db.listItem, {
  foreignKey: "ListidList",
});

db.user.hasMany(db.listItem, {
  foreignKey: "userId",
});

db.list.belongsTo(db.user, {
  foreignKey: "userId",
});

db.listItem.belongsTo(db.list, {
  foreignKey: "ListidList",
});

db.listItem.belongsTo(db.user, {
  foreignKey: "userId",
});

module.exports = db;
