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

            if (intersection.object.el.classList.contains("link")) {
                document.getElementById("crawling-cursor").emit("link-intersected");
            }　else {
                document.getElementById("crawling-cursor").emit("link-mouseleave");
            }

            // look atの方向の絶対座標 = 交差地点の座標 + 法線ベクトル
            var lookAtTarget = new THREE.Vector3().addVectors(intersection.point, intersection.face.normal);
            data.target.setAttribute("look-at", lookAtTarget);

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

AFRAME.registerComponent('mycam', {
    schema: {},

    init: function() {
        this.el.addEventListener("raycaster-intersection", function(e) {


            var dis = e.detail.intersections[0].distance;
            var pos = {x: 0, y: 0, z: - dis};
            var normal = e.detail.intersections[0].face.normal;
            // console.log(normal);
            document.getElementById("cursor").setAttribute("position", pos);            
            document.getElementById("cursor").setAttribute("look-at", normal);
        });
    }
});

AFRAME.registerComponent('set-image', {
    schema: {
        on: {
            type: 'string'
        },
        target: {
            type: 'selector'
        },
        src: {
            type: 'string'
        },
        dur: {
            type: 'number',
            default: 3
        },
        position: {
            type: 'vec3'
        }
    },
    init: function() {
        var data = this.data;
        var el = this.el;

        el.addEventListener(data.on, function() {

            setTimeout(function() {

                document.getElementById("sky").emit('sky-fade');

                document.getElementById("sky").setAttribute('src', data.target.src);
                document.getElementById("sky").setAttribute("rotation", el.getAttribute("rotation"));
                document.getElementById("cam").setAttribute("position", el.getAttribute("position"));
            }, data.dur);
        });
    }
});

AFRAME.registerComponent('show-detail', {
    schema: {
        on: {
            type: "string"
        },
        target: {
            type: "selector"
        }
    }, 
    init: function () {
        var el = this.el;
        var data = this.data;
        el.addEventListener (data.on, function () {
            var pos = el.getAttribute("position");
            data.target.setAttribute("position", {x: pos.x, y: pos.y + 0.6, z: pos.z});
            data.target.setAttribute("look-at", document.getElementById("cam").getAttribute("position"));
        }) 
    }
});


// not show warnings
console.warn = function() { /* NOP */ };
