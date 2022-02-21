var router = require('express').Router();
const fs = require('fs');

require('./form')(router);
require('./column')(router);
require('./test')(router);

module.exports = router;
