const jwt = require('jsonwebtoken');
const secret = require('../config').auth.secret;
const error = require('../utils/error'); 

const sign = data => {
    // Create token 
    return jwt.sign(data.toJSON(), secret);
} 

const verify = token => {
    /**
     * El parámetro token es el token del usuario logueado 
     * 
     * Esta función lo que hace es obtener el usuario al que le pertenece
     * dicho token y devolverlo 
     */
    return jwt.verify(token, secret); 
}

const check = {
    own: (req, owner) => {
        // Check if owner's uid coincide with token sent by the request
        const decoded = decodeHeader(req); 
        // Comprobar si es o no propio
        if(decoded.uid !== owner) {
            throw error('You have not permissions', 401)
        }
    }
}

const getToken = auth => {
    /**
     * El formato del token que viene es el siguiente:
     * Bearer [token]
     * 
     * Esta funcion lo que hace es extraer el [token], ignorando la palabra 
     * "Bearer" que viene al comienzo
     */
    if(!auth) {
        throw new Error('No viene un token'); 
    }
    if(auth.indexOf('Bearer') === -1) {
        throw new Error('Invalid format');
    }
    let token = auth.replace('Bearer ', ''); 
    return token;
}

// Decodifica el token
const decodeHeader = req => {
    // Información de authorization
    const authorization = req.headers.authorization || ''; 
    const token = getToken(authorization); 
    const decoded = verify(token); 

    // Agrega un objeto user (el usuario logueado) al request
    req.user = decoded; 

    return decoded; 
}

module.exports = {
    sign,
    check,
}