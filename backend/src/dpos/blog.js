import dao from '../modules/dao'

module.exports = class Blog {
    constructor () {}
    async insert (req, connection) {
        let resultsql = ''
        let resultparams = []
        try {
            const data = req.body.data
            const mastersql = `
            INSERT INTO dlog_blog_master (
                blog_master_title,
                blog_master_content,
                blog_worklist_seq,
                file_group_seq,
                action_log_seq
            )
            VALUES(
                '${data.blog_master_title}',
                '${data.blog_master_content}',
                null,
                null,
                null
            )
            `
            resultsql += mastersql + '\n'
            const [rows] = await connection.query(mastersql)
            /*
            const worksqls = `
            INSERT INTO dlog_work_list (work_content, work_level, blog_master_seq)
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
            UPDATE dlog_blog_master
            SET blog_master_title='${data.blog_master_title}',
                blog_master_content='${data.blog_master_content}',
                update_date=CURRENT_TIMESTAMP
            WHERE blog_master_seq=${seq}
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
                DELETE FROM dlog_work_list WHERE blog_master_seq = ${seq}
            `
            const delMstsql = `
                DELETE FROM dlog_blog_master WHERE blog_master_seq = ${seq}
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
                blog_master_title,
                blog_master_content,
                DATE_FORMAT(update_date, '%Y-%m-%d %H:%i') AS update_date
            FROM dlog_blog_master 
            WHERE blog_master_seq = '${id}'
        `
        const result = await dao.select(mastersql)
        /*
        const worksql = `
        SELECT
            work_seq,
            work_content,
            work_level
        FROM dlog_work_list
        WHERE blog_master_seq = '${id}'
        `
        result.worklist = await dao.list(worksql)
        */
        return result
    }

    async list () {
        const sql = `
        SELECT
            blog_master_seq,
            blog_master_title,
            LEFT(blog_master_content, 250) AS blog_master_content,
            DATE_FORMAT(update_date, '%Y-%m-%d %H:%i') AS update_date
        FROM dlog_blog_master
        ORDER BY update_date DESC
        `
        const result = await dao.list(sql)
        return result
    }
}