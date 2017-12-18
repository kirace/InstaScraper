/*
    This program takes in a link to an Instagram image page, finds the associated username,
    then scrapes user page for the rest of details before writing results to CSV file.
*/

var jsdom = require("node-jsdom").jsdom;
var request = require("request");
const fs = require('fs');

var url = process.argv[2]; //url for Instagram image page

var re = /((?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?))/;
var re2 = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

request({
  uri: url,
}, function(error, response, body) {

  var newDoc = jsdom(body);
  var metas = newDoc.getElementsByTagName("meta");
  var content = metas[10].getAttribute("content");  //  Should be 10th meta tag for each page?
  var username = re.exec(content)[0];
  //console.log(username);
  username = username.substr(1); //username associated with image

  request({
    uri: "https://www.instagram.com/"+username+"/",
  }, function(error, response, body) {

    var doc = jsdom(body);
    var url_window = doc.parentWindow;
    var profile = url_window._sharedData.entry_data.ProfilePage[0].user;
    var user = {
      username : profile.username,
      biography : profile.biography,
      external_url : profile.external_url,
      id : profile.id,
      posts : profile.media.count,
    };

    var result =re2.exec(profile.biography);
    if(result != null){
      user.email = result[0];
    }
    else{
      user.email = null;
    }
    if(user.biography != null){
      user.biography = "\"" + user.biography.replace(/(\r\n|\n|\r)/gm,"") + "\"";
    }

    let toCSV = user.username + ", " + user.biography + ", " + user.external_url + ", " +  user.id + ", " + user.posts + ", " + user.email + "\r\n";

    fs.appendFile('YOUR_OUTPUT_FILE.csv', toCSV, function (err) {
      if (err) throw err;
      //console.log('Saved!');
    });
  });
});
