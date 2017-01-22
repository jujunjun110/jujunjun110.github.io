AFRAME.registerComponent('sync-pos', {
    schema: {
        target: { type: "selector" }
    },
    init: function() {
        this.targetEl = this.data.target;
    },
    tick: function() {
        // ラジアンからオイラー角への変換係数
        var pro = 180 / Math.PI;

        var rot = AFRAME.utils.coordinates.stringify({
            x: this.el.object3D.rotation._x * pro,
            y: this.el.object3D.rotation._y * pro,
            z: this.el.object3D.rotation._z * pro
        });

        this.targetEl.setAttribute("position", this.el.object3D.position);
        this.targetEl.setAttribute("rotation", rot);
    }
});
