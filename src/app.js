import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import passport  from 'passport'

import modules from './modules'
import router from './router/index'

const app = express()

// 상부 모듈 영역 
app.use(session({
    secret: '@#@#@D#@L#@#@O@#@G',
    resave: false,
    saveUninitialized: true
}))


app.use(passport.initialize())
app.use(passport.session())

app.use(modules.accesslog)

// router

app.use('/',router)
app.all('*',modules.httpcode_exception)

// 하부 모듈 영역 
app.use(modules.exception)




app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})
