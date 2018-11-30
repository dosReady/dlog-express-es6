import express from 'express'
import dao from '../modules/dao'
import Tags from '../dpos/tags'

const router = express.Router()
const tags = new Tags()

router.post('/list', async (req, res, next) => {
    try {
        const result = await tags.list(req)
        res.json(result)
    } catch (error) {
        next(error)
    }
})
router.post('/mylist', async (req, res, next) => {
    try {
        const result = await tags.mylist(req)
        res.json(result)
    } catch (error) {
        next(error)
    }
})
module.exports = router