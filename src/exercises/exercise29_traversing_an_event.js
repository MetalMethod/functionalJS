//from  http://reactivex.io/learnrx/

//Exercise 29: Traversing an Event

//Subscribing to an Event and traversing an Array are fundamentally the same operation. 
//The only difference is that Array traversal is synchronous and completes, 
//and Event traversal is asynchronous and never completes. 

//If we convert a button click Event to an Observable object, 
//we can use forEach() to traverse the Event.

function(button) {
    var buttonClicks = Observable.fromEvent(button, "click");

    // In the case of an Observable, forEach returns a subscription object.
    var subscription =
        buttonClicks.
            forEach(function (clickEvent) {
                alert("Button was clicked. Stopping Traversal.");

                // Stop traversing the button clicks
                subscription.dispose();
            });
}

//Notice that Observable's forEach() function returns a Subscription object. 
//Disposing of a Subscription object unsubscribes from the event and prevents memory leaks. 
//Disposing of a subscription is the asynchronous equivalent 
//of stopping half-way through a counting for loop.

//Disposing of a Subscription object is basically the same as calling removeEventListener(). 
//On the surface, these two approaches to Event handling don't seem to be very different. 
//Under the circumstances, why should we bother converting Events to Observables? 

//The reason is that if we convert Events to Observable Objects, 
//we can use powerful functions to transform them. 

//In the next exercise we'll learn how we can use one such function 
//to avoid dealing with Subscriptions in many cases...
