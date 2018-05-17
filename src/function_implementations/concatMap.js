//Exercise 13 from  http://reactivex.io/learnrx/

//Implement concatMap()

Array.prototype.concatMap = function (projectionFunctionThatReturnsArray) {
    return this.
        map(function (item) {
            return projectionFunctionThatReturnsArray(item);

            // apply the concatAll function to flatten the two-dimensional array
        }).concatAll();

};

//Test code:
var spanishFrenchEnglishWords = [["cero", "rien", "zero"], ["uno", "un", "one"], ["dos", "deux", "two"]];
// collect all the words for each number, in every language, in a single, flat list
var allWords = [0, 1, 2].
    concatMap(function (index) {
        return spanishFrenchEnglishWords[index];
    });

JSON.stringify(allWords) === '["cero","rien","zero","uno","un","one","dos","deux","two"]';

