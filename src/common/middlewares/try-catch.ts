import { Request, Response, NextFunction } from "express";

/* global try catch */
module.exports = function (_app: any) {

  _app.use(function (err: any, _req: Request, _res: Response, next: NextFunction) {

    _res.status(err.status || 500).send({
      error: {
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
      },
    });

    // if (err) res.status(500).send('Something broke!');
    // next();
  });

};

