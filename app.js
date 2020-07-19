var express       = require('express'),
    mongoose      = require('mongoose'),
    passport      = require('passport'),
    bodyParser    = require('body-parser'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User      = require('./models/user');

// Application configuration
var app = express();
  // Removes warning from mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/depa');
  // Misc configurations
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
  secret: 'Willow tree',
  resave: false,
  saveUninitialized: false
}));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//console.log(passport.serializeUser(User.serializeUser()));
//console.log(passport.deserializeUser(User.deserializeUser()));


// Routes
app.get('/', function(req, res){
  res.render('index');
});

app.get('/index', function(req, res){
  res.render('index');
});

app.get('/error', function(req, res){
  res.render('error');
});

app.get('/account', isLoggedIn, function(req, res){
  res.render('account');
});

// Authorization routes

// Handling user signup
app.post('/register', function(req,res){
  req.body.username
  req.body.password
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
    }
    passport.authenticate('local')(req, res, function(){
      //res.send("Registered");
      res.redirect('/account');
    });
  });
});

// Login logic
app.post('/login', passport.authenticate('local', {
  successRedirect: '/account',
  failureRedirect: '/error'
}), function(req, res){
});

// User must be logged in for these routes
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/error');
}

// Start server
app.listen(3000, function(){
  console.log('Server has started');
});
