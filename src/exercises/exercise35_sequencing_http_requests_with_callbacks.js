//from  http://reactivex.io/learnrx/

// Exercise 35: Sequencing HTTP requests with callbacks

// Let's say that we're writing the startup flow for a web application. 

// On startup, the application must perform the following operations:

//     1 - Download the URL prefix to use for all subsequent AJAX calls. This URL prefix will vary based on what AB test the user is enrolled in.
//     2 - Use the url prefix to do the following actions in parallel:
//         - Retrieve a movie list array
//         - Retrieve configuration information and...
//             - make a follow up call for an instant queue list if the config property "showInstantQueue" is truthy

//     3 - If an instant queue list was retrieved, append it to the end of movie list.
//     4 - If all operations were successful then display the movie lists after the window loads. Otherwise inform the user that there was a connectivity error.

function(window, $, showMovieLists, showError) {
    var error,
        configDone,
        movieLists,
        queueList,
        windowLoaded,
        outputDisplayed,
        errorHandler = function () {
            // Otherwise show the error.
            error = "There was a connectivity error";

            // We may be ready to display out
            tryToDisplayOutput();
        },
        tryToDisplayOutput = function () {
            if (outputDisplayed) {
                return;
            }
            if (windowLoaded) {
                if (configDone && movieLists !== undefined) {
                    if (queueList !== undefined) {
                        movieLists.push(queueList);
                    }
                    outputDisplayed = true;
                    showMovieLists(JSON.stringify(movieLists));
                }
                else if (error) {
                    outputDisplayed = true;
                    showError(error);
                }
            }
        },
        windowLoadHandler = function () {
            windowLoaded = true;

            // Remember to unsubscribe from events
            window.removeEventListener("load", windowLoadHandler);

            // This may be the last task we're waiting on, so try and display output.
            tryToDisplayOutput();
        };

    // Register for the load event
    window.addEventListener("load", windowLoadHandler);

    // Request the service url prefix for the users AB test
    $.getJSON(
        "http://api-global.netflix.com/abTestInformation",
        {
            success: function (abTestInformation) {
                // Request the member's config information to determine whether their instant
                // queue should be displayed.
                $.getJSON(
                    "http://api-global.netflix.com/" + abTestInformation.urlPrefix + "/config",
                    {
                        success: function (config) {
                            // Parallel retrieval of movie list could've failed,
                            // in which case we don't want to issue this call.
                            if (!error) {
                                // If we're supposed to
                                if (config.showInstantQueue) {
                                    $.getJSON(
                                        "http://api-global.netflix.com/" + abTestInformation.urlPrefix + "/queue",
                                        {
                                            success: function (queueMessage) {
                                                queueList = queueMessage.list;

                                                configDone = true;
                                                tryToDisplayOutput();
                                            },
                                            error: errorHandler
                                        });
                                }
                                else {
                                    configDone = true;
                                    tryToDisplayOutput();
                                }
                            }
                        },
                        error: errorHandler
                    });

                // Retrieve the movie list
                $.getJSON(
                    "http://api-global.netflix.com/" + abTestInformation.urlPrefix + "/movieLists",
                    {
                        success: function (movieListMessage) {
                            movieLists = movieListMessage.list;
                            tryToDisplayOutput();
                        },
                        error: errorHandler
                    });
            },
            error: errorHandler
        });
}


