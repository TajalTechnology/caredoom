module.exports = function (router: { post: (arg0: string, arg1: (req: any, res: any) => any) => void; }) {
    router.post('/test', add);
};

function add(_req: any, _res: any) {
    console.log('Hello');
}
