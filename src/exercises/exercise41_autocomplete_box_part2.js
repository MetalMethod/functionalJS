//from  http://reactivex.io/learnrx/

// Exercise 41: Autocomplete Box Part 2: Electric Boogaloo

// In the previous version of the autocomplete box, there were two bugs

// - Multiple successive searches are made for the same string
// - Attempts are made to retrieve results for an empty string.

// The example below is the same as above, but this time, fix the bugs!

//      getSearchResultSet('react') === seq([,,,["reactive", "reaction","reactor"]])
//      keyPresses === seq(['r',,,,,'e',,,,,,'a',,,,'c',,,,'t',,,,,])

function (getSearchResultSet, keyPresses, textBox) {

	var getSearchResultSets =
		keyPresses.map( () => {
				return textBox.value;
			}).throttleTime(1000).
            
            //Make sure we only get distinct values
            distinctUntilChanged().
            
			//Make sure the text is not empty
            filter(char => {
                return char.length > 0;
            }).

			concatMap( text => {
				return getSearchResultSet(text).takeUntil(keyPresses);
			});

	return getSearchResultSets;
}
        
//With just this little amount of code, we're able to produce 
// a fully functioning autocomplete scenario. But there are other outstanding questions, 
// such as error handling. How can we handle failure and retry if necessary?
