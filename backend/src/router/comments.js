import express from 'express'
import Comments from '../dpos/comments'

const router = express.Router()
const comments =  new Comments()

router.post('/add', async (req, res, next) => {
    try {
        await comments.insert(req)
        res.json('')
    } catch (error) {
        next(error)
    }
})

router.post('/edit', async (req, res, next) => {
    try {
        await comments.update(req)
        res.json('')
    } catch (error) {
        next(error)
    }
})

router.post('/delete', async (req, res, next) => {
    try {
        await comments.delete(req)
        res.json('')
    } catch (error) {
        next(error)
    }
})

router.post('/list', async (req, res, next) => {
    try {
        const result = await comments.list(req)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

router.post('/get/children', async (req, res, next) => {
    try {
        const result = await comments.select_children(req)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router