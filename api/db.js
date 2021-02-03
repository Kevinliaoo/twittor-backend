const db = require('mongoose'); 

db.Promise = global.Promise; 

async function connect(url) {
    db.connect(url, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    })
        .then(() => console.log('[db] Database connected'))
        .catch(e => console.log(`[db] ${e.message}`))
}

module.exports = connect; 