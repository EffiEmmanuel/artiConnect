const express = require('express')
const userRouter = express.Router()

const { home, about, login, loginPost, signup, signupPost, logout, searchByServiceAndState, search, pageNotFound } = require('../controllers/userController')

// Home route
userRouter.get('/', home)
userRouter.post('/', searchByServiceAndState)
userRouter.post('/search', searchByServiceAndState)
// About route
userRouter.get('/about', about)
// Login routes
userRouter.get('/login', login)
userRouter.post('/login', loginPost)
// Sign Up routes
userRouter.get('/signup', signup)
userRouter.post('/signup', signupPost)
// Search routes
userRouter.get('/search', search)
// Log out route
userRouter.get('/logout', logout)


module.exports = userRouter