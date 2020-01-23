const express = require('express')
let itemsRouter = express.Router()
const models = require('../models')
const {
    authorizeUser
} = require('../helpers/security')

itemsRouter.use(express.static('public'))
itemsRouter.use(authorizeUser)

itemsRouter.get('/', async (request, response) => {
    const items = await models.items.findAll({})
    response.render('items/show', {
        items
    })
})

itemsRouter.get('/:identifier', async (request, response) => {
    const items = await models.items.findAll({
        where: {
            category: request.params.identifier
        },
    })
    response.render('items/show', {
        items
    })
})

itemsRouter.post('/items/checkout/:identifier', async (request, response) => {
    const item = await models.items.findOne({
        where: {
            id: request.params.identifier
        }
    })

    console.log(item)

    item.update({
        checkedOutBy: request.session.userId,
        isAvailable: false
    })

    request.flash('success', 'item checked out')
    return response.redirect('/users/profile')


})

/*itemsRouter.get('/:identifier/:operation', async (request, response) => {
    const order = await models.items.findOne({
        where: {
            id: request.params.identifier
        }
    })

    if (request.params.operation === 'checkOut') {
        await order.update({
            isAvailable: 'false'
        })
    } else {
        await order.update({
            isAvailable: 'true'
        })
    }

    response.render('items/successfulOrder', {
        order
    })
})*/

itemsRouter.post('/return/:identifier', async (request, response) => {
    const item = await models.items.findOne({
        where: {
            id: request.params.identifier
        }
    })

    item.update({
        checkedOutBy: null,
        isAvailable: true
    })

    request.flash('success', `${item.item} returned`)
    return response.redirect('/users/profile')
})

itemsRouter.get('/admin/manage', (request, response) => {

})

module.exports =
    itemsRouter