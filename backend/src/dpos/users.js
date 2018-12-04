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
    async sendEmail (req, connection) {
        try {
            const toEmail = req.body.toEmail
            const sql = `
            INSERT INTO dlog_joinreq (joinreq_email) VALUES('${toEmail}')
            `
            await connection.query(sql)
            console.log(sql)
            sendEmail.send({to: toEmail, subject: '[Dlog] 회원가입'})
        } catch (error) {
            throw error
        }
    }
    async checkSendEmail (req) {
        try {
            const toEmail = req.body.toEmail
            const sql = `
            SELECT * 
            FROM 
                dlog_joinreq 
            WHERE joinreq_email ='${toEmail}'
            AND is_join != 'Y'
            AND is_expires != 'Y'
            `
            return await dao.select(sql)
        } catch (error) {
            throw error
        }
    }
    async insertUser (req) {
        try {
            const data = req.body.data
            const sql = `
            INSERT INTO dlog_user (
                user_email,
                user_name,
                user_password,
                user_phone
            ) VALUES(
                '${data.user_email}',
                '${data.user_name}',
                '${data.user_password}', 
                '${data.phone}', 
            )
            `
            await dao.insert(sql)
        } catch (error) {
            throw error
        }
    }
}