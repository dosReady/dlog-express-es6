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
            const commentsql = `
            SELECT
            a.comment_seq,
            a.comment_content,
            a.user_id AS comment_user_id,
            DATE_FORMAT(a.update_date, '%Y-%m-%d %H:%i') AS comment_update_date,
            b.reply_seq,
            b.reply_content,
            DATE_FORMAT(b.update_date, '%Y-%m-%d %H:%i') AS reply_update_date,
            b.user_id AS reply_user_id
            FROM 
                dlog_comments a
            LEFT OUTER JOIN
                dlog_comment_replys b
            ON a.comment_seq =  b.comment_seq
            WHERE a.master_seq = ${seq}
            ORDER BY comment_update_date DESC
            `
            const comments = await dao.list(commentsql)
            let result = []
            for (const comment of comments) {
                let commentObj = {}
                const idx = result.findIndex(item => item.comment_seq === comment.comment_seq)
                if (idx > -1) {
                    const replyObj = {
                        reply_seq: comment.reply_seq,
                        reply_content: comment.reply_content,
                        reply_update_date: comment.reply_update_date,
                        reply_user_id: comment.reply_user_id
                    }
                    result[idx].reply.push(replyObj)
                } else {
                    commentObj = {
                        comment_seq: comment.comment_seq,
                        comment_content: comment.comment_content,
                        comment_update_date: comment.comment_update_date,
                        user_id: comment.user_id,
                        reply: []
                    }
                    if(comment.reply_seq) {
                        const replyObj = {
                            reply_seq: comment.reply_seq,
                            reply_content: comment.reply_content,
                            reply_update_date: comment.reply_update_date,
                            reply_user_id: comment.reply_user_id
                        }
                        commentObj.reply.push(replyObj)
                    }
                    result.push(commentObj)
                }
                
            }
            console.log(result)
            return result
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