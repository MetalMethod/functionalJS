// Exercise from http://reactivex.io/learnrx/

Array.prototype.map = function(projectionFunction) {
	var results = [];
	this.forEach(function(itemInArray) {
    
      results.push(projectionFunction(itemInArray))

	});
  
	return results;
};
      

//testing should return true [2,3,4]
JSON.stringify([1,2,3].map(function(x) { return x + 1; })) === '[2,3,4]'
