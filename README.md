# InstaScraper

Instagram scraper which uses postaddictme's instagram-php-scraper and custom node scripts to scrape user details (username, full name, bio, id, # of posts, and email) by followers, following, and tag.

### 3 Different Scrapers (found in InstaScraper/vendor/raiym/instagram-php-scraper/scrapers):
  1. getDetailsByFollower.php
    * gets all users following the target username, and writes each user's account details to CSV file 
  2. getDetailsByFollowing.php
    * gets all users the target username is following, and writes each user's account details to CSV file 
  3. getDetailsByTag.php
    * gets owners of top posts using target hashtag, and writes each user's account details to CSV file 


### How To Run:

  1. Install instagram-php-scraper - follow installation instructions [here](https://github.com/postaddictme/instagram-php-scraper)
  2. Add php-clients to the raiym/instagram-php-scraper/ folder
  3. Set valid Instagram credentials
  4. Set correct target values and file paths
  5. Run script from terminal

## Ex:
  1.  'cd CORRECT_FILE_PATH/raiym/instagram-php-scraper/php-clients'
  2.  'php getDetailsByFollower.php'

Source: https://github.com/postaddictme/instagram-php-scraper
