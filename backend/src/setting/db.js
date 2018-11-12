import {Pool} from 'pg'

const config = {
    user: 'dlog',
    password: 'dos',
    host: '192.168.0.12',
    database: 'dlog',
    port: 5432
}

const pool = new Pool(config)

module.exports = pool
