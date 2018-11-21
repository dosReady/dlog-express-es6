import express from 'express'
import dao from '../modules/dao'
import Logline from '../dpos/logline'

const router = express.Router()
const logline = new Logline()


router.post('/logline/add', async (req, res, next) => {
    try {
        const result = await dao.transaction(req, logline.add)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

router.post('/logline/edit', async (req, res, next) => {
    try {
        const result = await dao.transaction(req, logline.update)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

router.post('/logline/delete', async (req, res, next) => {
    try {
        await dao.transaction(req, logline.delete)
        res.json({msg: '삭제처리 하였습니다.'})
    } catch (error) {
        next(error)
    }
})



router.post('/logline/list', async (req, res, next) => {
    try {
        const result = await logline.list()
        res.json(result)
    } catch (error) {
        next(error)
    }
})

router.post('/logline/detail', async (req, res, next) => {
    try {
        const result = await logline.detail(req)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router