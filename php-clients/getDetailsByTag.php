<?php
require '../../../autoload.php';

date_default_timezone_set('America/New_York');

$instagram = \InstagramScraper\Instagram::withCredentials('YOUR_USERNAME', 'YOUR_PASSWORD', 'YOUR_PATH_TO_CACHES_FOLDER'); //third argument is optional
$instagram->login();

$tag = 'YOUR_HASHTAG'; // users posting with this hashtag will be scraped
$numUsers = 100; // how many users to scrape
$medias = $instagram->getMediasByTag($tag, $numUsers);

for($i = 0; $i < count($medias); $i++){
  $output = shell_exec('node /CORRECT_PATH_TO/InstaScraper/jsdom_scrapers/tagScrape.js ' . $medias[$i]->getLink());
}
//echo json_encode($urls, JSON_PRETTY_PRINT);

?>
