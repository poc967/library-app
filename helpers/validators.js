const models = require('../models')

const validateUserForm = (request, response, next) => {
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    } = request.body

    if (!firstName || firstName === '') {
        request.flash('error', 'first name is required')
        return response.redirect('/users/register')
    }

    if (!lastName || lastName === '') {
        request.flash('error', 'last name is required')
        return response.redirect('/users/register')
    }

    if (!email || email === '') {
        request.flash('error', 'email is required')
        return response.redirect('/users/register')
    }

    if (!password || password === '') {
        request.flash('error', 'password is required')
        return response.redirect('/users/register')
    }

    if (!confirmPassword || confirmPassword === '') {
        request.flash('error', 'confirm password')
        return response.redirect('/users/register')
    }

    next()
}

const validateUniqueEmail = async (request, response, next) => {
    const {
        email
    } = request.body

    const user = await models.users.findAll({
        where: {
            email: email
        }
    })

    if (user.length) {
        request.flash('error', 'email already registered')
        return response.redirect('/users/register')
    }

    next()
}

const validateMatchingPasswords = (request, response, next) => {
    const {
        password,
        confirmPassword
    } = request.body

    if (password !== confirmPassword) {
        request.flash('error', 'passwords do not match')
        return response.redirect('/users/register')
    }

    next()
}

const validateLoginForm = (request, response, next) => {
    const {
        email,
        password
    } = request.body

    if (!email || !password) {
        request.flash('error', 'email or password missing')
        response.redirect('/users/login')
    }

    next()
}

module.exports = {
    validateUserForm,
    validateUniqueEmail,
    validateMatchingPasswords,
    validateLoginForm
}