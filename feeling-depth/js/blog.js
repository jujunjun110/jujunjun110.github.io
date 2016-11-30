AFRAME.registerComponent('my-ray', {
    dependencies: ['raycaster'],
    schema: {
        target: {
            type: "selector"
        }
    },
    init: function() {
        var el = this.el;
        var data = this.data;
        
        el.addEventListener("raycaster-intersection", function(e) {
            
            var intersection = getNearestIntersection(e.detail.intersections);
            if (!intersection) {return;}

            var cursorDirection = new THREE.Vector3().addVectors(intersection.point, intersection.face.normal);
            var cursorPosition = new THREE.Vector3().addVectors(intersection.point, intersection.face.normal.multiplyScalar(0.1));

            data.target.setAttribute("position", cursorPosition);
            data.target.setAttribute("look-at", cursorDirection);

            function getNearestIntersection(intersections) {
                for (var i = 0, l = intersections.length; i < l; i++) {
                    if(intersections[i].object.el.classList.contains("ignore-ray")) {continue;}
                    return intersections[i];
                }
                return null;
            }
        });
    }
});