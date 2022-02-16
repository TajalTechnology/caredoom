import utils from '../common/services/utils';

/* ----------------------------------- */
/* Initializing Express App */
/* ----------------------------------- */
var appLocals = {
    'baseUri': '/api/',
    'dirname': __dirname,
};

var app: any = utils.initApp(appLocals);

app.use(function (req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
    next();
});

/* ----------------------------------- */
/* Loading pre-required local service */
/* ----------------------------------- */
utils.localService('logger', app);
utils.localService('mongoose', app);
utils.middleware('routes', app);

app.listen(process.env.API_PORT, () => {
    return console.log(`Express is listening at http://localhost:${process.env.API_PORT}`);
});