const models = require('../models')
const {
    hashPassword
} = require('../helpers/security')

const createUser = async (request, response) => {
    const {
        firstName,
        lastName,
        email,
        password
    } = request.body

    const hash = hashPassword(password)

    try {
        const newUser = await models.users.create({
            email,
            firstName,
            lastName,
            password: hash
        })

        request.session.userId = newUser.id
        request.flash('success', 'new user added')
        return response.redirect('/users/profile')

    } catch (error) {

        request.flash('error', 'user could not be created. Please try again.')
        return response.redirect('/users/register')
    }
}

module.exports = createUser