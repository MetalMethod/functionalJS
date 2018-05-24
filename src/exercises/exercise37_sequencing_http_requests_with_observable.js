//from  http://reactivex.io/learnrx/

//Exercise 37: Sequencing HTTP requests with Observable

//Let's use the getJSON function that returns Observables, and the Observable.fromEvent() 
//to complete the exercise we completed earlier.

function(window, getJSON, showMovieLists, showError) {
    var movieListsSequence =
        Observable.zip(
            getJSON("http://api-global.netflix.com/abTestInformation").
                concatMap(function (abTestInformation) {
                    return Observable.zip(
                        getJSON("http://api-global.netflix.com/" + abTestInformation.urlPrefix + "/config").
                            concatMap(function (config) {
                                if (config.showInstantQueue) {
                                    return getJSON("http://api-global.netflix.com/" + abTestInformation.urlPrefix + "/queue").
                                        map(function (queueMessage) {
                                            return queueMessage.list;
                                        });
                                }
                                else {
                                    return Observable.returnValue(undefined);
                                }
                            }),
                        getJSON("http://api-global.netflix.com/" + abTestInformation.urlPrefix + "/movieLists"),
                        function (queue, movieListsMessage) {
                            var copyOfMovieLists = Object.create(movieListsMessage.list);
                            if (queue !== undefined) {
                                copyOfMovieLists.push(queue);
                            }

                            return copyOfMovieLists;
                        });
                }),
            Observable.fromEvent(window, "load"),
            function (movieLists, loadEvent) {
                return movieLists;
            });

    movieListsSequence.
        forEach(
            function (movieLists) {
                showMovieLists(movieLists);
            },
            function (err) {
                showError(err);
            });
}


function (resolve, reject) {
    // Must be declared in a separate statement to avoid a RefernceError when
    // accessing subscription below in the closure due to Temporal Dead Zone.
    var subscription;
    subscription = _this.subscribe(function (value) {
        if (subscription) {
            // if there is a subscription, then we can surmise
            // the next handling is asynchronous. Any errors thrown
            // need to be rejected explicitly and unsubscribe must be
            // called manually
            try {
                next(value);
            }
            catch (err) {
                reject(err);
                subscription.unsubscribe();
            }
        }
        else {
            // if there is NO subscription, then we're getting a nexted
            // value synchronously during subscription. We can just call it.
            // If it errors, Observable's `subscribe` will ensure the
            // unsubscription logic is called, then synchronously rethrow the error.
            // After that, Promise will trap the error and send it
            // down the rejection path.
            next(value);
        }
    }, reject, resolve);
}

// Almost every workflow in a web application starts with an event, 
// continues with an HTTP request, and results in a state change. 
// Now we know how to express the first two tasks elegantly.