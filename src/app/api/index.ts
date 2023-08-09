var router = require("express").Router();
const fs = require("fs");

require("./user")(router);
module.exports = router;
