const { mongoose } = require("mongoose");

const database = mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "nativebuddy",
  })
  .then((result) => {
    console.log(`database Connected on ${result.connection.host}`);
  })
  .catch((err) => {
    console.log("Failed to connect !!! ", err);
  });

module.exports = database;
