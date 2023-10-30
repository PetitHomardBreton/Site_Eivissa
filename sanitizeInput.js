import xss from 'xss';

function escapeData(req, res, next) {
    for (let key in req.body) {
        req.body[key] = xss(req.body[key]);
    }
    next();
}
export default escapeData;
