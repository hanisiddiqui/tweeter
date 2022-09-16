let charCount = 140;

$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on("input", onInput);
});

//Display character count when typing in form
const onInput = function() {
  $(".input-error-empty").slideUp();
  const input = $(this);
  const remaining = 140 - input.val().length;
  const form = input.parent();
  const counter = form.find("output.counter");

  if (remaining < 0) {
    counter.addClass("negative-chars");
  } else {
    counter.removeClass("negative-chars");
    $(".input-error-toolong").slideUp();
  }

  counter.text(remaining);
};
