var models = require('../models/user');

module.exports = function(app) {
	    app.post('/postroom', (req,res)=> {
            
            var newRoom = models.Room();
            var newRoomArea = models.Area();

            var loc = req.body.location.split(',');
            var lang = loc[0].substring(1);
            var long = loc[1].substring(1,loc[1].length-1);

            newRoom.userid = req.user._id;
            newRoom.agepref = req.body.agepref;
            newRoom.genderpref = req.body.genderpref;
            newRoom.rent = req.body.rent;
            newRoom.deposit = req.body.deposit;
            newRoom.duration = req.body.duration;
            newRoom.location = [parseFloat(lang),parseFloat(long)];

            newRoomArea.userid = req.user._id;
            newRoomArea.location = [parseFloat(lang),parseFloat(long)];
            newRoomArea.rent = req.body.rent;
            newRoom.save(function(err, room){
                if (err)
                    res.send(JSON.stringify(err));

                models.Profile.findByIdAndUpdate({_id:req.user._id},
                    { "$push": { "rooms": room._id } },
                    { "new": true, "upsert": true },
                    function (err, updatedProfile) {
                        if (err) res.send(JSON.stringify(err));
                        console.log(updatedProfile);
                    }
                );

                newRoomArea.roomid = room._id;
                newRoomArea.save((err)=> {
                    if (err)
                        res.send(JSON.stringify(err));
                });
                 res.redirect('/rooms/'+room._id);
            });
        });

	    app.post('/profile', (req, res) => {
            var data = req.body;
            var describeList = ['Foodie','Bookworm', 'Fitness Junkie', 'Party Person', 'Night Owl'];
            var questionsList = ['How often do you clean your apartment?','Do you smoke?','How do you feel about pets?','How about guests?'];

            req.body['questions'] = [];
            req.body['Describe Yourself'] = [];

            for (var i = 0, len = describeList.length; i < len; i++)
            {
                prop = describeList[i];
                if(req.body[prop])
                {
                    delete req.body[prop];
                    req.body['Describe Yourself'].push(prop);
                }
            }

            // for (var i = 0, len = questionsList.length; i < len; i++)
            // {
            //     prop = questionsList[i];
            //     if(req.body[prop])
            //     {
            //         delete req.body[prop];
            //         req.body['questions'].push(prop);
            //     }
            // }

            models.User.findOne({'fbid': req.body.fbid}, function(err, user)
            {
                if(err) res.send(JSON.stringify(err));
                req.body['userid'] = user._id;
                req.body['_id'] = user._id;
                user.userid=user._id;
                user.save(function(err){
                   if(err) res.send(JSON.stringify(err));
                });
                var newProfile = new Profile(req.body);
                newProfile.save(function(err) {
                    if(err) return done(err);
                });
            });
        
            res.redirect('/');
        });

        app.get('/getUserList',(req,res)=> {
            models.User.find({ pwd: { $exists: true, $ne: null } }).select({email : 1, pwd : 1, _id: 0}).exec((err,users)=> {
                console.log(users);
                res.send(users);
            });
        });

        app.get('/rooms/:roomid', (req,res)=> {
            models.Room.findOne({'_id':req.params.roomid},function(err, room){
                    console.log("room profile:\n"+room);
                    res.render('room',{'roomProfile':room, 'user':req.user});
                });
        });

        app.get('/users/:userid', (req,res)=> {
            models.User.findOne({'_id':req.params.userid},function(err, user){
                console.log("user profile:\n"+user);
                res.render('profile',{'profileuser':user, 'user':req.user });
            });
        });

        app.get('/getAreasList', (req,res)=> {
            models.Area.find({}).sort({rent: 'asc'}).exec((err, areas)=>{
                if(err) res.send(JSON.stringify(err));
                res.send(areas);
            });
        });

        app.get('/getRoomProfileList', (req,res)=> {
            models.Room.find({}).sort({rent: 'asc'}).exec((err, rooms)=>{
                if(err) res.send(JSON.stringify(err));
                //console.log(rooms);
                res.send(rooms);
            });
        });
}
