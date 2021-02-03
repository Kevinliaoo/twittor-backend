const bcrypt = require('bcrypt');

const VECES = 5; 

// Encrypc plain text password
const encryptPassword = psw => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(psw, VECES, (error, hash) => {
            if(error) {
                reject('Error hashing the passowrd');
                return false;  
            }
            resolve(hash); 
        })
    })
}

// Compares a plain text passowrd with an encripted one
const compare = async (inserted, password) => {
    const result = await bcrypt.compare(inserted, password); 
    return result; 
}

module.exports = {
    encryptPassword, 
    compare, 
}