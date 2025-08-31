// const http = require('http')//it import the http package,  no need to install it's build in package
require("dotenv").config();
const app = require("./app");
const config = require("./utils/config");

app.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}`)
);
