// Crear una clase error

const error = (message, code) => {
    let e = new Error(message); 
    if(code) {
        e.statusCode = code; 
    }
    return e; 
}

module.exports = error;