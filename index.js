// phina.js をグローバル領域に展開
phina.globalize();

var ASSETS = {
  image: {
      Harumaki:'http://jsrun.it/assets/8/P/T/W/8PTWj.png'
  }
};

// 定数
var SCREEN_WIDTH  = 640; // 画面横サイズ
var SCREEN_HEIGHT = 960; // 画面縦サイズ
var JUMP_POWOR = 20; // ジャンプ力
var GRAVITY = 0.7; // 重力

// MainScene クラスを定義
phina.define('MainScene', {
  superClass: 'DisplayScene',
  init: function() {
    this.superInit();
      // 床
      this.floor = RectangleShape({
          width: 300,
          height: this.gridY.span(0.2),
          fill: 'silver',
      }).addChildTo(this).setPosition(this.gridX.center(),700);
      this.jumpButton = JumpButton().addChildTo(this);
      var harumaki = Harukaze('Harumaki').addChildTo(this);
      harumaki.x = SCREEN_WIDTH / 2;
      harumaki.bottom = this.floor.top;
      this.jumpButton.onpointend = function() {
          // 床の上なら
          if (harumaki.isOnFloor) {
              // ジャンプ
              harumaki.physical.velocity.y = -JUMP_POWOR;
              // 重力復活
              harumaki.physical.gravity.y = GRAVITY;
              // フラグ変更
              harumaki.isOnFloor = false;
          }
      };
      this.harumaki = harumaki;
  },

  // 毎フレーム処理
  update: function() {
    var harumaki = this.harumaki;
    if (harumaki.hitTestElement(this.floor)){
        // y方向の速度と重力を無効にする
        harumaki.physical.velocity.y = 0;
        harumaki.physical.gravity.y = 0;
        // 位置調整
        harumaki.bottom = this.floor.top;
        // フラグ立て
        harumaki.isOnFloor = true;
    }
  },
});

//春巻きクラスを定義
phina.define('Harukaze',{
  superClass: 'Sprite',
  init: function(image){
    this.superInit(image,200,200);
        // 床の上かどうか
        this.isOnFloor = true;
  },
});

//ジャンプボタンクラスを定義
phina.define('JumpButton', {
  superClass: 'Button',

  init: function() {
    this.superInit({
      x: 320, // x座標
      y: 800, // y座標
      width: 300, // 横サイズ
      height: 155, // 縦サイズ
      text: 'JUMP!!',  // 表示文字
      fontSize: 70, // 文字サイズ
      fontColor: '#000000', // 文字色
      cornerRadius: 5,  // 角丸み
      fill: '#FFFFFF', // ボタン色
      stroke: '#000000',  // 枠色
      strokeWidth: 5,   // 枠太さ
    });
  },
});

// メイン処理
phina.main(function() {
  // アプリケーション生成
  var app = GameApp({
    startLabel: 'main', // メインシーンから開始する
    assets: ASSETS,
    backgroundColor: '#ffd',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });
  // アプリケーション実行
  app.run();
});