<?php
require '../../../autoload.php';

date_default_timezone_set('America/New_York');

$instagram = \InstagramScraper\Instagram::withCredentials('YOUR_USERNAME', 'YOUR_PASSWORD', 'YOUR_PATH_TO_CACHES_FOLDER'); //third argument is optional
$instagram->login();
sleep(2); // Delay to mimic user

$username = 'TARGET_USERNAME'; // the accounts that this user is following will be scraped
$numFollowing = 1000; // the max # of accounts target user is following
$following = [];
$account = $instagram->getAccount($username);
sleep(1);
$following = $instagram->getFollowing($account->getId(), $numFollowing, 100, true); // Get 1000 followers of 'kevin', 100 a time with random delay between requests
//echo json_encode($followers, JSON_PRETTY_PRINT);

for($i = 0; $i < count($following); $i++){
  $output = shell_exec('node /CORRECT_PATH_TO/InstagramScraper/jsdom_scripts/profileScrape.js ' . $following[$i]['username']);
  //echo $output;
}

?>
