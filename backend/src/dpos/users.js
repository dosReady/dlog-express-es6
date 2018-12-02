import dao from '../modules/dao'
import utils from '../utils'

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
}