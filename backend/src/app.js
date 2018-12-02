import express from 'express'
import session from 'express-session'
import passport  from 'passport'
import flash from 'connect-flash'
import ejsLocals  from 'ejs-locals'
import bodyParser from 'body-parser'

import modules from './modules'
import app_passport from './setting/app_passport'
import db from './setting/db'
//한군데 모아서 전달할 방법없나..
import router from './router/index'
import blogs from './router/blog'
import comments from './router/comments'
import tags from './router/tags'
import replys from './router/replys' 
import profiles from './router/profile'

const app = express()

// 상부 모듈 영역 
app.engine('ejs', ejsLocals)
app.set('views', __dirname +'/view')
app.set('view engine', 'ejs')
app.use('/static', express.static(__dirname + '/view/dist/static'))

app.use(session({
    store: db.sessionStore,
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
app.use('/', router)
app.use('/api/tag', tags)
app.use('/api/blog', blogs)
app.use('/api/comment', comments)
app.use('/api/reply', replys)
app.use('/api/profile', profiles)

app.all('*',modules.httpcode_exception)

// 하부 모듈 영역 
app.use(modules.exception)


app.listen(80, () => {
    console.log('http://127.0.0.1')
})
