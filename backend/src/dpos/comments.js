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
                conmment_upper_seq,
                master_seq,
                is_private,
                comment_password)
            VALUES(
                '${data.comment_content}',
                ${util.nvl(data.conmment_upper_seq, 'number')},
                ${data.master_seq},
                '${data.is_private}',
                '${data.comment_password}'
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
                    conmment_upper_seq=0,
                    update_date=CURRENT_TIMESTAMP,
                    master_seq=0,
                    is_private='${data.is_private}',
                    comment_password='${data.comment_password}'
            WHERE comment_seq=${data.comment_seq}
            `
            await dao.update(commentsql)
        } catch (error) {
            throw error
        }
    }
    async delete (req, connection) {
        try {
            const data = req.body.data
            const commentsql = `
            DELETE FROM dlog_comments WHERE comment_seq = '${data.seq}'
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
                comment_seq,
                comment_content,
                action_log_seq,
                conmment_upper_seq,
                user_id,
                DATE_FORMAT(update_date, '%Y-%m-%d %H:%i') AS update_date,
                master_seq,
                is_private,
                comment_password
            FROM dlog_comments
            WHERE master_seq = ${seq}
            `
            const result = await dao.list(commentsql)
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
                conmment_upper_seq,
                user_id,
                DATE_FORMAT(update_date, '%Y-%m-%d %H:%i') AS update_date,
                master_seq,
                is_private,
                comment_password
            FROM dlog_comments
            WHERE conmment_upper_seq = ${seq}
            `
            const result = await dao.list(commentsql)
            return result
        } catch (error) {
            throw error
        }
    }
}