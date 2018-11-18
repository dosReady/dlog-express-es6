import db from '../setting/db'


exports.begin = async () => {
    try {
        await db.query("BEGIN")
    } catch (error) {
        throw error
    }
}

exports.commit = async () => {
    try {
        await db.query("COMMIT")
    } catch (error) {
        throw error
    }
}

exports.rollback = async () => {
    try {
        await db.query("ROLLBACK")
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
    const client = db.connect()
    try {
        console.log(sql)
        const {rows} = await client.query(sql, params)
        console.log(rows)
        return rows
    } catch (error) {
        client.release()
        throw error
    }
}

exports.query_cud_array = async (sqls, params) => {
    try {
        let rowarray = []
        for(const sql of sqls) {
            console.log(sql)
            const {rows} = await db.query(sql, params)
            console.log(rows)
            rowarray.push(rows)
        }
        return rowarray
    } catch (error) {
        throw error
    }
}
