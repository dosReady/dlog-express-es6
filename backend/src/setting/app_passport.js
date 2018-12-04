import passportLocal from 'passport-local'
import pool from './db'

module.exports = (passport) => {
    const LocalStrategy = passportLocal.Strategy

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
        /*
        if (sampleuser.userid !== username) return done(null, false, {
            message: '존재하지 않는 아이디입니다.'
        })

        if (sampleuser.userid === username && sampleuser.password !== password) return done(null, false, {
            message: '비밀번호가 일치하지 않습니다.'
        })
        */
        try {
            console.log('1231')
            await pool.query('delete from dlog_user_sessions where sid = $1', [String(req.sessionID)])
            const user = await pool.query('SELECT * FROM dlog_user WHERE user_email = $1', [String(username)])
            console.log(user)
            return done(null, sampleuser)
        } catch(error) {
            console.error(error)
            return done(null, false, {
                message: '오류가 발생했습니다. 담당자에게 문의하시기 바랍니다.'
            })
        }
    }))
}