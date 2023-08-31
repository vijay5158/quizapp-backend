const pgp = require('pg-promise')({});
const config = {
    host: 'localhost',
    port: 5432,
    database: 'quiz',
    user: 'user',
    password: 'password'
}
const db = pgp(config);

module.exports = db;
