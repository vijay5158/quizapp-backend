const pgp = require('pg-promise')({});
const config = {
    host: 'localhost',
    port: 5432,
    database: 'quiz',
    user: 'postgres',
    password: 'Vijaykumar@12'
}
const db = pgp(config);

module.exports = db;