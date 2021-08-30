$(document).ready(function() {

// get a quote from the server when the page loads and add it to the dom
  getQuote();

// when the user enters data and clicks submit, post the quote to the server
  $('#submit').click((e) => {
    e.preventDefault();
    let quote = $('input').val();
    addQuote(quote);
  });

  function getQuote(){
    $.ajax({
      url: `http://127.0.0.1:3001/quote/`,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        $('body').append(data);
        console.log('success');
      },
      error: function () {
        console.error('failed to get quote');
      }
    })

  }

  function addQuote(quote){
    $.ajax({
      url: `http://127.0.0.1:3001/quote/`,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(quote),
      success: function() {
        console.log('success');
      },
      error: function() {
        console.error('failed to add quote');
      }
    })

  }
});
