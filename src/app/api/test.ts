module.exports = function (router: any) {
    router.get('/test', add);
};

function add(_req: any, _res: any) {
    const respons = 'Hello';
    return _res.apiSuccess(respons);
}