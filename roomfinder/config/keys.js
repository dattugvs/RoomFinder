
// expose our config directly to our application using module.exports
module.exports = {

   'facebookAuth' : {
        'clientID'        :  // your App ID
        'clientSecret'    :  // your App Secret
        'callbackURL'     :  'http://localhost:3000/auth/facebook/callback',
        'profileURL'      :  'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   :  ['id', 'email', 'name', 'photos', 'birthday', 'gender', 'likes']
    },
    mongodb : {
        dbURI : 'your_database_here' // looks like mongodb://<user>:<pass>@ds117058.mlab.com:19180/roomfinder
    }
};
