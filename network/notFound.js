const boom = require('@hapi/boom');

// Error 404 middleware handler 
function notFoundHandler(req, res) {
    const {
        output: { statusCode, payload }
    } = boom.notFound(); 
    res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;