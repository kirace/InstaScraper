<?php
require '../../../autoload.php';

date_default_timezone_set('America/New_York');

$instagram = \InstagramScraper\Instagram::withCredentials('YOUR_USERNAME', 'YOUR_PASSWORD', 'YOUR_PATH_TO_CACHES_FOLDER'); //third argument is optional
$instagram->login();
sleep(2); // Delay to mimic user

$username = 'TARGET_USERNAME'; // the followers of this username will be scraped
$numFollowers = 1000; // the max number of followers scraped
$followers = [];
$account = $instagram->getAccount($username);
sleep(1);
$followers = $instagram->getFollowers($account->getId(), $numFollowers, 100, true); //100 a time with random delay between requests
//echo json_encode($followers, JSON_PRETTY_PRINT);

for($i = 0; $i < count($followers); $i++){
  $output = shell_exec('node /CORRECT_PATH_TO/InstagramScraper/jsdom_scrapers/profileScrape.js ' . $followers[$i]['username']);
  echo $output;
}

?>
