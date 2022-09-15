/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const loadTweets = function () {
  $.ajax('/tweets', { method: 'GET'})
  .then(function(moreTweets) {
    renderTweets(moreTweets);
  })
};

const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    const html = createTweetElement(tweet);
    $('.tweet-container').prepend(html);
  }
};

const escapeUserText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {
  // --- our code goes here ---
  loadTweets();

  $(".input-error-toolong").hide();
  $(".input-error-empty").hide();

  $("#tweet-form").submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    
    if (data === "text=" || data === null) {
      return $(".input-error-empty").slideDown();
    }
    const tweetText = $(this).find('textarea');

    if (tweetText.val().length > 140) {
      return $(".input-error-toolong").slideDown();
    }
    $.ajax({
      method: "POST",
      url: "/tweets",
      data,
    })
      .done(( msg ) => {
        $(".tweet-container").empty();
        loadTweets();
        this.reset();
      });
  });
});

const createTweetElement  = (tweetObject) => {
  const safeHTML = `<p>${escapeUserText(tweetObject.content.text)}</p>`;
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
      ${safeHTML}
  </section>
  <section class="additional-info">
    <p class="days-ago">
      ${timeago.format(Date(tweetObject.created_at))}
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


