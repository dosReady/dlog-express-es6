import dao from '../modules/dao'

module.exports = class Logline {
    constructor () {}
    async loglineAdd (req, connection) {
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
            
            const worksqls = `
            INSERT INTO dlog_work_list (work_content, work_level, logline_master_seq)
            VALUES ?
            `
            const worklist = data.worklist
            const workparms = []
            for (const work  of worklist) {
                const workval = [work.content, work.level, rows.insertId]
                workparms.push(workval)
            }
            resultsql += worksqls
            resultparams.push(workparms)
            await connection.query(worksqls, [workparms])
        } catch (error) {
           throw error
        } finally {
            console.log(resultsql)
            console.log(resultparams)
        }
    
    }

    async list () {
        const sql = `
        SELECT * FROM dlog_logline_master
        `
        const result = await dao.list(sql)
        return result
    }
}