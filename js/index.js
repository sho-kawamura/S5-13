$(function () {
  // 図形操作用サービス
  let sps = new ShapeService();
  // キャンバスのID
  let canvasId = "appCanvas";

  // キャンバス情報
  let canvas = document.getElementById(canvasId);
  let ctx = canvas.getContext("2d");
  let canvasPosition = canvas.getBoundingClientRect();

  // キャンバスのサイズを再設定
  canvas.width = canvasPosition.width;
  canvas.height = canvasPosition.height;

  // -------- 操作ボタンCSS設定 --------
  // 各ボタンDOM
  let $btns = $('.btn');
  let $restartBtns = $('.restart');    // 「やりなおし」ボタン

  // ボタン位置を調整
  let btnCssSet = function () {

    let btnWidth = canvasPosition.width * 0.164;
    let btnHeight = btnWidth / 221 * 68;
    $btns.height(btnHeight).width(btnWidth).css({ 'right': canvasPosition.width * 0.05 });
    $restartBtns.css({ 'bottom': canvasPosition.height * 0.147 });
  };
  btnCssSet();    // 初期実行

  // -------- 作図エリア --------
  let drawingArea = sps.setDrawingArea(canvasPosition);

  // -------- ページ個別設定値 --------
  // ベース図形
  let baseShapes = sps.setBaseShapes(canvasPosition);

  let selectIdx = null;
  let targetIdx = null;

  // 複製図形の移動時
  let selectShapeIdxs = null;
  let targetShapeIdxs = null;

  // 各設定値の初期化
  let init = function () {
    // ベース図形
    baseShapes = sps.setBaseShapes(canvasPosition);

    // 図形の移動時
    selectShapeIdxs = null;  // 選択中の図形インデックス
    targetShapeIdxs = null; // 移動中の図形インデックス

    selectIdx = null;
    targetIdx = null;
  };

  init();

  // 画面リサイズ時（Canvasのレスポンシブ対応）
  let resize = function () {
    // 元のキャンバスの高さを取得
    let originCanvasHeight = canvasPosition.height;
    let originCanvasWidth = canvasPosition.width;
    // キャンバスの位置、サイズを再取得
    canvasPosition = canvas.getBoundingClientRect();

    // キャンバスのサイズを再設定
    canvas.width = canvasPosition.width;
    canvas.height = canvasPosition.height;

    // ボタン位置を調整
    btnCssSet();

    // リサイズした作図エリアの座標を再計算する
    drawingArea = sps.setDrawingArea(canvasPosition);

    // リサイズした図形の座標を再計算する
    let scale = canvasPosition.height / originCanvasHeight;

    // ベース図形の座標を再設定
    sps.recalculateBaseShape(scale, baseShapes);

    for (let i = 0; i < baseShapes.length; i++) {
      // 図形の座標を再設定
      sps.recalculateMatrix(scale, baseShapes[i]);
    }
  };
  $(window).resize(resize);

  // -------- 全ページ共通設定値 --------

  // マウスダウン（orタッチ）中かどうか
  let touched = false;
  // タッチ開始時の座標を記録
  let touchStartX = 0;
  let touchStartY = 0;
  // ベース図形タッチ開始かどうか
  let baseShapeTouched = false;
  // 回転用円画像タッチ開始どうか
  let circleTouched = false;

  //let turnOverTouched = false;
  // 移動時のタッチ座標
  let touchX = 0;
  let touchY = 0;


  // 回転用円画像の情報
  let circleRadius = 20;  // 半径
  // 回転用円画像のイメージオブジェクト

  let circleImg = new Image();
  circleImg.src = "./img/rotate.png";

  let img = [];
  var pathList = [
    "./img/shape1.png",
    "./img/shape2.png",
    "./img/shape3.png"
    // ここにパスを追加していく
  ];

  for (var i = 0; i < pathList.length; i++) {
    var image = new Image();
    image.src = pathList[i];
    img.push(image);
  }

  let img_f = [];
  var pathList_f = [
    "./img/shape1_fill.png",
    "./img/shape2_fill.png",
    "./img/shape3_fill.png"
    // ここにパスを追加していく
  ];

  for (var i = 0; i < pathList_f.length; i++) {
    var image_f = new Image();
    image_f.src = pathList_f[i];
    img_f.push(image_f);
  }

  /**
   * 図形の描画
   */
  let drawShapes = function () {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ベース図形の描画
    for (let j = 0; j < baseShapes.length; j++) {
      //頂点作成
      ctx.beginPath();

      for (let i = 0; i < baseShapes[j]['matrix'].length; i++) {
        ctx.lineTo(baseShapes[j]['matrix'][i][0], baseShapes[j]['matrix'][i][1]);
      }

      ctx.closePath();
      ctx.lineWidth = sps.baseShapeLineWidth;
      ctx.strokeStyle = 'rgba(255,255,255,0)';
      ctx.setLineDash([]);
      ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,0)';
      ctx.fill();
      ctx.restore();
      ctx.save();

      if (j === selectShapeIdxs) {

        // 円の画像からの縦線
        ctx.lineJoin = "miter";
        ctx.beginPath();
        ctx.moveTo(baseShapes[j]['circle'][0], baseShapes[j]['circle'][1]);
        ctx.closePath();

        ctx.lineWidth = 1;
        ctx.strokeStyle = sps.baseShapeLineColor;
        ctx.stroke();

        // 円の画像
        ctx.drawImage(
          circleImg,
          baseShapes[j]['circle'][0] - circleRadius,
          baseShapes[j]['circle'][1] - circleRadius,
          circleRadius * 2,
          circleRadius * 2
        );
      } else {
        let cx = baseShapes[j]['center'][0];
        let cy = baseShapes[j]['center'][1];
        let angle = baseShapes[j]['rotate'];

        ctx.translate(cx, cy);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(-cx, -cy);

        if(j == 0){
          let ansShapeWidth = (canvasPosition.width * img[0].width / 1280);
          let ansShapeHeight = (canvasPosition.height * img[0].height / 960);

          if(baseShapes[0]['shapeType'] == "shape1"){
            ctx.drawImage(
              img[0],
              baseShapes[0]['center'][0] - (ansShapeWidth) * 0.519,
              baseShapes[0]['center'][1] - (ansShapeHeight) * 0.7,
              ansShapeWidth,
              ansShapeHeight
            );
          }else if(baseShapes[0]['shapeType'] == "shape2"){
            ctx.drawImage(
              img[0],
              baseShapes[0]['center'][0] - (ansShapeWidth) * 0.630,
              baseShapes[0]['center'][1] - (ansShapeHeight) * 0.58,
              ansShapeWidth,
              ansShapeHeight
            );
          }else if(baseShapes[0]['shapeType'] == "shape3"){
            ctx.drawImage(
              img[0],
              baseShapes[0]['center'][0] - (ansShapeWidth) * 0.29,
              baseShapes[0]['center'][1] - (ansShapeHeight) * 0.525,
              ansShapeWidth,
              ansShapeHeight
            );
          }
        }else if(j == 1){
          let ansShapeWidth = (canvasPosition.width * img[1].width / 1280);
          let ansShapeHeight = (canvasPosition.height * img[1].height / 960);

          if(baseShapes[1]['shapeType'] == "shape1"){
            ctx.drawImage(
              img[1],
              baseShapes[1]['center'][0] - (ansShapeWidth) * 0.519,
              baseShapes[1]['center'][1] - (ansShapeHeight) * 0.7,
              ansShapeWidth,
              ansShapeHeight
            );
          }else if(baseShapes[1]['shapeType'] == "shape2"){
            ctx.drawImage(
              img[1],
              baseShapes[1]['center'][0] - (ansShapeWidth) * 0.630,
              baseShapes[1]['center'][1] - (ansShapeHeight) * 0.58,
              ansShapeWidth,
              ansShapeHeight
            );
          }else if(baseShapes[1]['shapeType'] == "shape3"){
            ctx.drawImage(
              img[1],
              baseShapes[1]['center'][0] - (ansShapeWidth) * 0.29,
              baseShapes[1]['center'][1] - (ansShapeHeight) * 0.525,
              ansShapeWidth,
              ansShapeHeight
            );
          }
        }else{
          let ansShapeWidth = (canvasPosition.width * img[2].width / 1280);
          let ansShapeHeight = (canvasPosition.height * img[2].height / 960);

          if(baseShapes[2]['shapeType'] == "shape1"){
            ctx.drawImage(
              img[2],
              baseShapes[2]['center'][0] - (ansShapeWidth) * 0.519,
              baseShapes[2]['center'][1] - (ansShapeHeight) * 0.7,
              ansShapeWidth,
              ansShapeHeight
            );
          }else if(baseShapes[2]['shapeType'] == "shape2"){
            ctx.drawImage(
              img[2],
              baseShapes[2]['center'][0] - (ansShapeWidth) * 0.630,
              baseShapes[2]['center'][1] - (ansShapeHeight) * 0.58,
              ansShapeWidth,
              ansShapeHeight
            );
          }else if(baseShapes[2]['shapeType'] == "shape3"){
            ctx.drawImage(
              img[2],
              baseShapes[2]['center'][0] - (ansShapeWidth) * 0.29,
              baseShapes[2]['center'][1] - (ansShapeHeight) * 0.525,
              ansShapeWidth,
              ansShapeHeight
            );
          }
        }
        ctx.restore();
        ctx.save();
      }
      if(2 === selectShapeIdxs){
        let cx = baseShapes[2]['center'][0];
        let cy = baseShapes[2]['center'][1];
        let angle = baseShapes[2]['rotate'];

        ctx.translate(cx, cy);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(-cx, -cy);

        let ansShapeWidth = (canvasPosition.width * img_f[2].width / 1280);
        let ansShapeHeight = (canvasPosition.height * img_f[2].height / 960);

        if(baseShapes[2]['shapeType'] == "shape1"){
          ctx.drawImage(
            img_f[2],
            baseShapes[2]['center'][0] - (ansShapeWidth) * 0.519,
            baseShapes[2]['center'][1] - (ansShapeHeight) * 0.7,
            ansShapeWidth,
            ansShapeHeight
          );
        }else if(baseShapes[2]['shapeType'] == "shape2"){
          ctx.drawImage(
            img_f[2],
            baseShapes[2]['center'][0] - (ansShapeWidth) * 0.630,
            baseShapes[2]['center'][1] - (ansShapeHeight) * 0.58,
            ansShapeWidth,
            ansShapeHeight
          );
        }else if(baseShapes[2]['shapeType'] == "shape3"){
          ctx.drawImage(
            img_f[2],
            baseShapes[2]['center'][0] - (ansShapeWidth) * 0.29,
            baseShapes[2]['center'][1] - (ansShapeHeight) * 0.525,
            ansShapeWidth,
            ansShapeHeight
          );
        }
        ctx.restore();
        ctx.save();
      }
    }
  };

  /**
   * レンダリング処理
   * （「切る」モードや「移動」モード時のみレンダリングを実行する）
   */
  let renderAnimation = null;
  let render = function () {
    drawShapes();
    renderAnimation = window.requestAnimationFrame(render);
  };
  render();   // レンダリング処理を呼び出し

  /**
   * マウスダウン（orタッチ）開始時の処理
   * @param e 操作イベント
   */
  let onMouseDown = function (e) {
    e.preventDefault(); // デフォルトイベントをキャンセル
    touched = true; // マウスダウン（orタッチ）中

    let downPoint = sps.getTouchPoint(e, canvasPosition.top, canvasPosition.left);   // マウスダウン（orタッチ）座標
    touchX = downPoint[0];
    touchY = downPoint[1];

    // タッチ開始時の座標を記録
    touchStartX = Math.floor(downPoint[0]);
    touchStartY = Math.floor(downPoint[1]);

    // 図形の回転用円画像のタッチかチェック
    if (selectShapeIdxs !== null && sps.judgeInnerCirclePoint(downPoint, baseShapes[selectShapeIdxs]['circle'], circleRadius)) {
      circleTouched = true;   // 回転用円画像タッチ開始
    } else {
      targetShapeIdxs = sps.getSelectShapeIdx(downPoint, baseShapes);
      selectShapeIdxs = null;
    }

  };
  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('touchstart', onMouseDown, false);

  /**
   * マウスダウン（タッチ移動）中の処理
   * @param e
   */
  let onMouseMove = function (e) {
    e.preventDefault(); // デフォルトイベントをキャンセル

    if (touched) {
      if (!circleTouched) {
        // 円画像タッチ以外の場合、図形選択は解除
        selectShapeIdxs = null;
      }

      // 移動後の座標
      let downPoint = sps.getTouchPoint(e, canvasPosition.top, canvasPosition.left);   // マウスダウン（orタッチ）座標
      let currentX = downPoint[0];
      let currentY = downPoint[1];

      //ここのコードを追加する（開始）
      if (currentX < 0 || currentY < 0 || canvasPosition.width < currentX || canvasPosition.height < currentY) {
        // 範囲外にタッチ中の場合は強制マウスアップ扱い
        touched = false; // マウスダウン（orタッチ）中を解除
        targetShapeIdxs = null; // タッチ中のカードインデックス初期化
      }

      // 移動量を算出
      let dx = currentX - touchX;
      let dy = currentY - touchY;

      if (null !== targetShapeIdxs) {
        // 図形移動の場合
        sps.moveShape(baseShapes[targetShapeIdxs], dx, dy);
        targetIdx = sps.getSelectShapeIdx(downPoint, baseShapes);
        targetShapeIdxs = sps.resortShapesForSelect(targetIdx, baseShapes);
        // 選択した図形が手前に描画されるよう画像データの配列順番を調整し、最後尾の選択図形のインデックスを取得
        img = sps.resortImagesForSelect(targetIdx,img);
        img_f = sps.resortImagesForSelect(targetIdx,img_f);
      } else if (circleTouched) {
        // 図形回転の場合
        sps.rotateShape([currentX, currentY], baseShapes[selectShapeIdxs]);
      }
      // マウスダウン（タッチ）開始座標を更新
      touchX = currentX;
      touchY = currentY;
    }
  };
  canvas.addEventListener('mousemove', onMouseMove, false);
  canvas.addEventListener('touchmove', onMouseMove, false);

  /**
   * マウスアップ（タッチ終了）時の処理
   * @param e 操作イベント
   */
  let onMouseUp = function (e) {
    e.preventDefault(); // デフォルトイベントをキャンセル

    touched = false; // マウスダウン（orタッチ）中を解除
    baseShapeTouched = false;   // ベース図形タッチを解除
    circleTouched = false;  // 回転用円画像タッチを解除

    let downPoint = sps.getTouchPoint(e, canvasPosition.top, canvasPosition.left);   // マウスダウン（orタッチ）座標
    let touchEndX = Math.floor(downPoint[0]);
    let touchEndY = Math.floor(downPoint[1]);

    if (Math.abs(touchStartX - touchEndX) < 3 && Math.abs(touchStartY - touchEndY) < 3) {
       // クリック判定（タッチ開始時座標と終了座標が僅差であればクリックとみなす）
       selectIdx = sps.getSelectShapeIdx(downPoint, baseShapes);
       if (selectIdx !== null) {
       // 選択した図形が手前に描画されるよう図形データの配列順番を調整し、最後尾の選択図形のインデックスを取得
       selectShapeIdxs = sps.resortShapesForSelect(selectIdx, baseShapes);
       // 選択した図形が手前に描画されるよう画像データの配列順番を調整し、最後尾の選択図形のインデックスを取得
       img = sps.resortImagesForSelect(selectIdx,img);
       img_f = sps.resortImagesForSelect(selectIdx,img_f);
      }else{
        selectShapeIdxs = null;  // 図形選択なし
      }
    }
    targetShapeIdxs = null;  // 移動対象の図形設定を解除
  };
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('touchend', onMouseUp, false);

  /**
   * マウスオーバーの処理
   * @param e
   */
  let onMouseOut = function (e) {
    e.preventDefault(); // デフォルトイベントをキャンセル

    touched = false; // マウスダウン（orタッチ）中を解除
    targetShapeIdxs = null; // タッチ中のカードインデックス初期化
  };

  canvas.addEventListener('pointerout', onMouseOut, false);
  /**
   * 「やりなおし」ボタンのクリック時処理
   */
  $restartBtns.click(function () {
    //init();
    location.reload();
  });
});
