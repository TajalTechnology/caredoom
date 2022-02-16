var router = require('express').Router();
const fs = require('fs');
// require('../common/middlewares/passport-strategy');
// var ServerSignature = 'Ekshop API SERVER - Last Updated 05 Dec 18 14:41';

// router.get('/', function(req, res, next) {
//   fs.readFile('./InstallDate.txt', 'utf8', function(err, contents) {
//     res.end(`Ekshop API DEV Front/Admin/Merchant SERVER-\n Last Updated ${contents} Last Restart ${process.env.START_TIME}`);
//   });
// });

require('./test')(router);

module.exports = router;
