//from  http://reactivex.io/learnrx/

// Exercise 34: HTTP requests

// Events aren't the only source of asynchronous data in an application. There's also HTTP requests. 
// Most of the time HTTP requests are exposed via a callback-based API. 

// To receive data asynchronously from a callback-based API, 
// the client typically passes a success and error handler to the function. 

// When the asynchronous operation completes, the appropriate handler is called with the data. 
// In this exercise we'll use jQuery's getJSON api to asynchronously retrieve data. 

function($) {
    $.getJSON(
        "http://api-global.netflix.com/queue",
        {
            success: function (json) {
                alert("Data has arrived.");
            },
            error: function (ex) {
                alert("There was an error.")
            }
        });
}

