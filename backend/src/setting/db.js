import session from 'express-session'
import MySQLStore from 'express-mysql-session'
import mysql from 'mysql2/promise'
const config = {
    host: '106.10.33.118',
    user: 'dlog',
    password: 'dlog',
    database: 'dlog',
    port: 3306
}

const storeconfig = {
    host: '106.10.33.118',
    user: 'dlog',
    password: 'dlog',
    database: 'dlog',
    port: 3306,
    clearExpired: true,
    checkExpirationInterval: 1000,
    expiration: 1000,
    connectionLimit: 1,
    endConnectionOnClose: true,
    schema: {
        tableName: 'dlog_user_sessions',
        columnNames: {
            session_id: 'sid',
            expires: 'expires',
            data: 'sess'
        }
    }
}

const pool = new mysql.createPool(config)
pool.sessionStore = new (MySQLStore(session))(storeconfig)

module.exports = pool
