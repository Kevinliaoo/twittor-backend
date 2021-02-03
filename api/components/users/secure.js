const auth = require('../../../auth');

module.exports = checkauth = () => {
    return (req, res, next) => {
        const owner = req.body.uid;  
        auth.check.own(req, owner); 
        next();
    }
}