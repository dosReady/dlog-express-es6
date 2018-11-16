import express from 'express'
import dao from '../modules/dao'
const router = express.Router()

router.post('/add', async (req, res, next) => {
    
    try {
        const data = req.body.data
        const sql = `
            INSERT INTO dlog_logline_master (
                logline_master_seq,
                logline_master_title,
                logline_master_content,
                logline_worklist_seq,
                dlog_file_seq,
                create_date,
                update_date,
                dog_action_seq
            )
            VALUES(
                nextval('dlog_loline_master_seq'),
                '${data.subject}',
                '${data.content}',
                null,
                null,
                now(),
                now(),
                null
            )
        `
        const result = await dao.query_cud(sql)
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