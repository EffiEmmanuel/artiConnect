const Artisan = require('../models/Artisan')
const bcrypt = require('bcryptjs')
const session = require('express-session')

const dashboard = (req, res) => {
    if (req.session.artisanUsername && req.session.isArtisanLoggedIn) {
        res.render('dashboard', { artisanUsername: req.session.artisanUsername, isArtisanLoggedIn: req.session.isArtisanLoggedIn, isUserLoggedIn: req.session.isUserLoggedIn, username: req.session.username })
    } else {
        req.flash('error_msg', 'Unauthorized access. Please log in to view page!')
        res.redirect('/artisan/login')
    }
}

// Log in Routes
const login = (req, res) => {
    res.render('artisanLogin', { artisanUsername: req.session.artisanUsername, isArtisanLoggedIn: req.session.isArtisanLoggedIn, isUserLoggedIn: req.session.isUserLoggedIn, username: req.session.username })
}

const loginPost = (req, res) => {
    console.log(req.body)
    const { username, password } = req.body

    if (!username || !password) {
        req.flash('error_msg', 'Some fields are missing')
        return res.redirect('/artisan/login')
    } else {
        Artisan.findOne({ username }, (error, result) => {
            // console.log(error)
            // console.log(result)
            if (result == null) {
                req.flash('error_msg', 'User does not exist, Please sign up')
                return res.redirect('/artisan/login')
            } else {
                bcrypt.compare(password, result.password, (error, isVerified) => {
                    // console.log(result)
                    // console.log(error)
                    if (!isVerified) {
                        req.flash('error_msg', 'Invalid username or password')
                        res.redirect('/artisan/login')
                    } else {
                        req.flash('message', 'Log in successful!')
                        req.session.isUserLoggedIn = false
                        req.session.username = ''
                        req.session.isArtisanLoggedIn = true
                        req.session.artisanUsername = result.username
                        console.log(req.session)
                        // SET SESSION VARIABLES HERE
                        res.redirect('/artisan/dashboard')
                    }

                })
            }

        })
    }
}

// Sign Up Routes
const signup = (req, res) => {
    res.render('artisanSignup', { artisanUsername: req.session.username, isArtisanLoggedIn: req.session.isArtisanLoggedIn, isUserLoggedIn: req.session.isUserLoggedIn, username: req.session.username })
}

const signupPost = (req, res) => {
    const { contactName, contactPhone, contactEmail, businessName, cacStatus, jobTitle, staffStrength, contactAddress, state, website, username, password, profilePicture } = req.body

    if (!contactName || !contactPhone || !contactEmail || !businessName || !cacStatus || !jobTitle || !staffStrength || !contactAddress || !state || !website || !username || !password || !profilePicture) {
        req.flash('error_msg', 'Some fields are missing!')
        return res.redirect('/artisan/register')
    } else {
        Artisan.findOne({ contactEmail, $or: [{ username }] }, (error, result) => {
            // console.log(result)
            // console.log(error)
            if (result !== null) {
                req.flash('error_msg', 'This user already exists! Please Log in')
                return res.redirect('/artisan/register')
            } else {
                bcrypt.hash(password, 10, (error, hash) => {
                    console.log(error)
                    console.log(hash)
                    if (hash == null) {
                        req.flash('error_msg', 'A problem has occured, please try again');
                        return res.redirect('/artisan/register')
                    }

                    let newArtisan = new Artisan({
                        contactName,
                        contactPhone,
                        contactEmail,
                        businessName,
                        cacStatus,
                        jobTitle,
                        staffStrength,
                        contactAddress,
                        state,
                        website,
                        username,
                        password: hash,
                        profilePicture
                    })

                    newArtisan.save(err => {
                        console.log(err)
                        if (err) {
                            req.flash('error_msg', 'A problem occured, please try again')
                            return res.redirect('/artisan/register')
                        } else {
                            req.flash('message', 'Account successfully created!')
                            console.log(newArtisan)
                            return res.redirect('/artisan/login')
                        }
                    })

                })
            }
        })


    }
}

const logout = (req, res) => {
    req.session.artisanusername = ''
    req.session.isArtisanLoggedIn = false
    console.log(req.session)
    req.flash('message', 'Logged out')
    res.redirect('/artisan/login')
    // res.render('index', {username: req.session.username, isLoggedIn: req.session.isLoggedIn})
}

const pageNotFound = (req, res) => {
    // Render a better 404 page here
    res.render('pageNotFound', { artisanUsername: req.session.artisanUsername, isArtisanLoggedIn: req.session.isArtisanLoggedIn, isUserLoggedIn: req.session.isUserLoggedIn, username: req.session.username })
}


module.exports = {
    dashboard,
    login,
    loginPost,
    signup,
    signupPost,
    logout,
    pageNotFound
}