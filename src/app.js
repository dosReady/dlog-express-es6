import express from 'express'
import session from 'express-session'
import passport  from 'passport'
import flash from 'connect-flash'
import ejsLocals  from 'ejs-locals'
import bodyParser from 'body-parser'

import modules from './modules'
import app_passport from './setting/app_passport'
import router from './router/index'

const app = express()

// 상부 모듈 영역 
app.engine('ejs', ejsLocals)
app.set('views', __dirname +'/view')
app.set('view engine', 'ejs')

app.use(session({
    secret: '@#@#@D#@L#@#@O@#@G',
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app_passport(passport)

app.use(modules.accesslog)

// router

app.use('/',router)
app.all('*',modules.httpcode_exception)

// 하부 모듈 영역 
app.use(modules.exception)


app.listen(3000, () => {
    console.log('http://127.0.0.1:3000')
})
