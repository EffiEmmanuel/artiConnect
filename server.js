const express = require('express')
const { default: mongoose } = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()

const userRouter = require('./routes/userRoutes')
const artisanRouter = require('./routes/artisanRoutes')

mongoose.connect('mongodb://localhost:27017/bizbridge')
.then(() => {
    console.log('Successfully connected to the database')
})
.catch((error) => {
    console.log('Error: ' + error.message)
})


// MIDDLEWARES
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use('/public', express.static('public'))

app.use(session({
	secret: "secret",
	resave: true,
	saveUninitialized: true
}));

app.use(flash());

app.use((req, res, next) => {
	res.locals.message = req.flash('message');
	res.locals.searchMessage = req.flash('searchMessage');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.searchErrorMessage = req.flash('searchErrorMessage');
	next();
});


app.use('/', userRouter)
app.use('/artisan', artisanRouter)

const port = provecc.env.PORT || 5000

app.listen(port, (req, res) => {
    console.log('Server listening on port ' + port)
})