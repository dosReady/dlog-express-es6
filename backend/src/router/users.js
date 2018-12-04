import express from 'express'
import dao from '../modules/dao'
import Users from '../dpos/users'

const router = express.Router()
const users = new Users()

router.post('/checkExist', async (req, res, next) => {
    try {
        const result = await users.checkExist(req)
        res.json(result)
    } catch (error) {
        next(error)
    }
})
router.post('/sendEmail', async (req, res, next) => {
    try {
        await dao.transaction(req, users.sendEmail)
        res.json('send')
    } catch (error) {
        next(error)
    }
})
router.post('/checkSendEmail', async (req, res, next) => {
    try {
        const result = await users.checkSendEmail(req)
        res.json(result)
    } catch (error) {
        next(error)
    }
})
router.post('/insertUser', async (req, res, next) => {
    try {
        const result = await dao.transaction(req, users.insertUser)
        res.json(result)
    } catch (error) {
        next(error)
    }
})
module.exports = router