//from  http://reactivex.io/learnrx/

// Exercise 39: Autocomplete Box

// One of the most common problems in web development is the autocomplete box. 
// This seems like it should be an easy problem, but is actually quite challenging. 

// For example, how do we throttle the input? 
// How do we make sure we're not getting out of order requests coming back? 

// For example if I type "react" then type "reactive" I want "reactive" to be my result, 
// regardless of which actually returned first from the service.

// In the example below, you will be receiving a sequence of key presses, 
// a textbox, and a function when called returns an array of search results.

//      getSearchResultSet('react') === seq[,,,["reactive", "reaction","reactor"]]
//      keyPresses === seq['r',,,,,'e',,,,,,'a',,,,'c',,,,'t',,,,,]

function (getSearchResultSet, keyPresses, textBox) {

    var getSearchResultSets =
        keyPresses.
            map(() => {
                return textBox.value;
                // Ensure that we only trigger a maximum of one search request per second
            }).throttleTime(1000).concatMap(text => {
                // Ensure this sequence ends as soon as another key press arrives
                return getSearchResultSet(text).takeUntil(keyPresses);
            });

    return getSearchResultSets;
}

//Now that we're able to query with our throttled input, you'll still notice one slight problem. 
//If you hit your arrow keys or any other non character key, the request will still fire. 
//How do we prevent that?