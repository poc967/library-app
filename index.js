const express = require('express')
const app = express()
const path = require('path')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const indexRouter = require('./routers/index')
const itemsRouter = require('./routers/items')
const usersRouter = require('./routers/users')

app.use(cookieParser('keyboard cat'))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}))
app.use(flash())

app.use((request, response, next) => {
    response.locals.currentUser = request.session.userId

    next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/items', itemsRouter)
app.use('/users', usersRouter)
app.use('/', indexRouter)

app.all('*', (request, response) => {
    response.sendStatus(404)
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

module.exports = server