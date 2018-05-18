// Exercise 18 from http://reactivex.io/learnrx/

    var boxarts = [
        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
        { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
        { width: 425, height: 150, url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
    ];

    // You should return an array containing only the URL of the largest box art. Remember that reduce always
    // returns an array with one item.

    //defining how to calculte the size
    var currentSizeBoxart = (boxarts.width * boxarts.height)

    function largestBox(currentSizeBoxart, maxSizeBoxart) {
        if (currentSizeBoxart > maxSizeBoxart) {
            maxSizeBoxart = currentSizeBoxart;
        } else {
            //return only the url and not
            return maxSizeBoxart;
        }
    }

    return boxarts.reduce(largestBox).map(boxArt => {
            return boxArt.url;
        })
    


