import express from 'express'
import Replys from '../dpos/replys'

const router = express.Router()
const replys =  new Replys()

router.post('/add', async (req, res, next) => {
    try {
        await replys.insert(req)
        res.json('')
    } catch (error) {
        next(error)
    }
})

router.post('/edit', async (req, res, next) => {
    try {
        await replys.update(req)
        res.json('')
    } catch (error) {
        next(error)
    }
})

router.post('/delete', async (req, res, next) => {
    try {
        await replys.delete(req)
        res.json('')
    } catch (error) {
        next(error)
    }
})

router.post('/list', async (req, res, next) => {
    try {
        const result = await replys.list(req)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router