//from  http://reactivex.io/learnrx/

// Exercise 40: Distinct Until Changed Input

// You'll notice in the previous exercise that 
// if you pressed your arrow keys while inside the textbox, 
// the query will still fire, regardless of whether the text actually changed or not. 

// How do we prevent that? The distinctUntilChanged filters out successive repetitive values.

//     seq([1,,,1,,,3,,,3,,,5,,,1,,,]).distinctUntilChanged() === seq([1,,,,,,,3,,,,,,,5,,,1,,,]);

function (keyPresses, isAlpha) {

    return keyPresses.
        map(e => {
            return String.fromCharCode(e.keyCode);
        }).
        // Ensure we only have alphabetic characters
        filter(character => {
            return isAlpha(character);
        }).
        //Filter out successive repetitive keys
        distinctUntilChanged().
        // Building up a string of all the characters typed.
        scan((stringSoFar, character) => {
            return stringSoFar + character;
        }, '');
}

// Now that we know how to get only the distinct input, 
// let's see how it applies to our autocomplete example...

