var router = require('express').Router();
const fs = require('fs');

require('./form')(router);
require('./column')(router);
require('./test')(router);
require('./user')(router);
require('./session')(router);

module.exports = router;
