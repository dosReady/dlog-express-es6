import express from 'express'
import passport  from 'passport'
import db from '../setting/db'
const router = express.Router()


router.get('/test', async (req, res, next) => {
    try {
        const connection = await db.getConnection()
        const [rows] = await connection.query('SELECT * FROM dlog_user_sessions')
        res.json(rows)    
    } catch (error) {
        next(error)
    }
    
})

router.get('/', async (req, res, next) => {
    const error = req.flash('error')
    res.render('login', {error: error[0]})
})

router.post('/login',passport.authenticate('app-login', {
    failureRedirect: '/',
    successRedirect: '/index',
    failureFlash: true
}))

router.get('/index', (req, res, next) => {
    res.render('index')
})

module.exports = router