import session from 'express-session'
import MySQLStore from 'express-mysql-session'
import mysql from 'mysql2/promise'
import dbconfig from '../setting/config.json'

const config = {
    host: dbconfig.db.host,
    user: dbconfig.db.user,
    password: dbconfig.db.password,
    database: dbconfig.db.database,
    port: dbconfig.port
}

const storeconfig = {
    host: dbconfig.db.host,
    user: dbconfig.db.user,
    password: dbconfig.db.password,
    database: dbconfig.db.database,
    port: dbconfig.port,
    clearExpired: true,
    checkExpirationInterval: 100000,
    expiration: 100000,
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
