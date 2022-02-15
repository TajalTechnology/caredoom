import utils from '../common/services/utils';

/* ----------------------------------- */
/* Initializing Express App */
/* ----------------------------------- */
var appLocals = {
    'baseUri': '/api/',
    'dirname': __dirname,
};

var app = utils.initApp(appLocals);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
    next();
});