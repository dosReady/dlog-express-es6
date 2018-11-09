import {Pool} from 'pg'

const config = {
    user: 'dlog',
    password: 'dos',
    host: '127.0.0.1',
    database: 'dlog',
    port: 5432
}

const pool = new Pool(config)

module.exports = pool
