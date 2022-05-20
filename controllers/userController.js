const bcrypt = require('bcryptjs')
const session = require('express-session')
const Artisan = require('../models/Artisan')
// const flash = require('connect-flash')
// const session = require('express-session')
// const session = require('express-session')
const User = require('../models/User')

const home = (req, res) => {
    console.log(req.session)
    res.render('index', { isUserLoggedIn: req.session.isUserLoggedIn, username: req.session.username, artisanUsername: req.session.artisanUsername, isArtisanLoggedIn: req.session.isArtisanLoggedIn })
}

const about = (req, res) => {
    res.render('about', { isUserLoggedIn: req.session.isUserLoggedIn, username: req.session.username, artisanUsername: req.session.artisanUsername, isArtisanLoggedIn: req.session.isArtisanLoggedIn })
}

const search = (req, res) => {
    const { jobTitle, state } = req.body
    res.render('search', { jobTitle: jobTitle, state: state, result: null, isUserLoggedIn: req.session.isUserLoggedIn, username: req.session.username, artisanUsername: req.session.artisanUsername, isArtisanLoggedIn: req.session.isArtisanLoggedIn })
}


// Log in Routes
const login = (req, res) => {
    res.render('login', { isUserLoggedIn: req.session.isUserLoggedIn, username: req.session.username, artisanUsername: req.session.artisanUsername, isArtisanLoggedIn: req.session.isArtisanLoggedIn })
}

const loginPost = (req, res) => {
    console.log(req.body)
    const { username, password } = req.body

    if (!username || !password) {
        req.flash('error_msg', 'Some fields are missing')
        return res.redirect('/login')
    } else {
        User.findOne({ username }, (error, result) => {
            // console.log(error)
            // console.log(result)
            if (result == null) {
                req.flash('error_msg', 'User does not exist, Please sign up')
                return res.redirect('/login')
            } else {
                bcrypt.compare(password, result.password, (error, isVerified) => {
                    // console.log(result)
                    // console.log(error)
                    if (!isVerified) {
                        req.flash('error_msg', 'Invalid username or password')
                        res.redirect('/login')
                    } else {
                        req.flash('message', 'Log in successful!')
                        req.session.isArtisanLoggedIn = false
                        req.session.artisanUsername = ''
                        req.session.isUserLoggedIn = true
                        req.session.username = result.username
                        console.log(req.session)
                        // SET SESSION VARIABLES HERE
                        res.redirect('/')
                    }

                })
            }

        })
    }


}

// Sign Up Routes
const signup = (req, res) => {
    res.render('signup', { isUserLoggedIn: req.session.isUserLoggedIn, username: req.session.username, artisanUsername: req.session.artisanUsername, isArtisanLoggedIn: req.session.isArtisanLoggedIn })
}

const signupPost = (req, res) => {
    // console.log(req.body)
    const { fullName, email, username, password } = req.body

    let errors = []

    if (!fullName || !email || !username || !password) {
        req.flash('error_msg', 'Some fields are missing!')
        return res.redirect('/signup')
    } else {
        User.findOne({ email, $or: [{ username }] }, (error, result) => {
            console.log(result)
            console.log(error)
            if (result !== null) {
                req.flash('error_msg', 'This user already exists! Please Log in')
                return res.redirect('/signup')
            } else {
                bcrypt.hash(password, 10, (error, hash) => {
                    if (error) {
                        req.flash('error_msg', 'A problem has occured, please try again');
                        return res.redirect('/signup')
                    }

                    let newUser = new User({
                        fullName,
                        email,
                        username,
                        password: hash
                    })

                    newUser.save(err => {
                        if (err) {
                            req.flash('error_msg', 'A problem occured, please try again')
                            return res.redirect('/signup')
                        } else {
                            req.flash('message', 'Account successfully created!')
                            console.log(newUser)
                            return res.redirect('/login')
                        }
                    })

                })
            }
        })


    }
}

const logout = (req, res) => {
    req.session.username = ''
    req.session.isUserLoggedIn = false
    console.log(req.session)
    req.flash('message', 'Logged out')
    res.redirect('/')
}

const searchByServiceAndState = (req, res) => {
    console.log(req.body)
    const { jobTitle, state } = req.body

    if (!jobTitle || !state) {
        req.flash('error_msg', 'Some fields are missing!')
        res.redirect('/')
    }

    Artisan.find({ jobTitle, state }, (error, result) => {
        if (error) {
            console.log('An error occured')
        }

        if (result.length < 1) {
            // req.flash('searchMessage', undefined)
            req.flash('searchErrorMessage', `no results found for ${jobTitle}s in ${state}`)
            res.render('search', { jobTitle: jobTitle, state: state, result: null, isUserLoggedIn: req.session.isUserLoggedIn, username: req.session.username, artisanUsername: req.session.artisanUsername, isArtisanLoggedIn: req.session.isArtisanLoggedIn })
        } else {
            // req.flash('searchErrorMessage', undefined)
            req.flash('searchMessage', `Search results for ${jobTitle}s in ${state}`)
            // res.redirect('/search')
            res.render('search', { jobTitle: jobTitle, state: state, result: result, isUserLoggedIn: req.session.isUserLoggedIn, username: req.session.username, artisanUsername: req.session.artisanUsername, isArtisanLoggedIn: req.session.isArtisanLoggedIn })
        }

    })
}

const pageNotFound = (req, res) => {
    // Render a better 404 page here
    res.render('pageNotFound', { artisanUsername: req.session.artisanUsername, isArtisanLoggedIn: req.session.isArtisanLoggedIn, isUserLoggedIn: req.session.isUserLoggedIn, username: req.session.username })
}


module.exports = {
    home,
    about,
    login,
    loginPost,
    signup,
    signupPost,
    logout,
    search,
    searchByServiceAndState,
    pageNotFound
}