import dao from '../modules/dao'
import utils from '../utils'
import sendEmail from '../modules/sendMail'
import jwt from '../modules/jwt'

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
    async insertUser (req, connection) {
        let result = []
        try {
            const data = req.body.data
            const dlogUserSql = `
            INSERT INTO dlog_user (
                user_email,
                user_name,
                user_password,
                user_phone
            ) VALUES(
                '${data.email}',
                '${data.name}',
                '${data.pwd}', 
                '${data.call}'
            )
            `
            const dlogJoinReqSql = `
            UPDATE dlog_joinreq 
	            SET is_join='Y', 
	            update_date=CURRENT_TIMESTAMP,
	            is_expires='Y' 
            WHERE joinreq_email='${data.email}'
            `
            await connection.query(dlogUserSql)
            result.push(dlogUserSql)
            await connection.query(dlogJoinReqSql)
            result.push(dlogJoinReqSql)
        } catch (error) {
            throw error
        }
    }
    async createToken (req) {
        try {
            let result = {}
            const user = await dao.select(`SELECT * FROM dlog_user WHERE user_email = '${req.body.username}'`)
            if (user) {
                if (req.body.password === user.user_password) {
                    result.user = {
                        user_name: user.user_name,
                        user_email: user.user_email,
                        user_phone: user.user_phone
                    }              
                    result.token = jwt.createToken(result.user, req)
                }
            }
            return result
        } catch (error) {
            throw error
        }
    }
}