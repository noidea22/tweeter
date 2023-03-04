/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// escape function to not get hacked.
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


//older tweet data
const createTweetElement = function (tweet) {
  const $tweet = $(`
  <section class="old-tweets">
  <article class="body">
  <header class="username"> 
    <img class= "avatar" src= '${tweet.user.avatars}'>
      <i class="fa-duotone fa-face-awesome"></i>
      <a class="user-name"> ${tweet.user.name}</a>
    </div>
    <h4 class ="user-handle">${tweet.user.handle}</h4>
  </header>
  <div class="article">${escape(tweet.content.text)}  </div>
  <footer class="footer"> 
    <span class='tweet-date'>${timeago.format(tweet.created_at)}</span>
    <div class='icons'>
    <i class="fa-solid fa-flag abc"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>
</section>
`)
  return $tweet;
}

const renderTweets = function (tweets) {
  console.log(tweets);
  const $tweetContainer = $('.old-tweets')
  $tweetContainer.empty();
  // loops through tweets
  for (const tweet of tweets) {
    const $createTweetElement = createTweetElement(tweet)
    $tweetContainer.prepend($createTweetElement)
  };
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

$(document).ready(function () {
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (data) {
        renderTweets(data)
      });
  }

  loadTweets();


  //renderTweets(data);
  $tweetForm = $('#tweet-form');
  console.log('tweet form:', $tweetForm);
  $tweetForm.on('submit', (event) => {
    event.preventDefault();

    //decode the submit data
    console.log('tweet form:', $tweetForm);
    const urlencoded = $tweetForm.serialize();

    const maxCharCount = 140;

    //bad request code
    const $textAreaValue = $('#tweet-text').val();
    if (($textAreaValue === "") || ($textAreaValue === null)) {
      return $('.warning').show().text("please fill the tweet first.");

    } else if ($textAreaValue.length > maxCharCount) {
      return $('.warning').show().text("tweet is too long to post.");

    } else {
      $.ajax({
        method: "POST",
        url: '/tweets',
        data: urlencoded,
        success: (responce) => {
          $('.warning').empty().hide();
          $('#tweet-text').val("");
          $('.counter').text(140);
          loadTweets();
        }

      });
    }
  });
});