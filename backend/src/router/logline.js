import express from 'express'
import dao from '../modules/dao'
import Logline from '../dpos/logline'

const router = express.Router()
const logline = new Logline()


router.post('/add', async (req, res, next) => {
    try {
        const result = await dao.transaction(req, logline.loglineAdd)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

router.post('/list', async (req, res, next) => {
    try {
        const result =  await logline.list()
        res.json(result)
    } catch (error) {
        next(error)
    }
})

router.post('/detail', async (req, res, next) => {
    try {
        const id = req.body.id
        const mastersql = `
            SELECT 
                logline_master_title as subject,
                logline_master_content as content
            FROM dlog_logline_master 
            WHERE logline_master_seq = '${id}'
        `
        const result = await dao.select(mastersql)

        const worksql = `
        SELECT
            work_seq,
            work_content,
            work_level
        FROM dlog.dlog_work_list
        WHERE logline_master_seq = '${id}'
        `
        result.worklist = await dao.list(worksql)
        console.log(result)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router