//PASSPORT JS
passport.use(new LocalStrategy(
    (username, password, done) => {
        models.User.findOne({
            username: username
        }, (err, user) => {
            console.log("login request: username: " + username + " password: " + password)
            if(err)
            {
                console.log("login error")
                return done(err)
            }
            if(!user)
            {
                console.log("incorrect username")
                return done(null, false, {message: 'Incorrect username'})
            }
            console.log("real password: " + user.password)
            if(!(user.password === password))
            {
                console.log("incorrect password")
                return done(null, false, {message: 'Incorrect password'})
            }
            console.log("login succes " + user.username)
            return done(null, user)
        })
    }
))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    models.User.findById(id, (err, user) => {
        if(err) { return done(err) }
        done(null, user)
    })
})


router.post("/login",
    passport.authenticate('local', {}),
    (req, res) => {
        res.send(req.flash())
    }
)

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy