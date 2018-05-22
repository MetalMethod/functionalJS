//from  http://reactivex.io/learnrx/

//Exercise 30: Completing Sequences with take()

//Have you ever wished that you could listen for the next occurrence of an event 
//and then immediately unsubscribe? 

//For example, developers will often attach an event handler to window.onload, 
//expecting that their event handler will only be called once.

window.addEventListener(
	"load",
	function(){
		// do some work here, but expect this function will only be called once.
    })

//In instances such as this, it's good practice to unsubscribe from the event after it's fired. 
//Failing to unsubscribe is a memory leak. 
//Depending on the circumstances, memory leaks can seriously destablize your application 
//and can be very difficult to track down. 

//Unfortunately unsubscribing from an event after one occurrence can be cumbersome: 

var handler = function() {
	// do some work here, then unsubscribe from the event
	window.removeEventListener("load", handler)
};
window.addEventListener("load", handler);

//Wouldn't it be nice if there was an easier way to code this? 
//That's why Observable has a take() function. The take() function works like this... 

seq([1,,,2,,,3,,,4,,,5,,,6,,,]).take(3) === seq([1,,,2,,,3]);

//An Observable based on an Event will never complete on its own. 
//The take() function creates a new sequence that completes after a discrete number of items arrive. 
//This is important, because unlike an Event, when an Observable sequence completes 
//it unsubscribes all of its listeners. 

//That means that if we use take() to complete our Event sequence, we don't need to unsubscribe!

//Let's repeat the previous exercise, 
//in which we listened for a single button click and then unsubscribed. 

//This time let's use the take() function to complete the sequence after the button is clicked.

function(button) {
	var buttonClicks = Observable.fromEvent(button, "click");

	// Use take() to listen for only one button click
	// and unsubscribe.
	buttonClicks.take(1).forEach(clickEvent => {
			alert("Button was clicked once. Stopping Traversal.");
		});
}

//The take() function is great way of listening for a discrete number of events 
//and then unsubscribing, but Observable has an even more flexible function 
//that we can use to complete sequences...