**Code test SIJI SOLUSI DIGITAL**

untuk menjalankan code yang telah dibuat,

1. npm install
2. file env.js di folder config disesuaikan dengan mysql client yang dipunya,
3. untuk menjalankan code, dan migrate tabel ke database, pada file index.js uncomment
   \*const db = require("./config/db.js");
   const Role = db.role;

// //force: true will drop the table if it already exists (comment this part after first run, to disable migration)
db.sequelize.sync({ force: true }).then(() => {
console.log("Drop and Resync with { force: true }");
// // initial(); });\*

4.  jalankan node index.js
5.  test api dapat dilakukan menggunakan postman
