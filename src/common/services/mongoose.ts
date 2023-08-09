var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
mongoose.Promise.config({
  poolSize: 10,
  warnings: {
    wForgottenReturn: false,
  },
});

var dbURI = process.env.DB_URL;

mongoose.connect(dbURI, function (err: any, db: any) {
  if (err) {
    console.log("Unable to connect to the database:",err);
  } else {
    console.log("Database Connection has been established successfully.");}
});

module.exports = mongoose;
