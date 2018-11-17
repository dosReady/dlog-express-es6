import {Pool} from 'pg'

const config = {
    user: 'dos',
    password: 'dos',
    host: '106.10.33.118',
    database: 'dlog',
    port: 5432
}

const pool = new Pool(config)

module.exports = pool
