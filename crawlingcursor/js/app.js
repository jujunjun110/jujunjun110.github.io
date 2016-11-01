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

            // look atの方向の絶対座標 = 交差地点の座標 + 法線ベクトル
            var cursorDirection = new THREE.Vector3().addVectors(intersection.point, intersection.face.normal);
            data.target.setAttribute("look-at", cursorDirection);

            // cursorの座標 = 交差地点の座標 + 法線ベクトル×0.1 （少しだけ交差地点から浮かせる）
            var cursorPosition = new THREE.Vector3().addVectors(intersection.point, intersection.face.normal.multiplyScalar(0.1));
            data.target.setAttribute("position", cursorPosition);

            // 最も近い交差地点を取得する
            function getNearestIntersection(intersections) {
                for (var i = 0, l = intersections.length; i < l; i++) {
                    // カーソル自身のintersectionが一番手前に来るとちらつきが発生するので無視する
                    if(intersections[i].object.el.classList.contains("ignore-ray")) {continue;}
                    return intersections[i];
                }
                return null;
            }
        });
    }
});