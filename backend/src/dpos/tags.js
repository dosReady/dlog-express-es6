import dao from '../modules/dao'

module.exports = class Tags {
    constructor () {}
    async list (req) {
        try {
            const sql = 'SELECT * FROM dlog_tags'
            const result = await dao.list(sql)
            return result
        } catch (error) {
            throw error
        }
    }
}