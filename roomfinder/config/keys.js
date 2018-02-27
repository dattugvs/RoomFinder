
// expose our config directly to our application using module.exports
module.exports = {

   'facebookAuth' : {
        'clientID'        :  // your App ID
        'clientSecret'    :  // your App Secret
        'callbackURL'     :  // your callback URL,
        'profileURL'      : // profile URL   
        'profileFields'   : // For requesting permissions from Facebook API
    },
    mongodb : {
        dbURI :// databasr URI
    }
};
