const express = require('express')
let usersRouter = express.Router()
const bodyParser = require('body-parser')
const createUser = require('../controllers/users')
const {
    validateUserForm,
    validateUniqueEmail,
    validateMatchingPasswords,
    validateLoginForm
} = require('../helpers/validators')
const {
    authenticateUser,
    authorizeUserLogin,
    destroySession
} = require('../helpers/security')

usersRouter.use(express.static('public'))
usersRouter.use(bodyParser.urlencoded({
    extended: true
}))

usersRouter.get('/register', async (request, response) => {
    await response.render('partials/forms/register', {
        title: 'sign up '
    })
})

usersRouter.get('/login', async (request, response) => {
    await response.render('partials/forms/login', {
        title: 'log in'
    })
})

usersRouter.post('/login', validateLoginForm, authenticateUser)
usersRouter.post('/register', validateUserForm, validateUniqueEmail, validateMatchingPasswords, createUser)
usersRouter.get('/profile', authorizeUserLogin)
usersRouter.get('/logout', destroySession)

module.exports = usersRouter