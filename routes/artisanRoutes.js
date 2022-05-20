const express = require('express')
const artisanRouter = express.Router()

const { dashboard, login, loginPost, signup, signupPost, logout, pageNotFound } = require('../controllers/artisanController')

// Home route
// artisanRouter.get('/', dashboard)
artisanRouter.get('/dashboard', dashboard)
// Login routes
artisanRouter.get('/login', login)
artisanRouter.post('/login', loginPost)
// Sign Up routes
artisanRouter.get('/register', signup)
artisanRouter.post('/register', signupPost)
// Log out route
artisanRouter.get('/logout', logout)
// 404 route
artisanRouter.get('*', pageNotFound)

module.exports = artisanRouter