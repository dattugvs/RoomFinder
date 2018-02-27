var models = require('../models/user');
module.exports = function(app,passport) {
    

    app.get(['/','/home'], function(req, res) {
        res.render('index',{user:req.user});
    });

    app.get('/test', (req,res)=> {
        console.log("\nTest:\n"+req.user+"\n");
        if(req.user.userid)
            res.redirect('/');
        else
            res.redirect('/signup');
    });

    app.get('/signin',(req,res)=>{
        if(!req.user)
            res.render('signin');
        else
            res.redirect('/',{user:req.user});
    });
    app.get('/signup',(req,res)=> {
        res.render('signup',{user:req.user});
    });

    app.get('/findroom', (req,res)=> {
        res.render('findroom',{user:req.user});
    });
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile',{user : req.user});
    });

    app.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/postroom', (req,res)=>{
        if(req.user)
            res.render('postroom',{user: req.user});
        else
            res.redirect('/signup');
            
    }); 
    
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['public_profile', 'email', 'user_birthday','user_likes']
    }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/test',
        failureRedirect: '/'
    }));

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    app.post('/signin', passport.authenticate('local-login', {
            successRedirect : '/',
            failureRedirect : '/signin',
            failureFlash : true
    }));

    // app.post('/signup', (req,res)=> {
    //     console.log("\n=> signup post req <=\n");
    //     res.end(JSON.stringify(req.body, null, 2));
    // })

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}

String.prototype.initCap = function () {
   return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
      return m.toUpperCase();
   });
};