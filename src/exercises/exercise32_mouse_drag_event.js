//from  http://reactivex.io/learnrx/

//Exercise 32: Creating a mouse drag event

//Remember the exercise in which we retrieved all the movies 
//with a rating of 5.0 from an array of movie lists? 
//If we were to describe the solution in pseudocode it might read something like this...

// "For every movie list, retrieve only those videos with a rating of 5.0"

var moviesWithHighRatings =
    movieLists.concatMap(movieList => {
        return movieList.videos.
            filter(video => {
                return video.rating === 5.0;
            });
    });

//Now we're going to create a mouseDrag event for a DOM object. 
//If we were to describe this problem as pseudocode it might read something like this... 

//"For every --NOT movie list-- --YES mouse down event on the sprite --, 
// retrieve only those --NOT videos with a rating of 5.0-- 
// --YES mouse move events that occur before the next mouse up event-- ."

function(sprite, spriteContainer) {
	var spriteMouseDowns = Observable.fromEvent(sprite, "mousedown"),
		spriteContainerMouseMoves = Observable.fromEvent(spriteContainer, "mousemove"),
		spriteContainerMouseUps = Observable.fromEvent(spriteContainer, "mouseup"),
		spriteMouseDrags =
			// For every mouse down event on the sprite...
			spriteMouseDowns.
				// --------------------------------------------------------
				//					  INSERT CODE HERE
				// --------------------------------------------------------
				// Complete this expression...
				// For every mouse down event, return the mouse move event
				// sequence until a mouse up event occurs.

	// For each mouse drag event, move the sprite to the absolute page position.
	spriteMouseDrags.forEach(function(dragPoint) {
		sprite.style.left = dragPoint.pageX + "px";
		sprite.style.top = dragPoint.pageY + "px";
	});
}
		