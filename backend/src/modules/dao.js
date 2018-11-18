import db from '../setting/db'

exports.select = async (selectSql, params) => {
    const connection = await db.getConnection()
    try {
        const [rows] = await connection.query(selectSql, params)
        connection.release()
        console.log(selectSql)
        if(params) console.log(params)
        return rows
    } catch (error) {
        throw error
    }
}

exports.insert = async (insertSql, params) => {
    const connection = await db.getConnection()
    try {
        await connection.beginTransaction()
        const [rows] = await connection.query(insertSql, params)
        await connection.commit()
        connection.release()
        console.log(insertSql)
        console.log(rows.insertId)
        if(params) console.log(params)
        return rows.insertId
    } catch (error) {
        await connection.rollback()
        connection.release()
        throw error
    }
}

exports.delete = async (deleteSql, params) => {
    const connection = await db.getConnection()
    try {
        await connection.beginTransaction()
        await connection.query(deleteSql, params)
        await connection.commit()
        connection.release()
        console.log(deleteSql)
        if(params) console.log(params)
    } catch (error) {
        await connection.rollback()
        connection.release()
        throw error
    }
}

exports.update = async (updateSql, params) => {
    const connection = await db.getConnection()
    try {
        await connection.beginTransaction()
        await connection.query(updateSql, params)
        await connection.commit()
        connection.release()
        console.log(updateSql)
        if(params) console.log(params)
    } catch (error) {
        await connection.rollback()
        connection.release()
        throw error
    }
}

exports.transaction = async (req, callback) => {
    const connection = await db.getConnection()
    try {
        await connection.beginTransaction()
        await callback(req, connection)
        await connection.commit()
        connection.release()
    } catch (error) {
        await connection.rollback()
        connection.release()
        throw error
    }
}