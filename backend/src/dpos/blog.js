import dao from '../modules/dao'
import utils from '../utils'

module.exports = class Blog {
    constructor () {}
    async insert (req, connection) {
        try {
            const data = req.body.data
            const mastersql = `
            INSERT INTO dlog_blog (
                blog_title,
                blog_content,
                file_group_seq
            )
            VALUES(
                '${data.blog_title}',
                '${data.blog_content}',
                null
            )
            `
            await dao.insert(mastersql)
        } catch (error) {
           throw error
        }
    }

    async update (req, connection) {
        try {
            const seq = req.body.seq
            const data = req.body.data
            const updatesql = `
            UPDATE dlog_blog
            SET blog_title='${data.blog_title}',
                blog_content='${data.blog_content}',
                update_date=CURRENT_TIMESTAMP
            WHERE blog_seq=${seq}
            `
            await dao.update(updatesql)
        } catch (error) {
            throw error
        }
    }

    async delete (req, connection) {
        let result = []
        try {
            const seq = req.body.seq
            const deleteTagSql = `DELETE FROM dlog_tags WHERE master_seq = ${seq}`
            const delCommentSql = `DELETE FROM dlog_comments WHERE master_seq = ${seq}`
            const delBlogSql = `
                DELETE FROM dlog_blog WHERE blog_seq = ${seq}
            `
            await connection.query(deleteTagSql)
            result.push(deleteTagSql)
            await connection.query(delCommentSql)
            result.push(delCommentSql)
            await connection.query(delBlogSql)
            result.push(delBlogSql)
        } catch (error) {
            throw error
        } finally {
            result.forEach((sql) => console.log(sql))
        }
    }

    async detail (req) {
        const id = req.body.id
        const mastersql = `
            SELECT
                blog_seq,
                blog_title,
                blog_content,
                DATE_FORMAT(update_date, '%Y-%m-%d %H:%i') AS update_date
            FROM dlog_blog 
            WHERE blog_seq = '${id}'
        `
        const result = await dao.select(mastersql)
        return result
    }

    async list (req) {
        let page = 0 
        let max = 5
        const tag = utils.nvl(req.body.tag,'string')
        if (req.body.pagination) {
            const pagination = req.body.pagination
            page = (pagination.page -1)
            max = pagination.max
        }
        const totalsql = `
        SELECT 
            COUNT(*) AS  total
        FROM (
            SELECT 
                a.blog_seq
            FROM 
                dlog_blog a
            LEFT OUTER JOIN
                dlog_tags b
            ON a.blog_seq = b.master_seq
            WHERE 1=1
            AND IFNULL(b.tag_name, '') LIKE CONCAT('%','${tag}','%')
            GROUP BY a.blog_seq
        ) AS x
        `
        const sql = `
        SELECT 
            a.blog_seq,
            a.blog_title,
            LEFT(a.blog_content, 200) AS blog_content,
            DATE_FORMAT(a.update_date, '%Y-%m-%d %H:%i') as update_date,
            a.file_group_seq
        FROM 
            dlog_blog a
        LEFT OUTER JOIN
            dlog_tags b
        ON a.blog_seq = b.master_seq
        WHERE 1=1
        AND IFNULL(b.tag_name, '') LIKE CONCAT('%','${tag}','%')
        GROUP BY a.blog_seq, a.blog_title, a.blog_content, a.update_date, a.file_group_seq
        ORDER BY update_date DESC
        LIMIT ${page * max}, ${max}
        `
        const list = await dao.list(sql)
        const totalresult = await dao.select(totalsql)
        return {list: list, total: totalresult.total}
    }
}