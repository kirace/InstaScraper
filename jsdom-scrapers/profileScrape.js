/*
  This script takes in a username and scrapes user's web page for user details,
  writing results to specific CSV file.
*/

var jsdom = require("node-jsdom").jsdom;
var request = require("request");
const fs = require('fs');

var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

//var followers = fs.readFileSync('/Users/kevinirace/vendor/raiym/instagram-php-scraper/examples/followers.txt').toString().split("\n");

var url = "https://www.instagram.com/"+process.argv[2]+"/";

request({
  uri: url,
}, function(error, response, body) {
  //console.log(body);
  var doc = jsdom(body);
  var url_window = doc.parentWindow;
  var profile = url_window._sharedData.entry_data.ProfilePage[0].user;

  var user = {
    username : profile.username,
    full_name : profile.full_name,
    biography : profile.biography,
    external_url : profile.external_url,
    id : profile.id,
    posts : profile.media.count,
  };

  var result =re.exec(profile.biography);
  if(result != null){
    user.email = result[0];
  }
  else{
    user.email = null;
  }
  if(user.biography != null){
    user.biography = "\"" + user.biography.replace(/(\r\n|\n|\r)/gm,"") + "\"";
  }

  var toCSV = user.username + ", " + user.full_name + ", " + user.biography + ", " + user.external_url + ", " +  user.id + ", " + user.posts + ", " + user.email + "\r\n";

  fs.appendFile('YOUR_OUTPUT_FILE.csv', toCSV, function (err) {
    if (err) throw err;
    //console.log('Saved!');
  });

  //console.log(user);
});
