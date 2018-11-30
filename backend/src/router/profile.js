import express from 'express'
import Profile from '../dpos/profile'
const router = express.Router()
const profile = new Profile()

router.post('/list', async (req, res, next) => {
    try {
        const reulst = await profile.list(req)
        res.json(reulst)
    } catch (error) {
        next(error)
    }
})
module.exports = router