// Exercise 19 from http://reactivex.io/learnrx/

//Exercise 19: Reducing with an initial value

//Sometimes when we reduce an array, we want the reduced value 
//to be a different type than the items stored in the array. 

//Let's say we have an array of videos and we want to reduce them 
//to a single map where the key is the video id and the value is the video's title.

function() {
    var videos = [
        {
            "id": 65432445,
            "title": "The Chamber"
        },
        {
            "id": 675465,
            "title": "Fracture"
        },
        {
            "id": 70111470,
            "title": "Die Hard"
        },
        {
            "id": 654356453,
            "title": "Bad Boys"
        }
    ];

    // Expecting this output...
    // [
    //	 {
    //		 "65432445": "The Chamber",
    //		 "675465": "Fracture",
    //		 "70111470": "Die Hard",
    //		 "654356453": "Bad Boys"
    //	 }
    // ]
    
    return videos.reduce(
        function (accumulatedMap, video) {
            var obj = {};

            obj[video.id] = video.title;

            // ----- INSERT CODE TO ADD THE VIDEO TITLE TO THE ----
            // ----- NEW MAP USING THE VIDEO ID AS THE KEY	 ----

            // Object.assign() takes all of the enumerable properties from
            // the object listed in its second argument (obj) and assigns them
            // to the object listed in its first argument (accumulatedMap).
            return Object.assign(accumulatedMap, obj);
        },
        // Use an empty map as the initial value instead of the first item in the list.
        {}
    );
}

