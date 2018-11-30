import dao from '../modules/dao'
import utils from '../utils'

module.exports = class Profile {
    constructor () {}
    async list (req) {
        try {
            const id = utils.nvl(req.body.id, 'string')
            const tag = utils.nvl(req.body.tag, 'string')
            const sql = `
            SELECT 
                a.blog_seq,
                a.blog_title,
                LEFT(a.blog_content, 100) AS blog_content,
                a.user_id,
                DATE_FORMAT(a.update_date, '%Y-%m-%d %H:%i') as update_date
            FROM
                dlog_blog a
            LEFT OUTER JOIN	
                dlog_tags b
            ON a.blog_seq = b.master_seq
            WHERE a.user_id = '${id}'
            AND IFNULL(b.tag_name, '') LIKE CONCAT('%','${tag}','%')
            GROUP BY a.blog_seq, a.blog_title, a.user_id, a.update_date
            ORDER BY a.update_date DESC
            `
            const totalsql = `
            SELECT 
                COUNT(*) total
            FROM (
                SELECT
                    a.blog_seq
                FROM
                    dlog_blog a
                LEFT OUTER JOIN
                    dlog_tags b
                ON a.blog_seq = b.master_seq
                WHERE a.user_id = '${id}'
                AND IFNULL(b.tag_name, '') LIKE CONCAT('%','${tag}','%')
                GROUP BY a.blog_seq
            ) AS x
            `
            const list = await dao.list(sql)
            const result = await dao.select(totalsql)
            return {list: list, total: !result.total ? 0 : result.total}
        } catch (error) {
            throw error
        }
    }
}