//Exercise 22: Implement zip

//Let's add a static zip() function to the Array type. The zip function accepts a combiner function, traverses each array at the same time, 
//and calls the combiner function on the current item on the left-hand-side and right-hand-side. 

//The zip function requires an item from each array in order to call the combiner function, therefore the array returned by zip will only be as large as the smallest input array. 

Array.zip = function(left, right, combinerFunction) {
    
    var counter,
    results = [];
    
	for(counter = 0; counter < Math.min(left.length, right.length); counter++) {
        // Add code here to apply the combinerFunction to the left and right-hand items in the respective arrays
        results.push(combinerFunction(left[counter], right[counter]));
    }
    
	return results;
};

//testing: console should print 'true'
console.log(JSON.stringify(Array.zip([1,2,3],[4,5,6], function(left, right) { return left + right })) === '[5,7,9]')