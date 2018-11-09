import passportLocal from 'passport-local'
import pool from './db'

module.exports = (passport) => {
    const LocalStrategy = passportLocal.Strategy
    const sampleuser = {
        userid: 'dos',
        password: 'dos'
    }

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        done(null, user)
    })

    passport.use('app-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        console.log(req)
        if (sampleuser.userid !== username) return done(null, false, {
            message: '존재하지 않는 아이디입니다.'
        })

        if (sampleuser.userid === username && sampleuser.password !== password) return done(null, false, {
            message: '비밀번호가 일치하지 않습니다.'
        })
        
        await pool.query('delete from dlog_user_sessions where sid = ? ', sessionID)
        return done(null, sampleuser)
    }))
}