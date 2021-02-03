require('dotenv').config(); 

const config = {
    api: {
        port: process.env.API_PORT,
    }, 
    db: {
        dbUsername: process.env.DB_USERNAME,
        dbPsw: process.env.DB_PSW,
        dbHost: process.env.DB_HOST,
        dbName: process.env.DB_NAME,
    }, 
    auth: {
        secret: process.env.SECRET,
        session_secret: process.env.SESSION_SECRET,
    },
    error_mesages: {
        missing_data: "Missing data",
        psw_not_match: "Passwords do not match", 
        user_exists: "Username already exists",
        unable: "Unable to create this user",
    }
}

module.exports = config;    