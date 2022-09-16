/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // --- our code goes here ---
  loadTweets();

  $(".arrow").on("click", compose);

  $(".input-error-toolong").hide();
  $(".input-error-empty").hide();
  $(".new-tweet").hide();

  $("#tweet-form").submit(tweetFormSubmit);
});

//error handling and form submission using AJAX
const tweetFormSubmit = function(event) {
  event.preventDefault();
  const data = $(this).serialize();
  
  if (data === "text=" || data === null) {
    $(".input-error-toolong").slideUp();
    return $(".input-error-empty").slideDown();
  }
  const tweetText = $(this).find('textarea');

  if (tweetText.val().length > 140) {
    $(".input-error-empty").slideUp();
    return $(".input-error-toolong").slideDown();
  }

  $.ajax({
    method: "POST",
    url: "/tweets",
    data,
  })
    .done(( msg ) => {
      $(".input-error-toolong").slideUp();
      $(".input-error-empty").slideUp();
      $(".tweet-container").empty();
      loadTweets();
      this.reset();
      $(".counter").text(140);
    });
};

//show or hide new tweet form when compose button is pressed
const compose = function () {
  $(".new-tweet").slideToggle();
};

//load all tweets 
const loadTweets = function () {
  $.ajax('/tweets', { method: 'GET'})
  .then(function(moreTweets) {
    renderTweets(moreTweets);
  })
};

//send all tweets one by one to be rendered into html
const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    const html = createTweetElement(tweet);
    $('.tweet-container').prepend(html);
  }
};

//prevent attacks
const escapeUserText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//send html with applicable values to be added to the main page
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


