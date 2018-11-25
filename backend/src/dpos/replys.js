import dao from '../modules/dao'
module.exports = class Replys {
    constructor () {}
    async insert (req, connection) {
        try {
            const data = req.body.data
            console.log(data)
            const sql = `
            INSERT INTO dlog_comment_replys (
                reply_content,
                comment_seq,
                is_private,
                reply_password,
                user_id,
                target_user_id
            ) VALUES(
                '${data.reply_content}',
                ${data.comment_seq},
                '',
                '',
                '등록자',
                '${data.target_user_id}'
            )
            `
            await dao.insert(sql)
        } catch (error) {
            throw error
        }
    }
}