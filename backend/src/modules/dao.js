import db from '../setting/db'

exports.select = async (selectSql, params) => {
    const connection = await db.getConnection()
    try {
        const [rows] = await connection.query(selectSql, params)
        console.log(selectSql)
        console.log(rows[0])
        if(params) console.log(params)
        connection.release()
        return rows[0]
    } catch (error) {
        connection.release()
        throw error
    }
}
exports.list = async (selectSql, params) => {
    const connection = await db.getConnection()
    try {
        const [rows] = await connection.query(selectSql, params)
        console.log(selectSql)
        console.log(rows)
        if(params) console.log(params)
        connection.release()
        return rows
    } catch (error) {
        connection.release()
        throw error
    }
}

exports.insert = async (insertSql, params) => {
    const connection = await db.getConnection()
    try {
        console.log(insertSql)
        const [rows] = await connection.query(insertSql, [params])
        console.log(rows.insertId)
        if(params) console.log(params)
        connection.release()
        return rows.insertId
    } catch (error) {
        connection.release()
        throw error
    }
}

exports.delete = async (deleteSql, params) => {
    const connection = await db.getConnection()
    try {
        await connection.query(deleteSql, params)
        console.log(deleteSql)
        if(params) console.log(params)
        connection.release()
    } catch (error) {
        connection.release()
        throw error
    }
}

exports.update = async (updateSql, params) => {
    const connection = await db.getConnection()
    try {
        await connection.query(updateSql, params)
        console.log(updateSql)
        if(params) console.log(params)
        connection.release()
    } catch (error) {
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