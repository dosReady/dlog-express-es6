import express from 'express'
import dao from '../modules/dao'
import Blog from '../dpos/blog'

const router = express.Router()
const blog = new Blog()


router.post('/add', async (req, res, next) => {
    try {
        const result = await dao.transaction(req, blog.insert)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

router.post('/edit', async (req, res, next) => {
    try {
        const result = await dao.transaction(req, blog.update)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

router.post('/delete', async (req, res, next) => {
    try {
        await dao.transaction(req, blog.delete)
        res.json({msg: '삭제처리 하였습니다.'})
    } catch (error) {
        next(error)
    }
})



router.post('/list', async (req, res, next) => {
    try {
        const result = await blog.list(req)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

router.post('/detail', async (req, res, next) => {
    try {
        const result = await blog.detail(req)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router