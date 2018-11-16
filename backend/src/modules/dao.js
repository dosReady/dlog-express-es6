import db from '../setting/db'

exports.query_one = async (sql, params) => {
    try {
        console.log(sql)
        const {rows} = await db.query(sql, params)
        console.log(rows[0])
        return rows[0]
    } catch (error) {
        throw error
    }
}

exports.query_list = async (sql, params) => {
    try {
        console.log(sql)
        const {rows} = await db.query(sql, params)
        console.log(rows)
        return rows
    } catch (error) {
        throw error
    }
}

exports.query_cud = async (sql, params) => {
    try {
        console.log(sql)
        const result = await db.query(sql, params)
        console.log(result)
        return result
    } catch (error) {
        throw error
    }
}