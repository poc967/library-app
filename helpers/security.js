const bcrypt = require('bcryptjs')
const models = require('../models')

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10)
}

const authenticateUser = async (request, response, next) => {
    const {
        email,
        password
    } = request.body

    try {
        const user = await models.users.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            request.flash('error', 'user is not found')
            return response.redirect('/users/login')
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            request.flash('error', 'incorrect email or password')
            return response.redirect('/users/login')
        } else {
            request.session.userId = user.id
            return response.redirect('/users/profile')
        }
    } catch (error) {
        return response.render('/error', error)
    }
}

const authorizeUserLogin = async (request, response, next) => {
    if (!request.session.userId) {
        request.flash('error', 'you are not authorized to view this page')
        return response.redirect('/users/login')
    }

    try {
        const user = await models.users.findOne({
            where: {
                id: request.session.userId
            }
        })

        const orders = await models.items.findAll({
            where: {
                checkedOutBy: request.session.userId
            }
        })

        return response.render('profile', {
            title: 'profile',
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            orders
        })

    } catch (error) {
        return response.render('error', {
            error
        })
    }
}

const destroySession = async (request, response) => {
    if (request.session) {
        request.session.destroy()
        return response.redirect('/')
    }
}

const authorizeUser = async (request, response, next) => {
    if (!request.session.userId) {
        request.flash('error', 'you are not authorized to view this page')
        return response.redirect('/users/login')
    }

    next()
}

module.exports = {
    hashPassword,
    authenticateUser,
    authorizeUser,
    destroySession,
    authorizeUserLogin
}