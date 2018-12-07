import dao from '../modules/dao'
import sendEmail from '../modules/sendMail'
import jwt from '../modules/jwt'
import config from '../setting/config.json'
import util from '../utils'

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
            console.log(sql)
            await connection.query(sql)
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
                    const {access, refresh}= jwt.createToken(result.user, req)
                    
                    const updateSql = `
                    UPDATE dlog_user 
                        SET jwt_refresh_token='${refresh}',
                            update_date=CURRENT_TIMESTAMP
                    WHERE user_email='${req.body.username}'
                    `
                    result.token = access
                    await dao.update(updateSql)
                }
            }
            return result
        } catch (error) {
            throw error
        }
    }
    async deleteToken (req) {
        try {
            const sql = `
            UPDATE dlog_user 
                SET jwt_refresh_token='',
                    update_date=CURRENT_TIMESTAMP
            WHERE user_email='${req.body.username}'
            `
            await dao.update(sql)
        } catch (error) {
            throw error
        }
    }
    async refreshToken (req) {
        let accessToekn = ''
        const userdata = req.body.user
        try {
            const user = await dao.select(`SELECT * FROM dlog_user WHERE user_email = '${userdata.user_email}'`)
            if (user && user.jwt_refresh_token) {
                const decoded = jwt.isVaild(user.jwt_refresh_token, config.jwt.refreshScret)
                if (decoded) {
                    const vaildVal = (req.header('x-forwarded-for') || req.connection.remoteAddress) + req.sessionID
                    const result = util.aesDecipher(decoded.secret)
                    if (result === vaildVal) {
                        const param = {
                            user_name: user.user_name,
                            user_email: user.user_email,
                            user_phone: user.user_phone,
                            jwt_refresh_token: user.jwt_refresh_token
                        }  
                        accessToekn = jwt.refreshAccessToken(param)
                    }
                }
            }
            return accessToekn
        } catch (error) {
            throw error
        }
    }
}