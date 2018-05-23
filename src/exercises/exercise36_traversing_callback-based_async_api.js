//from  http://reactivex.io/learnrx/

// Exercise 36: Traversing callback-based Asynchronous APIs

// If a callback API were a sequence, what kind of sequence would it be? 

// We've seen that UI Event sequences can contain anywhere from 0 to infinite items, 
// but will never complete on their own. 

mouseMoves === seq([{ x: 23, y: 55 }, , , , , , , { x: 44, y: 99 }, , , { x: 55, y: 99 }, , , { x: 54, y: 543 }, , ,]);

// In contrast, if we were to convert output from the $.getJSON() function  we've been using 
// into a sequence it would always return a sequence 
// that completes after sending a single item. 

getJSONAsObservable("http://api-global.netflix.com/abTestInformation") ===
    seq([{ urlPrefix: "billboardTest" }])

// It might seem strange to create sequences that contain only one object. 
// We could introduce an Observable-like type specifically for scalar values, 
// but that would make callback-based APIs more difficult to query with Events. 
// Thankfully, an Observable sequence is flexible enough to model both. 


// So how do we convert a callback API into an Observable sequence? 

// Unfortunately, because callback-based APIs vary so much in their interfaces, 
// we can't create a conversion function like we did with fromEvent(). 
// However there is a more flexible function we can use to build Observable sequences... 

// Observable.create() is powerful enough to convert any asynchronous API into an Observable. 
// Observable.create() relies on the fact that all asynchronous APIs have the following semantics:

//     1 - The client needs to be able to receive data.
//     2 - The client needs to be able to receive error information.
//     3 - The client needs to be able to be alerted that the operation is complete.
//     4 - The client needs to be able to indicate that they're no longer interested in the result of the operation.

// In the following example, we'll use the Observable.create() function to create an Observable that issues a request to getJSON when it's traversed. 

function(window, $) {
    var getJSON = function (url) {
        return Observable.create(
            // the Subscribe function
            function (observer) {
                var subscribed = true;

                $.getJSON(url,
                    {
                        success:
                            function (data) {
                                // If client is still interested in the results, send them.
                                if (subscribed) {
                                    // Send data to the client
                                    observer.next(data);
                                    // Immediately complete the sequence
                                    observer.complete();
                                }
                            },
                        error:
                            function (ex) {
                                // If client is still interested in the results, send them.
                                if (subscribed) {
                                    // Inform the client that an error occurred.
                                    observer.error(ex);
                                }
                            }
                    });

                // Definition of the Subscription objects unsubscribe (dispose in RxJS 4) method.
                return function () {
                    subscribed = false;
                }
            }
        );
    };

    var observer = {
        // onNext in RxJS 4
        next: function (data) {
            alert(JSON.stringify(data));
        },
        // onError in RxJS 4
        error: function (err) {
            alert(err);
        },
        // onComplete in RxJS 4
        complete: function () {
            alert("The asynchronous operation has completed.");
        }
    };

    var subscription =
        getJSON("http://api-global.netflix.com/abTestInformation").subscribe(observer);

    // setTimeout(function () {
    // 	alert("Changed my mind, I do not want notifications any more!")
    // 	subscription.unsubscribe();
    // }, 10);
}


// The argument passed into Observable.create() above is known as the subscribe function. 
// Things that might be interested in data that the created Observable might produce (i.e. an Observer) 
// can express this intention by subscribing to it. 

// They must conform to the interface of an Observer in order for notifications pushed by the Observable to be delivered. 
// Observers are then passed as an argument into the subscribe function of the created Observable.

// Take note that the subscribe function defined for an Observable represents a lazy evaluation 
// that only occurs for each Observer when it subscribes. 

// Once an Observer no longer interested in the data an Observable has to provide, it should unsubscribe itself. 
// The return value of calling subscribe on an Observable with some Observer is a Subscription, 
// which represents a disposable resource. 

// Calling unsubscribe on a Subscription object will clean up the Observable execution for the corresponding Observer.

// Notice that the Observer above defines three methods:

//     next(), used by Observables to deliver new data
//     error(), used by Observables to deliver error information
//     complete(), used by Observables to indicate a data sequence has completed

// Observers are not expected to implement all the methods above (i.e. they may be partial). 
// For callbacks that are not provided, Observable execution still proceeds normally, 
// except some types of notifications will be ignored.

// Between RxJS 4 and 5, there are some slight API differences to be wary of that relate to the discussion here. 
// Please consult this migration guide for a detailed list of changes:

// https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md

// Now that we've built a version of the getJSON function that returns an Observable sequence, 
// let's use it to improve our solution to the previous exercise...
