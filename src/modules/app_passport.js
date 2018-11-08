import passport  from 'passport'
import passportLocal from 'passport-local'

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

passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false
}, (id, password, done) => {
    if(sampleuser.userid !== id)  return done(null, false, { message: '존재하지 않는 아이디입니다.' })

    if(sampleuser.userid === id && sampleuser.password !== password) return done(null, false, { message: '비밀번호가 일치하지 않습니다.' })

    if(sampleuser.userid === id && sampleuser.password === password) return done(null, sampleuser)

}))