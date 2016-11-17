AFRAME.registerComponent("start-movie", {
	schema: {
		on: {type: "string"},
		targetMovie: {type: "selector"},
		targetSphere: {type: "selector"},
	},
	init: function () {
		var data = this.data;
		var el = this.el;
		el.addEventListener(data.on, function () {
			data.targetSphere.setAttribute("opacity", 1);
			document.getElementById("back").setAttribute("opacity", 1);
			data.targetMovie.play();

			data.targetMovie.addEventListener("ended", function () {
				data.targetSphere.setAttribute("opacity", 0);
				document.getElementById("back").setAttribute("opacity", 0);
			});
		});
	}
});

AFRAME.registerComponent("stop-movie", {
	schema: {
		on: {type: "string"},
		targetMovie: {type: "selector"},
		targetSphere: {type: "selector"},
	},
	init: function () {
		var data = this.data;
		var el = this.el;
		el.addEventListener(data.on, function () {
			data.targetSphere.setAttribute("opacity", 0);
			document.getElementById("back").setAttribute("opacity", 0);
			data.targetMovie.pause();
			data.targetMovie.currentTime = 0;
		});
	}
});





