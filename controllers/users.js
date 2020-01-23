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

        request.session.userId = newUser._id
        request.flash('success', 'new user added')
        return response.redirect('/users/register')

    } catch (error) {

        return response.status(400).send(error)
    }
}

module.exports = createUser