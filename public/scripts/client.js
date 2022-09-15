/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // --- our code goes here ---
  renderTweets(tweetData);

  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data,
    })
      .done(function( msg ) {
        console.log("Post done");
      });
  });
});


const createTweetElement  = (tweetObject) => {
  const html = `<article class="tweet"> 
  <section class="user-info">
    <section class="avatarAndUsername">
      <img class="avatar" src=${tweetObject.user.avatars} alt="Avatar">
      <p class="username">
        ${tweetObject.user.name}
      </p>
    </section>
    <p class="tweeter-tag">
      ${tweetObject.user.handle}
    </p>
  </section>
  <section class="tweet-content">
    <p>
      ${tweetObject.content.text}
    </p>
  </section>
  <section class="additional-info">
    <p class="days-ago">
      ${tweetObject.created_at}
    </p>
    <section class="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </section>
  </section>
</article>`;

return html;
};

const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    const html = createTweetElement(tweet);
    $('.tweet-container').prepend(html);
  }
};

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  } 
];




