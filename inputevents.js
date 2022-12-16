
keyboardEvents()
touchEvents();

function keyboardEvents(){
    document.addEventListener('keydown', function (event) {
        console.log(event)
        if (!pause) {
          switch (event.key) {
            case "ArrowDown":
      
              break;
            case "ArrowUp":
              break;
            case "a":
            case "A":
            case "ArrowLeft":
              objectList["character"].move("left")
              break;
            case "d":
            case "D":
            case "ArrowRight":
              objectList["character"].move("right")
              break;
            case "Escape":
              pauseGame()
              break;
            default:
              return;
          }
        }
        else {
          switch (event.key) {
            case "Escape":
              pauseGame()
              break;
          }
        }
      });
}
function touchEvents(){
    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;                                                        
    var yDown = null;

    function getTouches(evt) {
    return evt.touches ||
            evt.originalEvent.touches;
    }                                                     
                                                                            
    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                
                                                                            
    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if ( xDiff > 0 ) {
                objectList["character"].move("left")
            } else {
                objectList["character"].move("right")
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 
            } else { 
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };
}