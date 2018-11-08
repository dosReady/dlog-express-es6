import moment from 'moment'

exports.accesslog = (req, res, next) => {
    const datetime = moment().format('YYYY-MM-DD HH:mm:ss')
    console.log(`[${datetime}] ${req.path}`)
    next()
}