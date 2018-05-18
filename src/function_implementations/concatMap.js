//Exercise 13 from  http://reactivex.io/learnrx/

//Implement concatMap()

//Nearly every time we flatten a tree we chain map() and concatAll(). 
//Sometimes, if we're dealing with a tree several levels deep, we'll repeat this combination many times in our code. 
//To save on typing, let's create a concatMap function that's just a map operation, followed by a concatAll.

Array.prototype.concatMap = function (projectionFunctionThatReturnsArray) {
    return this.map(item => {
        // Apply the projection function to each item. The projection
        // function will return a new child array. This will create a
        // two-dimensional array.
        
        return projectionFunctionThatReturnsArray(item);

        // apply the concatAll function to flatten the two-dimensional array
    }).concatAll();
};

//Test code:
var spanishFrenchEnglishWords = [["cero", "rien", "zero"], ["uno", "un", "one"], ["dos", "deux", "two"]];
// collect all the words for each number, in every language, in a single, flat list
var allWords = [0, 1, 2].
    concatMap(index => {
        return spanishFrenchEnglishWords[index];
    });

console.log(allWords);
console.log(JSON.stringify(allWords) === '["cero","rien","zero","uno","un","one","dos","deux","two"]');
    