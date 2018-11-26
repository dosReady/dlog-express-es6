import dao from '../modules/dao'
import util from '../utils'

module.exports = class Comments {
    constructor () {}
    async insert (req, connection) {
        try {
            const data = req.body.data
            console.log(data)
            const commentsql = `
            INSERT INTO dlog_comments (
                comment_content,
                master_seq,
                is_private,
                comment_password)
            VALUES(
                '${data.comment_content}',
                ${data.master_seq},
                '',
                ''
            )
            `
            await dao.insert(commentsql)
        } catch (error) {
            throw error
        }
    }

    async update (req, connection) {
        try {
            const data = req.body.data
            const commentsql = `
            UPDATE dlog_comments
                SET comment_content='${data.comment_content}',
                    action_log_seq=0,
                    comment_upper_seq=0,
                    update_date=CURRENT_TIMESTAMP,
                    master_seq=${data.master_seq},
            WHERE comment_seq=${data.comment_seq}
            `
            await dao.update(commentsql)
        } catch (error) {
            throw error
        }
    }
    async delete (req, connection) {
        try {
            const seq = req.body.seq
            const commentsql = `
            DELETE FROM dlog_comments WHERE comment_seq = '${seq}'
            `
            await dao.delete(commentsql)
        } catch (error) {
            throw error
        }
    }
    async list (req, connection) {
        try {
            const seq = req.body.id
            let page = 0 
            let max = 10
            if (req.body.pagination) {
                const pagination = req.body.pagination
                page = (pagination.page -1)
                max = pagination.max
            }
            const commentsql = `
            SELECT
            a.comment_seq,
            a.comment_content,
            a.user_id AS comment_user_id,
            DATE_FORMAT(a.update_date, '%Y-%m-%d %H:%i') AS comment_update_date,
            COUNT(b.reply_seq) AS reply_cnt
            FROM 
                dlog_comments a
            LEFT OUTER JOIN
                dlog_comment_replys b
            ON a.comment_seq =  b.comment_seq
            WHERE a.master_seq = ${seq}
            GROUP BY a.comment_seq, a.comment_content, a.user_id, a.update_date
            ORDER BY comment_update_date DESC
            LIMIT ${page * max}, ${max}
            `
            const totalResult = await dao.select('SELECT COUNT(*) AS comment_total_cnt FROM dlog_comments')
            const comments = await dao.list(commentsql)
            return {comments: comments, comment_total_cnt: totalResult.comment_total_cnt}
        } catch (error) {
            throw error
        }
    }
    async select_children (req, connection) {
        try {
            const seq = req.body.id
            const commentsql = `
            SELECT 
                comment_seq,
                comment_content,
                action_log_seq,
                comment_upper_seq,
                user_id,
                DATE_FORMAT(update_date, '%Y-%m-%d %H:%i') AS update_date,
                master_seq,
                is_private,
                comment_password
            FROM dlog_comments
            WHERE comment_upper_seq = ${seq}
            ORDER BY update_date DESC
            `
            const result = await dao.list(commentsql)
            return result
        } catch (error) {
            throw error
        }
    }
}