var saikoroApp = {};

saikoroApp.scene = document.querySelector('#scene');
saikoroApp.canThrow = true;
saikoroApp.words = [
    "びっくりした話",
    "情けない話",
    "はじめて◯◯した話",
    "ひょっとしたら私だけ",
    "恥ずかしい話",
    "怖い話",
    "今だからゴメンナサイ話",
    "ちょっとイイ話"
];

function main() {
    saikoroApp.sai = document.querySelector('#sai-physics').body;
    init();
    throwSai();
}

function init() {
    var sai = saikoroApp.sai;

    // サイコロが停止イベント(sleep)を発火するようにする
    sai.allowSleep = true;
    sai.sleepSpeedLimit = 1;
    sai.sleepTimeLimit = 1;
    sai.world.allowSleep = true;

    // サイコロの停止イベント発火時に真上までカメラを移動させる処理を登録
    sai.addEventListener("sleep", function() {
        moveCam(sai);
    });

    document.getElementById("button").addEventListener("click", throwSai);
}

function throwSai() {
    if (saikoroApp.canThrow === false) {
        return; }

    saikoroApp.canThrow = false;

    var sai = saikoroApp.sai;
    var cam = document.getElementById("cam");

    // サイコロの各面にワードをセッティング
    setWords();

    // カメラの位置の初期化
    cam.setAttribute("position", "0 10 0");
    cam.setAttribute("rotation", "-30 0 0");

    // サイコロが力の影響を（再び）受けるように設定しなおす
    sai.wakeUp();

    // サイコロを初期ポジションにセット
    sai.position = new CANNON.Vec3(0, 10, -10);

    // サイコロ全体に力を与える
    sai.velocity.set(0, 0, -4);

    // サイコロに回転を与える
    sai.applyImpulse(
        new CANNON.Vec3(Math.random() * 20, Math.random() * 20, Math.random() * 20), // 与えるベクトル
        new CANNON.Vec3(0.5, Math.random() * 10, Math.random() * 10) // 力を与える点（サイコロのローカル座標）
    );
}

function setWords() {

    saikoroApp.words = saikoroApp.words.sort(function() {
        return Math.random() - 0.5;
    });

    // 配列の長さが6以上になるまで「フリーテーマ」で埋める
    while (saikoroApp.words.length < 6) {
        saikoroApp.words.push("フリーテーマ");
    }

    // サイコロの各面（の元になるHTML）にワードをセッティング
    for (var i = 0; i < 6; i++) {
        document.getElementById("target" + (i + 1)).innerText = saikoroApp.words[i];
    }
}

// カメラをサイコロの真上に移動させる
function moveCam(obj) {
    var cam = document.getElementById("cam");
    var target = new THREE.Vector3(obj.position.x, obj.position.y + 1.5, obj.position.z);
    var animDuration = 3000;

    // サイコロの直上にカメラを動かす
    var posAnim = document.createElement('a-animation');
    posAnim.setAttribute("attribute", "position");
    posAnim.setAttribute("from", AFRAME.utils.coordinates.stringify(cam.getAttribute("position")));
    posAnim.setAttribute("to", AFRAME.utils.coordinates.stringify(target));
    posAnim.setAttribute("begin", "saiStop");
    posAnim.setAttribute("dur", animDuration);
    cam.appendChild(posAnim.cloneNode(true));

    // 真下を向く
    var rotAnim = document.createElement('a-animation');
    rotAnim.setAttribute("attribute", "rotation");
    rotAnim.setAttribute("from", "-30 0 0");
    rotAnim.setAttribute("to", "-90 0 0");
    rotAnim.setAttribute("begin", "saiStop");
    rotAnim.setAttribute("dur", animDuration);
    cam.appendChild(rotAnim.cloneNode(true));

    cam.emit("saiStop");

    setTimeout(function() {
        saikoroApp.canThrow = true;
    }, animDuration);
}

if (saikoroApp.scene.hasLoaded) {
    main();
} else {
    saikoroApp.scene.addEventListener('loaded', main);
}