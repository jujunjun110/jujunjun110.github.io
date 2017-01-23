AFRAME.registerComponent('sync-pos', {
    schema: {
        target: { type: "selector" }
    },
    init: function() {
        this.targetEl = this.data.target;
    },
    tick: function() {
        // ラジアンからオイラー角への変換係数
        var radToDeg = 180 / Math.PI;

        var rot = AFRAME.utils.coordinates.stringify({
            x: this.el.object3D.rotation._x * radToDeg,
            y: this.el.object3D.rotation._y * radToDeg,
            z: this.el.object3D.rotation._z * radToDeg
        });

        this.targetEl.setAttribute("position", this.el.object3D.position);
        this.targetEl.setAttribute("rotation", rot);
    }
});