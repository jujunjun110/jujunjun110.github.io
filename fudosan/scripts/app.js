AFRAME.registerComponent('cursor-listener', {
    init: function() {
        this.el.addEventListener('click', function(evt) {

            var cam = document.getElementById("cam");
        	cam.setAttribute("position", "0 1.7 -6");
            var sky = document.getElementById("sky");
        	cam.setAttribute("src", "#room2");

        });

    }
});

AFRAME.registerComponent('my-cursor', {
	schema : {
		count : {
			default: 0
		}

	},
    init: function() {
    	var data = this.data;

        this.el.addEventListener('raycaster-intersection', function(evt) {
        	var els = evt.detail.els;
        	var isLink = false;
        	for (item of els) {
        		if (item.id == "link") {
        			isLink = true;
        		}
        	}
        	if (isLink == false){
        		return;
        	}
        	console.log(data.count);
        	data.count ++;
        	if (data.count >= 120) {
        		data.count = 0;
        		document.getElementById("link").click();
        	}


        });
    }
});