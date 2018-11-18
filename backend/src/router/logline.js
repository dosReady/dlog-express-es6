import express from 'express'
import dao from '../modules/dao'
const router = express.Router()

const loglineAdd = async (req) => {
    
    try {
        const data = req.body.data
        // const worklist = data.worklist
        // let worksqls =  []
        // logline master insert
        const sql = `
        INSERT INTO dlog_logline_master (
            logline_master_title,
            logline_master_content,
            logline_worklist_seq,
            file_group_seq,
            action_log_seq
        )
        VALUES(
            '${data.subject}',
            '${data.content}',
            null,
            null,
            null
        )
        `
        return await dao.insert(sql)
    } catch (error) {
       throw error
    }

}

router.post('/add', async (req, res, next) => {
    try {
        const result = await dao.transaction(req, loglineAdd)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

router.post('/list', async (req, res, next) => {
    try {
        const sql = `
            SELECT * FROM dlog_logline_master
        `
        const result = await dao.select(sql)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

router.post('/detail', async (req, res, next) => {
    try {
        const id = req.body.id
        const sql = `
            SELECT 
                logline_master_title as subject,
                logline_master_content as content
            FROM dlog_logline_master 
            WHERE logline_master_seq = '${id}'
        `
        const result = await dao.select(sql)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router