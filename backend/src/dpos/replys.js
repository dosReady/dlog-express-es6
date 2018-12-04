import dao from '../modules/dao'
module.exports = class Replys {
    constructor () {}
    async insert (req, connection) {
        try {
            const data = req.body.data
            const sql = `
            INSERT INTO dlog_comment_replys (
                reply_content,
                comment_seq,
                is_private,
                reply_password,
                target_user
            ) VALUES(
                '${data.reply_content}',
                ${data.comment_seq},
                '',
                '',
                '${data.target_user}'
            )
            `
            await dao.insert(sql)
        } catch (error) {
            throw error
        }
    }
    async list (req, connection) {
        try {
            const seq = req.body.seq
            const sql = `
            SELECT 
                reply_seq,
                reply_content,
                comment_seq,
                target_user,
                reg_user,
                DATE_FORMAT(update_date, '%Y-%m-%d %H:%i') AS reply_update_date
            FROM
                dlog_comment_replys 
            WHERE comment_seq = ${seq}
            ORDER BY update_date DESC
            `
            const result = await dao.list(sql)
            return result
        } catch (error) {
            throw error
        }
    }
}