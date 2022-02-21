var logger = require('./logger')('mongoose');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.Promise.config({
  poolSize: 10,
  warnings: {
    wForgottenReturn: false,
  },
});

// var DB_DIALECT = process.env.DB_DIALECT;
// var DB_PORT = process.env.DB_PORT;
// var DB_HOST = process.env.DB_HOST;
// var DB_USER = process.env.DB_USER;
// var DB_PASS = process.env.DB_PASS;
// var DB_NAME = process.env.DB_NAME;

// development
var dbURI = process.env.DB_URL;

// auth config
// var dbURI = DB_DIALECT + '://' + DB_USER + ':' + DB_PASS + '@' + DB_HOST + ':' + DB_PORT + '/' + DB_NAME;
// mongoose.set('useCreateIndex', true);
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://root:password@localhost:27018/form", function(err: any, db: any) {
  if (err) {
    logger.error('Unable to connect to the database:', err);
  } else {
    // mongoose.DATABASE_EXPORT = db;
    logger.info('Database Connection has been established successfully.');
  }
});

mongoose.Model.handleResponse = function(_promise: { spread: (arg0: (_record: any, _status: any) => void) => any; }, _res: { apiSuccess: (arg0: any) => void; }) {
  var model = this;
  return _promise.spread(function(_record, _status) {
    /* eslint-disable indent */
    switch (_status) {
      case -1:
      case false:
        model.returnAlreadyExistsError(_res);
        break;
      case 0:
        model.returnDoesNotExistsError(_res);
        break;
      case 2:
        model.returnEmptyResponseError(_res);
        break;
      default:
        _res.apiSuccess(_record);
        break;
    }
    /* eslint-enable indent */
  });
};

mongoose.Model.handleDoesNotExistsCatch = function(_promise: Promise<any>, _res: any) {
  var model = this;
  return _promise.catch(function(_error) {
    console.log(_error);
    model.returnDoesNotExistsError(_res);
  });
};

mongoose.Model.handleAlreadyExistsCatch = function(_promise: Promise<any>, _res: any) {
  var model = this;
  return _promise.catch(function(_error) {
    console.log(_error);
    model.returnAlreadyExistsError(_res);
  });
};

mongoose.Model.handleEmptyResponseCatch = function(_promise: Promise<any>, _res: any) {
  var model = this;
  return _promise.catch(function(_error) {
    console.log(_error);
    model.returnEmptyResponseError(_res);
  });
};

mongoose.Model.titleCase = function(string: string) {
  var split = string.toLowerCase().split(' ');
  for (var i = 0; i < split.length; i++) {
    split[i] = split[i].charAt(0).toUpperCase() + split[i].substring(1);
  }
  return split.join(' ');
};

module.exports = mongoose;
