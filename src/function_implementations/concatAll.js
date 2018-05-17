// Exercise from http://reactivex.io/learnrx/
// Implementing concatAll()

//Let's add a concatAll() function to the Array type. 
//The concatAll() function iterates over each sub-array in the array and collects the results in a new, flat array. 
//Notice that the concatAll() function expects each item in the array to be another array.

// Add all the items in each subArray to the results array.

Array.prototype.concatAll = function() {
	var results = [];
    
    this.forEach( subArray => subArray.forEach(item => results.push(item)));
    
	return results;
};

//testing: should print 'true'
console.log([ [1,2,3], [4,5,6], [7,8,9] ].concatAll())
console.log(JSON.stringify([ [1,2,3], [4,5,6], [7,8,9] ].concatAll()) === "[1,2,3,4,5,6,7,8,9]")
// [1,2,3].concatAll(); // throws an error because this is a one-dimensional array
		