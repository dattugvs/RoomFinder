# RoomFinder
Room Finder is a web application developed using Node.js and Mongodb. This application is used to find a vacant room or a roommate. 

# Instructions: 
If you would like to download the code and try it for yourself :
  1. Clone the Repo.
  2. Add the Facebook App Id,  App Secret and MongoDB URL in /config / keys.js
  3. Add the API KEY for the google maps api in /views : index.ejs and findroom.ejs
  4. Install node modules by npm install.
  5. Run/ Start server by ‘node server.js’
  6. Open the Index page at localhost : 3000

# Description : 

Firstly, users should register in roomfinder either by facebook authentication or by providing email. Facebook authentication and local login (i.e., login with email) is developed using ‘passportjs’ by providing the email id, password and other user details, which are stored in the ‘Mongodb’ Database.

Registered User either can find a room or a roommate according to his/her requirements.

‘Post a Room’  is used to post the room details and the amenities and rules for the users who wants to get a room/roommate.
After posting the room a ‘room profile’ is generated which shows the posted room details like Rent, Deposit, Check In date and Duration etc. This is developed in javascript and used ‘mongoose’ to save the information in database.

Similarly, Any user can ‘find a room’ by searching with the city or area names. The results will be filtered based on the user amenities with a location shown in the map within the same page thereby finding a room and find Roommates (Who Get You) with the common tastes and requirements.
