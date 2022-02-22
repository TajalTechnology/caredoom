import utils from '../common/services/utils';
import deserializeUser from './common/middlewares/deserializeUser';

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
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-refresh, x-client-key, x-client-token, x-client-secret, Authorization');
    next();
});
app.use(deserializeUser);

/* ----------------------------------- */
/* Loading pre-required local service */
/* ----------------------------------- */
utils.localService('mongoose', app);
utils.middleware('body-parser', app);
utils.middleware('api-response', app);
utils.middleware('routes', app);
utils.localService('logger', app);
utils.middleware('try-catch', app);

app.listen(process.env.API_PORT, () => {
    return console.log(`Express is listening at http://localhost:${process.env.API_PORT}`);
});