AFRAME.registerComponent('cursor-listener', {
    schema: {
        mode: {
            default: "a"
        }
    },
    init: function() {
        var mode = this.data.mode;
        this.el.addEventListener('click', function(evt) {
            if (mode == "a") {
                
                mode = "b";

                var cam = document.getElementById("cam");
                cam.setAttribute("position", "0 2.8 -6");

                var sky = document.getElementById("sky");
                sky.setAttribute("src", "#room2");                

                document.getElementById("item1").setAttribute("visible", false);
                document.getElementById("item2").setAttribute("visible", false);

            } else {

                mode = "a";

                var cam = document.getElementById("cam");
                cam.setAttribute("position", "0 2.8 2");
                cam.setAttribute("rotation", "0 180 0");

                var sky = document.getElementById("sky");
                sky.setAttribute("src", "#room1");                

                document.getElementById("item1").setAttribute("visible", true);
                document.getElementById("item2").setAttribute("visible", true);

            }

        });

    }
});

AFRAME.registerComponent('my-link', {
	schema : {
		count : {
			default: 0
		}
	},
    init: function() {
    	var data = this.data;
        var el = this.el;

        this.el.addEventListener('raycaster-intersected-cleared', function(evt) {
            data.count = 0;
        });

        this.el.addEventListener('raycaster-intersected', function(evt) {
        	data.count ++;
        	if (data.count >= 120) {
        		data.count = 0;
                el.emit('raycaster-intersected-cleared');
        		document.getElementById("link").click();
        	}
        });
    }
});