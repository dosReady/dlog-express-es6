import dao from '../modules/dao'
import utils from '../utils'

module.exports = class Tags {
    constructor () {}
    async list (req) {
        try {
            const tag = utils.nvl(req.body.searchTagText, 'string')
            const sql = `
            SELECT 
                tag_name,
                COUNT(tag_name) as tag_cnt
            FROM dlog_tags
            WHERE tag_name LIKE CONCAT('%','${tag}','%')
            GROUP BY tag_name
            ORDER BY tag_cnt DESC
            `
            const result = await dao.list(sql)
            return result
        } catch (error) {
            throw error
        }
    }
}