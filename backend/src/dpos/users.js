import dao from '../modules/dao'
import utils from '../utils'
import sendEmail from '../modules/sendMail'

module.exports = class Users {
    constructor () {}
    async checkExist (req) {
        try {
            const email = req.body.email
            const sql = `
            SELECT * FROM dlog_user WHERE user_email = '${email}'
            `
            return await dao.select(sql)
        } catch (error) {
            throw error
        }
    }
    async sendEmail (req) {
        sendEmail.send({to: 'lonely721@naver.com', subject: '이메일 서비스'})
    }
}