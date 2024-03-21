var express = require('express');
var router = express.Router();
const userModel = require('./users')
const passport = require('passport')
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});




//##################### User authentication routes #####################

router.post('/register',async (req, res, next) => {
  const userData =await new userModel({
    username: req.body.username,
    email:req.body.email,
    password:req.body.passport
  })
  userModel
    .register(userData, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/')
      })
    })
  
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/feed',
  failureRedirect: '/login',
  failureFlash: true
}),
  function (req, res) { }
)

router.get('/logout', (req, res, next) => {
  if (req.isAuthenticated())
    req.logout((err) => {
      if (err) {
        res.send(err);
      } else {
        res.redirect('/');
      }

    })
  else {
    res.redirect('/');
  }
});

function islogedIn(req, res, next) {
  if (req.isAuthenticated())
    return next()
  res.redirect('/login')
}


//##################### User authentication routes #####################
router.get('/feed',function(req,res,next){
  res.render('feed');
})


module.exports = router;
