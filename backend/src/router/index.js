import express from 'express'
import passport  from 'passport'
import db from '../setting/db'
const router = express.Router()

router.get('/*', async (req, res, next) => {
    console.log(req.session)
    res.render('dist/index')
})

router.post('/api/login',passport.authenticate('app-login', {
    failureRedirect: '/',
    successRedirect: '/blog',
    failureFlash: true
}))
module.exports = router