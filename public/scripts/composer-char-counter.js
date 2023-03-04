$(document).ready(function () {
  $('#tweet-text').on('input', function (event) {
    console.log(event.target.value);
    const currentlength = 140 - event.target.value.length
    const time = $(this).parent().find('.counter').val(currentlength)
    if (currentlength < 0 ){
      time.css('color', "red");
  }else{
      time.css('color', "black");
  }
})
});

