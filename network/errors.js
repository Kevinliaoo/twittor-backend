// Gestión de errores 
const response = require('./response');

function errors(e, req, res, next) {
    console.error('[error] ', e); 
    const message = e.message || 'Internal error';
    const status = e.statusCode || 500; 

    response.error(req, res, message, status); 
}

module.exports = errors;