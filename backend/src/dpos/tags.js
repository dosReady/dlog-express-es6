import dao from '../modules/dao'

module.exports = class Tags {
    constructor () {}
    async list (req) {
        try {
            const sql = `
            SELECT 
                tag_name,
                COUNT(tag_name) as tag_cnt
            FROM dlog_tags
            GROUP BY tag_name
            `
            const result = await dao.list(sql)
            return result
        } catch (error) {
            throw error
        }
    }
}