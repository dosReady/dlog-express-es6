import express from 'express'
import dao from '../modules/dao'
const router = express.Router()

router.post('/add', async (req, res, next) => {
    
    try {
        const data = req.body.data

        // logline master insert
        const sql = `
        INSERT INTO dlog_logline_master (
            logline_master_seq,
            logline_master_title,
            logline_master_content,
            logline_worklist_seq,
            file_group_seq,
            action_log_seq
        )
        VALUES(
            nextval('dlog_logline_master_seq'),
            '${data.subject}',
            '${data.content}',
            null,
            null,
            null
        )
        RETURNING logline_master_seq
        `
        const result = await dao.query_cud(sql)

        const worklist = data.worklist
        for (let work of worklist) {
            console.log(work)
            work.logline_master_seq = result.logline_master_seq
        }

        const worksql = `
        INSERT INTO dlog_work_list (
            work_content,
            work_level,
            logline_master_seq
        ) VALUES (
            $1.content,
            $1.level,
            $1.logline_master_seq
        )
        RETURNING work_seq
        `
        const workresult = await dao.query_cud(worksql, worklist)
        console.log(workresult.work_seq)
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
        const result = await dao.query_list(sql)
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
        const result = await dao.query_one(sql)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router