const app = require("./app.js");
const connetDB = require("./data/database.js");

connetDB;

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
