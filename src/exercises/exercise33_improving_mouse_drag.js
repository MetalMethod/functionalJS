//from  http://reactivex.io/learnrx/

// Exercise 33: Improving our mouse drag event

// Our mouse drag event is a little too simple. Notice that when we drag around the sprite, 
// it always positions itself at the top-left corner of the mouse. 

// Ideally we'd like our drag event to offset its coordinates, based on where the mouse was 
// when the mouse down event occurred. This will make our mouse drag more closely resemble 
// moving a real object with our finger.

// Let's see if you can adjust the coordinates in the mouse drag event, 
// based on the mousedown location on the sprite. The mouse events are sequences, 
// and they look something like this: 


spriteContainerMouseMoves =
	seq([ {x: 200, y: 400, layerX: 10, layerY: 15},,,{x: 210, y: 410, layerX: 20, layerY: 26},,, ])

    
// Each item in the mouse event sequences contains an x, y value that represents 
// that absolute location of the mouse event on the page. 

// The moveSprite() function uses these coordinates to position the sprite. 
// Each item in the sequence also contains a pair of layerX and layerY properties 
// that indicate the position of the mouse event relative to the event target. 


function(sprite, spriteContainer) {
	// All of the mouse event sequences look like this:
    // seq([ {pageX: 22, pageY: 3423, layerX: 14, layerY: 22} ,,, ])
    
	var spriteMouseDowns = Observable.fromEvent(sprite, "mousedown"),
		spriteContainerMouseMoves = Observable.fromEvent(spriteContainer, "mousemove"),
        spriteContainerMouseUps = Observable.fromEvent(spriteContainer, "mouseup"),
        
		// Create a sequence that looks like this:
        // seq([ {pageX: 22, pageY:4080 },,,{pageX: 24, pageY: 4082},,, ])
        
		spriteMouseDrags =
			// For every mouse down event on the sprite...
			spriteMouseDowns.
				concatMap(contactPoint => {
					// ...retrieve all the mouse move events on the sprite container...
					return spriteContainerMouseMoves.
						// ...until a mouse up event occurs.
                        takeUntil(spriteContainerMouseUps).
                            concatMap(movePoint => {
                                return {
                                    pageX: movePoint.pageX - contactPoint.layerX, 
                                    pageY: movePoint.pageY + contactPoint.layerY
                                } 
                            })

						// Project each mouse move object into a new object
						// with adjusted pageX and pageY properties.
						// Translate each page coordinate based on the value
						// of the layerX and layerY properties in the
						// contactPoint.
				});

	// For each mouse drag event, move the sprite to the absolute page position.
	spriteMouseDrags.forEach(function(dragPoint) {
		sprite.style.left = dragPoint.pageX + "px";
		sprite.style.top = dragPoint.pageY + "px";
	});
}
		