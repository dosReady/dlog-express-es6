import passportLocal from 'passport-local'

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
    }, (req, username, password, done) => {
        console.log(req)
        console.log(username)
        console.log(password)
        if (sampleuser.userid !== username) return done(null, false, {
            message: '존재하지 않는 아이디입니다.'
        })

        if (sampleuser.userid === username && sampleuser.password !== password) return done(null, false, {
            message: '비밀번호가 일치하지 않습니다.'
        })

        return done(null, sampleuser)
    }))
}