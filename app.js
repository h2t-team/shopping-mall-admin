const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const passport = require('./auth/passport');
const session = require("express-session");
const flash = require('connect-flash');
const { body, validationResult } = require('express-validator');

// router
const indexRouter = require('./components/dashboard');
const userRouter = require('./components/user');
const profileRouter = require('./components/profile');
const productRouter = require('./components/product');
const orderRouter = require('./components/order');
const authRouter = require('./components/auth');

// helpers
const helpers = require('./hbsHelpers');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials', (err) => {});

// load helpers
helpers.helpers(hbs);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60,
    }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Get user from req
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
})

// if user is not logged-in redirect back to login page 
app.use(
    ['/users', '/profile', '/orders', '/products'],
    function (req, res, next) {
        if (req.user == null){
            res.redirect('/auth/login');
        } else {
            next();
        }
    }
);
// app.all('*', (req, res, next) => {
//     if (req.user == null){
//         res.redirect('/auth/login');
//     } else {
//         next();
//     }
// })

app.use('/users', userRouter);
app.use('/profile', profileRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);
app.use('/', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;