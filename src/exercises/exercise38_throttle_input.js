//from  http://reactivex.io/learnrx/

// Exercise 38: Throttle Input

// When dealing with user input, there will be times when the user's input is too noisy, 
// and will potentially clog your servers with extraneous requests. 

// We want the ability to throttle the users's input so that if they interacting for one second, 
// then we will get the user input. Let's say for example, the user clicks a button 
// once too many times upon saving and we only want to fire after they've stopped for a second.

//seq([1,2,3,,,,,,,4,5,6,,,]).throttleTime(1000 /* ms */) === seq([,,,,,,,3,,,,,,,,,,6,,,]);

function (clicks, saveData, name) {
    return clicks.throttleTime(1000).
        // TODO: Throttle the clicks so that it only happens every one second
        concatMap(function () {
            return saveData(name);
        });
}
