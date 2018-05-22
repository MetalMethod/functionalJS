//from  http://reactivex.io/learnrx/

//Working with Observables

//Microsoft's open-source Reactive Extensions library introduces a new collection type to Javascript: Observable. 

//An Observable is a lot like an Event. 
//Like an Event, an Observable is a sequence of values that a data producer pushes to the consumer. 
//However unlike an Event, an Observable can signal to a listener that it has completed, 
//and will send no more data.

//Observables can send data to consumers asynchronously. 
//Unlike Array, there's no Javascript literal syntax for creating Observable sequences. 
//However we can build a helper method that visually describes the contents of sequences 
//as well as the times between each item's arrival. 

//The seq function creates an Observable from an array of items, 
//and adds a delay for every empty item encountered. Every ,,, adds up to a second.

// An array of numbers 1,2,3
var numbers123Array =      [1,2,3];

// A sequence that returns 1, and then after 4 seconds returns 2,
// and then after another second returns 3, and then completes.
var numbers123Observable = seq([1,,,,,,,,,,,,2,,,3]);

// Like Arrays, Observables can contain any object - even Arrays.
var observableOfArrays = seq([ [1,2,3],,,,,,[4,5,6],,,,,,,,,,,[1,2] ]);


//Observables are a sequence of values, delivered one after the other. 
//Therefore it's possible that an Observable can go on sending data to a listener forever 
//just like a mouse move event. 

//To create a sequence that doesn't complete, 
//you can add a trailing ,,, to the end of the items passed to seq().

// The trailing ,,, ensures that the sequence will not complete.
var mouseMovesObservable =
	seq([ {x: 23, y: 55},,,,,,,{x: 44, y: 99},,,{x:55,y:99},,,{x: 54, y:543},,, ]);

// No trailing ,,, indicates that sequence will complete.
var numbers123Observable = seq([1,,,2,,,3]);

//Querying Arrays only gives us a snapshot. 
//By contrast, querying Observables allows us to create data sets that 
//react and update as the system changes over time. 
//This enables a very powerful type of programming known as reactive programming.
// ####### GO TO EXERCISE 30 #########


// ####### ENDING OF EXERCISE 31 #########

//Querying Observables

//What's the difference between these two tasks?

    //1 Creating a flat list of movies with a rating of 5.0 from a bunch of movie lists.

    //2 Creating a sequence of all the mouse drag events from the 
        //mouseDown, mouseMove, and mouseUp events.

//You might think of them as different, and might code them very differently, 
//but these tasks are fundamentally the same. Both of these tasks are queries, 
//and can be solved using the functions you've learned in these exercises.

//###### 
//The difference between traversing an Array and traversing an Observable 
//is the direction in which the data moves.
//######

//When traversing an Array, the client pulls data from the data source, 
//blocking until it gets a result. 

//When traversing Observables, the data source pushes data at the client whenever it arrives.

//It turns out that the direction in which data moves is orthogonal to querying that data. 
//In other words, 
//###### 
//when we're querying data it doesn't matter whether we pull data, or data is pushed at us. 
//######

//In either case the query methods make the same transformations. 
//The only thing that changes is the input and output type respectively. 
//If we filter an Array, we get a new Array. 
//If we filter an Observable, we get a new Observable, and so on.

//Take a look at how the query methods transform Observables and Arrays:

// map()

[1,2,3].map(function(x) { return x + 1 })                       === [2,3,4]
seq([1,,,2,,,3]).map(function(x) { return x + 1})               === seq([2,,,3,,,4])
seq([1,,,2,,,3,,,]).map(function(x) { return x + 1 })           === seq([2,,,3,,,4,,,])

// filter()

[1,2,3].filter(function(x) { return x > 1; })                   === [2,3]
seq([1,,,2,,,3]).filter(function(x) { return x > 1; })          === seq([2,,,3])
seq([1,,,2,,,3,,,]).filter(function(x) { return x > 1; })       === seq([2,,,3,,,])

// concatAll()

[ [1, 2, 3], [4, 5, 6] ].concatAll()                             === [1,2,3,4,5,6]
seq([ seq([1,,,2,,,3]),,,seq([4,,,5,,,6]) ]).concatAll()         === seq([1,,,2,,,3,,,4,,,5,,,6])

// If a new sequence arrives before all the items
// from the previous sequence have arrived, no attempt
// to retrieve the new sequence's elements is made until
// the previous sequence has completed. As a result the
// order of elements in the sequence is preserved.
seq([
	seq([1,,,, ,2, ,3])
	,,,seq([,,4, ,5, ,,6]) ]).
	concatAll()                                                  === seq([1,,,,,2,,3,,4,,5,,,6])

// Notice that as long as at least one sequence being
// concatenated is incomplete, the concatenated sequence is also
// incomplete.
seq([
	seq([1,, ,,, ,,,2,,,3])
	,,,seq([4,,,5,,, ,,, ,,6,,,]) ]).
	concatAll()                                                  === seq([1,,,,,,,,2,,,3,4,,,5,,,,,,,,6,,,])

// reduce()

[ 1, 2, 3 ].reduce(sumFunction)                                 === [ 6 ]
seq([ 1,,,2,,,3 ]).reduce(sumFunction)                          === seq([,,,,,,6])

// Reduced sequences do not complete until the
// sequence does.
seq([ 1,,,2,,,3,,, ]).reduce(sumFunction)                       === seq([ ,,,,,,,,,])

// zip()

// In both Arrays and Observables, the zipped sequence
// completes as soon as either the left or right-hand
// side sequence completes.
Array.zip([1,2],[3,4,5], sumFunction)                           === [4,6]
Observable.zip(seq([1,,,2]),seq([3,,,4,,,5]), sumFunction)      === seq([4,,,6])

// take()
[1,2,3].take(2)                                                 === [1, 2]
seq([ 1,,,2,,,3 ]).take(2)                                      === seq([ 1,,,2 ])
seq([ 1,,,2,,,3,,, ]).take(2)                                   === seq([ 1,,,2 ])

// takeUntil()

// takeUntil works for Arrays, but it's not very useful
// because the result will always be an empty array.
[1,2,3].takeUntil([1])                                          === []

seq([1,,,2,,,3,,, ]).takeUntil(
seq([ ,,, ,,4 , ]))                                             === seq([ 1,,,2 ])

//Remember when I prohibited the use of array indexers? 
//The reason for that restriction should now become clearer to you. 
//Whereas the 5 functions can be used on any collection, 
//indexers can only be used on collections that support random-access (like Array). 
//If you avoid indexers and stick to the functions you've learned in this tutorial, 
//you'll have a unified programming model for transforming any collection. 
//Having a unified programming model makes it trivial to convert synchronous code 
//to asynchronous code, a process which would otherwise be very difficult. 
//As we've demonstrated, you don't need indexers to perform complex collection transformations.

//Now that we've seen that we can query asychronous and synchronous data sources using 
//the same programming model, let's use Observable and our query functions to create 
//complex new events.

// ####### GO TO EXERCISE 32 #########

