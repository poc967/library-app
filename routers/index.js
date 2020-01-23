const express = require('express')
let router = express.Router()

router.use(express.static('public'))

router.get('/', async (request, response) => {
    response.render('index')
})

router.get('/about', async (request, response) => {
    response.render('about')
})

module.exports =
    router