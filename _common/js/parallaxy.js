
/**
 * parallaxy.js 0.0.2
 */
var parallaxController;

;(function() {

	parallaxController = this;

    // Totally lifted from this: http://stackoverflow.com/questions/11197247/javascript-equivalent-of-jquerys-extend-method
    function extend(){
        for(var i=1; i<arguments.length; i++)
            for(var key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    }

	var menuClosed = true;

    // HTML Stuff
    this.paralaxxed = document.getElementsByClassName("parallaxy-animate");

    // Create the logic
    parallaxate = function(parallax_elements, defaultSettings) {
        var elements = parallax_elements;

        for (i = 0; i < elements.length; i++) {

			// console.log(elements[i]);

            var settings = JSON.parse(JSON.stringify(defaultSettings)); // defaultSettings.copy();
            var options = JSON.parse(elements[i].getAttribute('parallaxy-options'));
            elements[i].settings = extend(settings, options);

            if (options.positionType == 'relative') {
                elements[i].initial_offset = parseInt(window.getComputedStyle(elements[i], null).getPropertyValue('margin-top'), 10);
                elements[i].dataset.positionType = "relative";
            } else {
                elements[i].initial_offset = elements[i].offsetTop;
                elements[i].dataset.positionType = "absolute";
            }

            elements[i].dataset = options.direction;
            elements[i].dataset.currentDelta = 0;
            elements[i].dataset.newDelta = 0;

        }
    }

    scrollHandler = function() {

        var that = this;
		var scrollTop = window.pageYOffset;

        for (i = 0; i < paralaxxed.length; i++) {

			//console.log(paralaxxed[i]);

            var currentDelta = paralaxxed[i].dataset.currentDelta;

			var newDelta = (0 - (scrollTop * paralaxxed[i].settings.multiplier));

			if(paralaxxed[i].settings.direction == "down") {
				newDelta = (0 + (scrollTop * paralaxxed[i].settings.multiplier));
			}

			if( jQuery(window).width() <= 1280 ) {
				var tweenDelta = (currentDelta - ((currentDelta - newDelta)));
				//if(currentDelta && currentDelta < 0 ) {
					paralaxxed[i].style.transform = "translateY(" + tweenDelta + "px)";
					paralaxxed[i].style.webkitTransform = "translateY(" + tweenDelta + "px)";
				//}
			} else {
				var tweenDelta = (currentDelta - ((currentDelta - newDelta) * 0.08));
                paralaxxed[i].style.transform = "translateY(" + tweenDelta + "px) translateZ(0)";
                paralaxxed[i].style.webkitTransform = "translateY(" + tweenDelta + "px) translateZ(0)";
			}
            paralaxxed[i].dataset.currentDelta = tweenDelta;

        }

		if(menuClosed) {
            window.requestAnimationFrame( scrollHandler );
        }
    }

    // init the thing
    function init() {
        var that = this;
        var paralaxxedsettings = {
             "multiplier" : "0.2",
             "direction": "up",
             "positionType": "absolute"
        };

        if(paralaxxed.length > 0) {
            parallaxate(that.paralaxxed, paralaxxedsettings);
        }

		scrollHandler();
    }

	pauseTween = function() {
		menuClosed = false;
        // console.log("pause parallax");
	}

	restartTween = function() {
		menuClosed = true;
        // console.log("restart parallax");
		scrollHandler();
	}

    init();

})();
