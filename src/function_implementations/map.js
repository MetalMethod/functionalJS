// Exercise from http://reactivex.io/learnrx/
// ------------ INSERT CODE HERE! ----------------------------
// Apply the projectionFunction to each item in the array and add
// each result to the results array.
// Note: you can add items to an array with the push() method.
// ------------ INSERT CODE HERE! ----------------------------


Array.prototype.map = function (projectionFunction) {
    var results = [];
    this.forEach(itemInArray =>

        results.push(projectionFunction(itemInArray))

    );

    return results;
};

//testing: console must print 'true'
console.log(JSON.stringify([1, 2, 3].map(function (x) { return x + 1; })) === '[2,3,4]')
