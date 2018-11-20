import dao from '../modules/dao'

module.exports = class Logline {
    constructor () {}
    async add (req, connection) {
        let resultsql = ''
        let resultparams = []
        try {
            const data = req.body.data
            const mastersql = `
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
            resultsql += mastersql + '\n'
            const [rows] = await connection.query(mastersql)
            /*
            const worksqls = `
            INSERT INTO dlog_work_list (work_content, work_level, logline_master_seq)
            VALUES ?
            `
            const worklist = data.worklist
            const workparms = []
            for (const work  of worklist) {
                const workval = [work.work_content, work.work_level, rows.insertId]
                workparms.push(workval)
            }
            resultsql += worksqls
            resultparams.push(workparms)
            await connection.query(worksqls, [workparms])
            */
        } catch (error) {
           throw error
        } finally {
            console.log(resultsql)
            // console.log(resultparams)
        }
    
    }

    async update (req, connection) {
        let resultsql = ''
        try {
            const seq = req.body.seq
            const data = req.body.data
            const updatesql = `
            UPDATE dlog_logline_master
            SET logline_master_title='${data.subject}',
                logline_master_content='${data.content}',
                update_date=CURRENT_TIMESTAMP
            WHERE logline_master_seq=${seq}
            `
            resultsql += updatesql + '\n'
            await connection.query(updatesql)
        } catch (error) {
            throw error
        } finally {
            console.log(resultsql)
        }
    }

    async delete (req, connection) {
        let resultsql = ''
        try {
            const seq = req.body.seq
            const delWorksql = `
                DELETE FROM dlog_work_list WHERE logline_master_seq = ${seq}
            `
            const delMstsql = `
                DELETE FROM dlog_logline_master WHERE logline_master_seq = ${seq}
            `
            resultsql += delWorksql + '\n' + delMstsql
            await connection.query(delWorksql)
            await connection.query(delMstsql)
        } catch (error) {
            throw error
        } finally {
            console.log(resultsql)
        }
    }

    async detail (req) {
        const id = req.body.id
        const mastersql = `
            SELECT 
                logline_master_title as subject,
                logline_master_content as content
            FROM dlog_logline_master 
            WHERE logline_master_seq = '${id}'
        `
        const result = await dao.select(mastersql)
        /*
        const worksql = `
        SELECT
            work_seq,
            work_content,
            work_level
        FROM dlog_work_list
        WHERE logline_master_seq = '${id}'
        `
        result.worklist = await dao.list(worksql)
        */
        return result
    }

    async list () {
        const sql = `
        SELECT
            logline_master_seq,
            logline_master_title,
            LEFT(logline_master_content, 300) AS logline_master_content
        FROM dlog_logline_master
        `
        const result = await dao.list(sql)
        return result
    }
}