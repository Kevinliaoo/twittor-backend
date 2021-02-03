// Base de datos de prueba 

const db = {
    'users': [
        {id: '1', name: 'Kevin'}
    ]
}; 

async function list(table) {
    return db[table];
}

async function get(table, id) {
    let collection = await list(table); 
    return collection.filter(item => item.id === id)[0] || null;
}

async function update(table, data) {
    db[table].push(data);
}

function remove(table, id) {
    return new Promise((resolve, reject) => {

    })
}

module.exports = {
    list, 
    get, 
    update, 
    remove, 
}