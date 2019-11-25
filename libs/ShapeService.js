const ShapeService = function () {
    // ベース図形
    this.baseShapeLineColor = 'rgba(0, 0, 0, 1)';   // 線の色
    this.baseShapeLineWidth = 1;   // 線の太さ

    // 図形移動時の補正範囲
    this.correctionDistance = 30;
};
(function () {
    /**
     * 作図エリアの初期座標を取得
     * @param canvasPosition
     * @returns {{matrix: number[][]}}
     */
    ShapeService.prototype.setDrawingArea = function (canvasPosition) {
        return {
            'matrix': [
                [canvasPosition.width * 0.08, canvasPosition.height * 0.23],
                [canvasPosition.width * 0.08, canvasPosition.height * 0.9],
                [canvasPosition.width * 0.72, canvasPosition.height * 0.9],
                [canvasPosition.width * 0.72, canvasPosition.height * 0.23],
            ],
        };
    };

    /**
     * ベース図形の初期座標を取得（インデックスを指定した場合は指定インデックスの初期座標のみ取得）
     * @param canvasPosition
     * @param target    指定した図形
     * @returns {*[]}
     */
    ShapeService.prototype.setBaseShapes = function (canvasPosition) {
        let baseShape = [];
        //一つ目の四角形、き
        // 座標を設定
          baseShape[0] = {
            'shapeType':"shape1",
            'turnOverFlag': false,
            'center': [0, 0],       // 重心
            'crossPoint': [0, 0],   // 重心からの垂線と辺の交点
            'crossPoint2': [0, 0],   // 重心からの垂線と辺の交点
            'circle': [0, 0],       // 円（回転アイコン）の中心
            'initCircle': [0, 0],       // 初期の回転アイコンの中心
            'rotate': 0,   // 回転角度
            'square': [0, 0],       // 円（回転アイコン）の中心
            'initSquare': [0, 0],       // 初期の回転アイコンの中心
            'matrix': [
                [canvasPosition.width * 0.489, canvasPosition.height * 0.180],
                [canvasPosition.width * 0.368, canvasPosition.height * 0.515],
                [canvasPosition.width * 0.398, canvasPosition.height * 0.525],
                [canvasPosition.width * 0.438, canvasPosition.height * 0.545],
                [canvasPosition.width * 0.468, canvasPosition.height * 0.565],
                [canvasPosition.width * 0.507, canvasPosition.height * 0.600],
                [canvasPosition.width * 0.545, canvasPosition.height * 0.545],
                [canvasPosition.width * 0.585, canvasPosition.height * 0.500],
                [canvasPosition.width * 0.615, canvasPosition.height * 0.482],
                [canvasPosition.width * 0.631, canvasPosition.height * 0.446],
            ],     // 各頂点の座標
            'origin': {     // 回転時の座標計算用に元座標を保存
                'crossPoint': [],
                'crossPoint2': [],
                'circle': [],
                'square': [],
                'matrix': [],
            },
            'line': 0,
        };

        // 重心などを計算
        this.calcCenterOfGravity(baseShape[0]);     // 重心、重心からの垂線と辺の交点、円の中心を設定
        this.setOriginShapeData(baseShape[0]);      // 元座標情報を設定
        baseShape[0]['initCircle'] = [baseShape[0]['circle'][0], baseShape[0]['circle'][1]];  // 初期の回転アイコンの中心
        baseShape[0]['initSquare'] = [baseShape[0]['square'][0], baseShape[0]['square'][1]];  // 初期の回転アイコンの中心

        //右下
        // 座標を設定
        baseShape[1] = {
            'shapeType':"shape2",
            'turnOverFlag': false,
            'center': [0, 0],       // 重心
            'crossPoint': [0, 0],   // 重心からの垂線と辺の交点
            'crossPoint2': [0, 0],   // 重心からの垂線と辺の交点
            'circle': [0, 0],       // 円（回転アイコン）の中心
            'initCircle': [0, 0],       // 初期の回転アイコンの中心
            'rotate': 0,   // 回転角度
            'square': [0, 0],       // 円（回転アイコン）の中心
            'initSquare': [0, 0],       // 初期の回転アイコンの中心
            'matrix': [
                [canvasPosition.width * 0.29, canvasPosition.height * 0.727],
                [canvasPosition.width * 0.29, canvasPosition.height * 0.727],
                [canvasPosition.width * 0.546, canvasPosition.height * 0.727],
                [canvasPosition.width * 0.556, canvasPosition.height * 0.700],
                [canvasPosition.width * 0.558, canvasPosition.height * 0.696],
                [canvasPosition.width * 0.55, canvasPosition.height * 0.67],
                [canvasPosition.width * 0.53, canvasPosition.height * 0.63],
                [canvasPosition.width * 0.5, canvasPosition.height * 0.595],
                [canvasPosition.width * 0.45, canvasPosition.height * 0.553],
                [canvasPosition.width * 0.4, canvasPosition.height * 0.53],
                [canvasPosition.width * 0.368, canvasPosition.height * 0.512],

            ],     // 各頂点の座標
            'origin': {     // 回転時の座標計算用に元座標を保存
                'crossPoint': [],
                'crossPoint2': [],
                'circle': [],
                'square': [],
                'matrix': [],
            },
            'line': 0,
        };

        // 重心などを計算
        this.calcCenterOfGravity(baseShape[1]);     // 重心、重心からの垂線と辺の交点、円の中心を設定
        this.setOriginShapeData(baseShape[1]);      // 元座標情報を設定
        baseShape[1]['initCircle'] = [baseShape[1]['circle'][0], baseShape[1]['circle'][1]];  // 初期の回転アイコンの中心
        baseShape[1]['initSquare'] = [baseShape[1]['square'][0], baseShape[1]['square'][1]];  // 初期の回転アイコンの中心


        // 右下
        // 座標を設定
        baseShape[2] = {
            'shapeType':"shape3",
            'turnOverFlag': false,
            'center': [0, 0],       // 重心
            'crossPoint': [0, 0],   // 重心からの垂線と辺の交点
            'crossPoint2': [0, 0],   // 重心からの垂線と辺の交点
            'circle': [0, 0],       // 円（回転アイコン）の中心
            'initCircle': [0, 0],       // 初期の回転アイコンの中心
            'rotate': 0,   // 回転角度
            'square': [0, 0],       // 円（回転アイコン）の中心
            'initSquare': [0, 0],       // 初期の回転アイコンの中心
            'matrix': [
                [canvasPosition.width * 0.548, canvasPosition.height * 0.725],
                [canvasPosition.width * 0.78, canvasPosition.height * 0.725],
                [canvasPosition.width * 0.63, canvasPosition.height * 0.446],
                [canvasPosition.width * 0.616, canvasPosition.height * 0.483],
                [canvasPosition.width * 0.585, canvasPosition.height * 0.504],
                [canvasPosition.width * 0.55, canvasPosition.height * 0.54],
                [canvasPosition.width * 0.52, canvasPosition.height * 0.578],
                [canvasPosition.width * 0.506, canvasPosition.height * 0.598],
                [canvasPosition.width * 0.54, canvasPosition.height * 0.648],
                [canvasPosition.width * 0.558, canvasPosition.height * 0.693],
            ],     // 各頂点の座標
            'origin': {     // 回転時の座標計算用に元座標を保存
                'crossPoint': [],
                'crossPoint2': [],
                'circle': [],
                'square': [],
                'matrix': [],
            },
            'line': 0,
        };

        // 重心などを計算
        this.calcCenterOfGravity(baseShape[2]);     // 重心、重心からの垂線と辺の交点、円の中心を設定
        this.setOriginShapeData(baseShape[2]);      // 元座標情報を設定
        baseShape[2]['initCircle'] = [baseShape[2]['circle'][0], baseShape[2]['circle'][1]];  // 初期の回転アイコンの中心
        baseShape[2]['initSquare'] = [baseShape[2]['square'][0], baseShape[2]['square'][1]];  // 初期の回転アイコンの中心

        return baseShape;

    };

    /**
     * 指定した図形オブジェクトに重心座標と重心からの垂線と辺の交点座標、円の中心をセットする
     * @param shape
     */

    ShapeService.prototype.calcCenterOfGravity = function (shape) {

        // 回転用円画像の情報
        let circleRadius = 20;  // 半径

        // N角形の重心の求め方は
        // x座標＝(x1+x2+x3+・・・+xn)/n
        // y座標＝(y1+y2+y3+・・・+xn)/n

        let newCenterXTotal = 0;
        let newCenterYTotal = 0;

        let matrixLength = shape['matrix'].length;
        for (let i = 0; i < matrixLength; i++) {
            newCenterXTotal += shape['matrix'][i][0];
            newCenterYTotal += shape['matrix'][i][1];
        }
        shape['center'][0] = newCenterXTotal / matrixLength;
        shape['center'][1] = newCenterYTotal / matrixLength;

        if (shape['shapeType'] == "shape1") {
            shape['circle'] = [shape['matrix'][0][0] - 30, shape['matrix'][0][1] - 10];
            shape['square'] = [shape['matrix'][1][0] - 30, shape['matrix'][1][1] - 5];
          } else if (shape['shapeType'] == "shape2") {
            shape['circle'] = [shape['matrix'][0][0] - 25, shape['matrix'][0][1] - 10];
            shape['square'] = [shape['matrix'][2][0] - 25, shape['matrix'][2][1] + 25];
          } else if (shape['shapeType'] == "shape3") {
            shape['circle'] = [shape['matrix'][2][0] + 25, shape['matrix'][0][1] + 10];
            shape['square'] = [shape['matrix'][1][0] - 25, shape['matrix'][1][1] + 25];
          }
    };


    /**
     * 2つの線分（線分ABと線分CD）の交点を求める（交点がない場合はnullが返る）
     * @param pointA
     * @param pointB
     * @param pointC
     * @param pointD
     * @return {null|number[]}
     */

    ShapeService.prototype.getIntersectPoint = function (pointA, pointB, pointC, pointD) {
        // 外積が0のとき平行
        let vectorAB = [pointB[0] - pointA[0], pointB[1] - pointA[1]]; // ベクトルAB
        let vectorCD = [pointD[0] - pointC[0], pointD[1] - pointC[1]]; // ベクトルCD
        // 2次元ベクトルA(ax, ay)とB(bx, by)の外積A×B : A×B = ax*by - ay*bx
        let crossProductAB2CD = vectorAB[0] * vectorCD[1] - vectorAB[1] * vectorCD[0];    // ABとCDの外積
        if (crossProductAB2CD === 0) {
            // ベクトルABとCDが平行のとき交点は存在しない
            return null;
        }

        let crossP = [0, 0];
        let s1 = ((pointD[0] - pointC[0]) * (pointA[1] - pointC[1]) - (pointD[1] - pointC[1]) * (pointA[0] - pointC[0])) / 2;
        let s2 = ((pointD[0] - pointC[0]) * (pointC[1] - pointB[1]) - (pointD[1] - pointC[1]) * (pointC[0] - pointB[0])) / 2;

        // 2直線の交点を求める
        crossP[0] = pointA[0] + (pointB[0] - pointA[0]) * s1 / (s1 + s2);
        crossP[1] = pointA[1] + (pointB[1] - pointA[1]) * s1 / (s1 + s2);

        let ACx = pointC[0] - pointA[0];
        let ACy = pointC[1] - pointA[1];
        let tmp = (pointB[0] - pointA[0]) * (pointD[1] - pointC[1]) - (pointB[1] - pointA[1]) * (pointD[0] - pointC[0]);

        let r = ((pointD[1] - pointC[1]) * ACx - (pointD[0] - pointC[0]) * ACy) / tmp;
        let s = ((pointB[1] - pointA[1]) * ACx - (pointB[0] - pointA[0]) * ACy) / tmp;

        // 2直線上にあるかどうか
        if (0 <= r && r <= 1 && 0 <= s && s <= 1) {
            return crossP;
        } else {
            return null;
        }
    };

    /**
     * 指定図形に元座標データを初期セットする
     * @param shape
     */
    ShapeService.prototype.setOriginShapeData = function (shape) {

        shape['origin'] = {};
        shape['origin']['crossPoint'] = [shape['crossPoint'][0], shape['crossPoint'][1]];
        shape['origin']['circle'] = [shape['circle'][0], shape['circle'][1]];

        shape['origin']['crossPoint2'] = [shape['crossPoint2'][0], shape['crossPoint2'][1]];
        shape['origin']['square'] = [shape['square'][0], shape['square'][1]];

        shape['origin']['matrix'] = [];
        for (let i = 0; i < shape['matrix'].length; i++) {
            shape['origin']['matrix'][i] = [shape['matrix'][i][0], shape['matrix'][i][1]];
        }
    };

    /**
     * リサイズ後のベース図形の座標を再設定
     * @param scale
     * @param baseShape
     */
    ShapeService.prototype.recalculateBaseShape = function (scale, baseShape) {
        for (let k = 0; k < baseShape.length; k++) {
            baseShape[k]['initCircle'] = [baseShape[k]['initCircle'][0] * scale, baseShape[k]['initCircle'][1] * scale];
            baseShape[k]['initSquare'] = [baseShape[k]['initSquare'][0] * scale, baseShape[k]['initSquare'][1] * scale];
            for (let i = 0; i < baseShape[k]['matrix'].length; i++) {
                baseShape[k]['matrix'][i] = [baseShape[k]['matrix'][i][0] * scale, baseShape[k]['matrix'][i][1] * scale];
            }

            // 重心などを計算
            this.calcCenterOfGravity(baseShape[k]);     // 重心、重心からの垂線と辺の交点、円の中心を設定
            this.setOriginShapeData(baseShape[k]);      // 元座標情報を設定
        }

    };

    /**
     * 指定倍率でリサイズした図形の座標を再計算する
     * @param scale
     * @param shapes
     */
    ShapeService.prototype.recalculateMatrix = function (scale, shapes) {
        for (let k = 0; k < shapes.length; k++) {
            // 拡大・縮小後の座標を設定
            shapes[k]['center'] = [shapes[k]['center'][0] * scale, shapes[k]['center'][1] * scale];
            shapes[k]['crossPoint'] = [shapes[k]['crossPoint'][0] * scale, shapes[k]['crossPoint'][1] * scale];
            shapes[k]['circle'] = [shapes[k]['circle'][0] * scale, shapes[k]['circle'][1] * scale];
            shapes[k]['initCircle'] = [shapes[k]['initCircle'][0] * scale, shapes[k]['initCircle'][1] * scale];

        shapes[k]['crossPoint2'] = [shapes[k]['crossPoint2'][0] * scale, shapes[k]['crossPoint2'][1] * scale];
        shapes[k]['square'] = [shapes[k]['square'][0] * scale, shapes[k]['square'][1] * scale];
        shapes[k]['initSquare'] = [shapes[k]['initSquare'][0] * scale, shapes[k]['initSquare'][1] * scale];

            for (let i = 0; i < shapes[k]['matrix'].length; i++) {
                shapes[k]['matrix'][i][0] = shapes[k]['matrix'][i][0] * scale;
                shapes[k]['matrix'][i][1] = shapes[k]['matrix'][i][1] * scale;
            }
            // 元座標情報を設定
            this.setOriginShapeData(shapes[k]);
        }
    };

    ShapeService.prototype.recalculateImageShape = function (scale) {
        return scale
    };

    /**
     * マウスダウン（orタッチ）座標を取得する
     * @param evt
     * @param canvasTop
     * @param canvasLeft
     * @return array    マウスダウン（orタッチ）座標 x, yの配列
     */
    ShapeService.prototype.getTouchPoint = function (evt, canvasTop, canvasLeft) {
        let touchX = 0;
        let touchY = 0;
        if (evt.type === 'touchstart' || evt.type === 'touchmove' || evt.type === 'touchend') {
            // タッチデバイスの場合
            let touchObject = evt.changedTouches[0];
            touchX = touchObject.pageX - canvasLeft;
            touchY = touchObject.pageY - canvasTop;
        } else {
            // マウス操作の場合
            touchX = evt.clientX - canvasLeft;
            touchY = evt.clientY - canvasTop;
        }
        return [touchX, touchY];   // マウスダウン（orタッチ）座標
    };

    /**
     * クリックした場所にある図形の番号を取得
     * @param point
     * @param shapes
     * @return {null|number}
     */
    ShapeService.prototype.getSelectShapeIdx = function (point, shapes) {
        let resultIdx = -1;
        for (let k = 0; k < shapes.length; k++) {
            let innerJudge = this.judgeInnerShapePoint(point, shapes[k]);
            if (innerJudge) {
                resultIdx = k;
            }
        }

        if (resultIdx === -1) {
            return null;
        } else {
            return resultIdx;
        }
    };

    /**
     * 指定ポイントが指定円の内側にあるかどうか
     * @param point
     * @param circleCenter
     * @param radius
     * @return {boolean}
     */
    ShapeService.prototype.judgeInnerCirclePoint = function (point, circleCenter, radius) {
        // 点 (x, y) が、半径 r の円に含まれているかどうかは、円の中心からの距離を比較すればよい
        // 円の中心からの距離が r 以下であれば、点は円内にある
        let distance = Math.sqrt(Math.pow(point[0] - circleCenter[0], 2) + Math.pow(point[1] - circleCenter[1], 2));
        if (distance < radius) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * 指定ポイントが図形内に存在する点か判定する
     * @param point
     * @param shape
     * @return {boolean}
     */
    ShapeService.prototype.judgeInnerShapePoint = function (point, shape) {
        // ある２次元上の点が多角形の内部にあるかどうかを判定するには、判定点からX軸に水平な半直線を描き、
        // 多角形の各線分との交点の個数が奇数ならば、内部の点と判断すればよい
        let intersectCount = 0;
        for (let i = 0; i < shape['matrix'].length; i++) {
            let nextIdx = i + 1;
            if (i === shape['matrix'].length - 1) {
                // 最終頂点は始点と結ぶ線分にする
                nextIdx = 0;
            }

            // 対象点より+x軸方向に辺の頂点のどちらかがある場合のみ交差する
            if (point[0] < shape['matrix'][i][0] || point[0] < shape['matrix'][nextIdx][0]) {
                let targetPointEnd = [shape['matrix'][i][0], point[1]];
                if (shape['matrix'][i][0] < shape['matrix'][nextIdx][0]) {
                    targetPointEnd[0] = shape['matrix'][nextIdx][0];
                }

                // 辺と対象点（指定点と辺の最長y座標を結ぶ平行線）の交点を取得
                let crossP = this.getIntersectPoint(point, targetPointEnd, shape['matrix'][i], shape['matrix'][nextIdx]);
                if (null !== crossP) {
                    intersectCount++;
                }
            }
        }

        if (intersectCount % 2 === 1) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * 指定図形を移動させる
     * @param shape 一つの図形データ
     * @param dx    x座標の移動量
     * @param dy    y座標の移動量
     */
    ShapeService.prototype.moveShape = function (shape, dx, dy) {
        // 移動後の重心の座標計算
        shape['center'][0] = shape['center'][0] + dx;
        shape['center'][1] = shape['center'][1] + dy;
        // 移動後の交点の座標計算
        shape['crossPoint'][0] = shape['crossPoint'][0] + dx;
        shape['crossPoint'][1] = shape['crossPoint'][1] + dy;
        // 移動後の円画像の座標計算
        shape['circle'][0] = shape['circle'][0] + dx;
        shape['circle'][1] = shape['circle'][1] + dy;
        // 移動後の円画像の初期座標計算
        shape['initCircle'][0] = shape['initCircle'][0] + dx;
        shape['initCircle'][1] = shape['initCircle'][1] + dy;

        // 移動後の交点の座標計算
        shape['crossPoint2'][0] = shape['crossPoint2'][0] + dx;
        shape['crossPoint2'][1] = shape['crossPoint2'][1] + dy;
        // 移動後の円画像の座標計算
        shape['square'][0] = shape['square'][0] + dx;
        shape['square'][1] = shape['square'][1] + dy;
        // 移動後の円画像の初期座標計算
        shape['initSquare'][0] = shape['initSquare'][0] + dx;
        shape['initSquare'][1] = shape['initSquare'][1] + dy;

        // 移動後の各頂点の座標計算
        for (let i = 0; i < shape['matrix'].length; i++) {
            shape['matrix'][i][0] = shape['matrix'][i][0] + dx;
            shape['matrix'][i][1] = shape['matrix'][i][1] + dy;
        }
        // 元座標情報を設定
        this.setOriginShapeData(shape);
    };

    /**
     * 指定開始地点から終了地点へ図形の重心を中心に図形を回転させる
     * @param startPoint
     * @param endPoint
     * @param shape
     */
    ShapeService.prototype.rotateShapeByStartEnd = function (startPoint, endPoint, shape) {
        // ベクトルaとベクトルbの間にある角度θを求める場合
        // ベクトルの内積を求めると角度が求まる（外積からも求められる）
        // 角度の正負は外積を求めることで知ることができる（時計回りは外積が正、反時計回りは外積が負）

        let centerPoint = shape['center'];

        // ベクトルA: centerPoint -> startPoint
        // ベクトルB: centerPoint -> endPoint
        let vectorA = [startPoint[0] - centerPoint[0], startPoint[1] - centerPoint[1]]; // ベクトルA
        let vectorB = [endPoint[0] - centerPoint[0], endPoint[1] - centerPoint[1]]; // ベクトルB
        let vectorALength = Math.sqrt(Math.pow(vectorA[0], 2) + Math.pow(vectorA[1], 2));   // ベクトルAの長さ
        let vectorBLength = Math.sqrt(Math.pow(vectorB[0], 2) + Math.pow(vectorB[1], 2));   // ベクトルBの長さ

        // 2次元ベクトルA(ax, ay)とB(bx, by)の外積A×B : A×B = ax*by - ay*bx
        let crossProductAB = vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0];    // ABの外積
        // 2次元ベクトルA(ax, ay)とB(bx, by)の内積A・B : A・B = ax*bx + ay*by
        let dotProductAB = vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1];    // ABの外積

        // ベクトルABの外積 = ベクトルAの長さ * ベクトルBの長さ * sinθ
        let sin = crossProductAB / (vectorALength * vectorBLength);
        // ベクトルABの内積 = ベクトルAの長さ * ベクトルBの長さ * cosθ
        let cos = dotProductAB / (vectorALength * vectorBLength);

        // 円の中心の回転後座標を計算
        shape['circle'][0] = cos * (shape['origin']['circle'][0] - centerPoint[0]) - sin * (shape['origin']['circle'][1] - centerPoint[1]) + centerPoint[0];
        shape['circle'][1] = sin * (shape['origin']['circle'][0] - centerPoint[0]) + cos * (shape['origin']['circle'][1] - centerPoint[1]) + centerPoint[1];
        // 重心からの垂線と辺の交点の回転後座標を計算
        shape['crossPoint'][0] = cos * (shape['origin']['crossPoint'][0] - centerPoint[0]) - sin * (shape['origin']['crossPoint'][1] - centerPoint[1]) + centerPoint[0];
        shape['crossPoint'][1] = sin * (shape['origin']['crossPoint'][0] - centerPoint[0]) + cos * (shape['origin']['crossPoint'][1] - centerPoint[1]) + centerPoint[1];

        // 円の中心の回転後座標を計算
        shape['square'][0] = cos * (shape['origin']['square'][0] - centerPoint[0]) - sin * (shape['origin']['square'][1] - centerPoint[1]) + centerPoint[0];
        shape['square'][1] = sin * (shape['origin']['square'][0] - centerPoint[0]) + cos * (shape['origin']['square'][1] - centerPoint[1]) + centerPoint[1];
        // 重心からの垂線と辺の交点の回転後座標を計算
        shape['crossPoint2'][0] = cos * (shape['origin']['crossPoint2'][0] - centerPoint[0]) - sin * (shape['origin']['crossPoint2'][1] - centerPoint[1]) + centerPoint[0];
        shape['crossPoint2'][1] = sin * (shape['origin']['crossPoint2'][0] - centerPoint[0]) + cos * (shape['origin']['crossPoint2'][1] - centerPoint[1]) + centerPoint[1];

        // 各頂点の回転後座標を計算
        for (let i = 0; i < shape['matrix'].length; i++) {
            shape['matrix'][i][0] = cos * (shape['origin']['matrix'][i][0] - centerPoint[0]) - sin * (shape['origin']['matrix'][i][1] - centerPoint[1]) + centerPoint[0];
            shape['matrix'][i][1] = sin * (shape['origin']['matrix'][i][0] - centerPoint[0]) + cos * (shape['origin']['matrix'][i][1] - centerPoint[1]) + centerPoint[1];
        }

        // 絶対的角度を取得
        shape['rotate'] = this.getRotateAngle(shape['initCircle'], shape['circle'], shape['center']);

    };

    ShapeService.prototype.flipAboutYAxis = function (shape) {
      let flipResult = [];
      let invertY = [[-1,0,0],[0,1,0],[0,0,1]];


      for(let i = 0; i < shape['matrix'].length; i++){
        let flipedX = shape['matrix'][i][0] * invertY[0][0] + shape['matrix'][i][1] * invertY[0][1] + 1 * invertY[0][2] + shape['center'][0] * 2;
        let flipedY = shape['matrix'][i][0] * invertY[1][0] + shape['matrix'][i][1] * invertY[1][1] + 1 * invertY[1][2];
        flipResult[i] = [flipedX,flipedY];
      }

      for(let i = 0; i < flipResult.length; i++){
        shape['matrix'][i] = flipResult[i];
      }

      let flipedCircleX = shape['circle'][0] * invertY[0][0] + shape['circle'][1] * invertY[0][1] + 1 * invertY[0][2] + shape['center'][0] * 2;
      let flipedCircleY = shape['circle'][0] * invertY[1][0] + shape['circle'][1] * invertY[1][1] + 1 * invertY[1][2];

      let flipedSquareX = shape['square'][0] * invertY[0][0] + shape['square'][1] * invertY[0][1] + 1 * invertY[0][2] + shape['center'][0] * 2;
      let flipedSquareY = shape['square'][0] * invertY[1][0] + shape['square'][1] * invertY[1][1] + 1 * invertY[1][2];

      shape['circle'][0] = flipedCircleX;
      shape['circle'][1] = flipedCircleY;

      shape['square'][0] = flipedSquareX;
      shape['square'][1] = flipedSquareY;

      shape['initCircle'][0] =  shape['initCircle'][0] * invertY[0][0] + shape['initCircle'][1] * invertY[0][1] + 1 * invertY[0][2] + shape['center'][0] * 2;
      shape['initCircle'][1] =  shape['initCircle'][0] * invertY[1][0] + shape['initCircle'][1] * invertY[1][1] + 1 * invertY[1][2];

      shape['rotate'] = 360 - shape['rotate'];

      // 元座標情報を設定→これやらないと回転アイコン押下時に元に戻ったりする
      this.setOriginShapeData(shape);
    }

    /**
     * 指定図形を重心を中心に回転させる
     * @param endPoint  タッチ座標
     * @param shape
     */
    ShapeService.prototype.rotateShape = function (endPoint, shape) {
        let startPoint = shape['origin']['circle'];
        this.rotateShapeByStartEnd(startPoint, endPoint, shape);
    };

    /**
     * 指定地点を中心としたスタート座標とエンド座標の角度を取得
     * @param startPoint
     * @param endPoint
     * @param centerPoint
     * @returns {number}
     */
    ShapeService.prototype.getRotateAngle = function (startPoint, endPoint, centerPoint) {
        // ベクトルaとベクトルbの間にある角度θを求める場合
        // ベクトルの内積を求めると角度が求まる（外積からも求められる）
        // 角度の正負は外積を求めることで知ることができる（時計回りは外積が正、反時計回りは外積が負）

        // ベクトルA: centerPoint -> startPoint
        // ベクトルB: centerPoint -> endPoint
        let vectorA = [startPoint[0] - centerPoint[0], startPoint[1] - centerPoint[1]]; // ベクトルA
        let vectorB = [endPoint[0] - centerPoint[0], endPoint[1] - centerPoint[1]]; // ベクトルB

        // 2次元ベクトルA(ax, ay)とB(bx, by)の外積A×B : A×B = ax*by - ay*bx
        let crossProductAB = vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0];    // ABの外積
        // 2次元ベクトルA(ax, ay)とB(bx, by)の内積A・B : A・B = ax*bx + ay*by
        let dotProductAB = vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1];    // ABの外積

        // θ ＝ atan2(A×B，A・B) (-180°＜ θ ≦ +180°)
        // 度数 = θ * (180 / Math.PI)
        let angle = Math.atan2(crossProductAB, dotProductAB) * (180 / Math.PI);
        angle = angle < 0 ? 360 + angle : angle;
        return angle;
    };

    /**
     * 指定インデックスの図形が図形データ配列の最後尾になるよう設定し最後尾インデックスを取得
     * @param selectIdx 指定インデックス
     * @param shapes    図形データ
     *  @param images    画像データ
     * @return {number} 最後尾インデックス
     */
    ShapeService.prototype.resortShapesForSelect = function (selectIdx, shapes) {
        // 選択図形データをコピー
        let selectShape = shapes[selectIdx];

        // 選択図形データを配列から削除
        shapes.splice(selectIdx, 1);
        // 最後尾に再度追加
        shapes.push(selectShape);
        // 最後尾が選択図形なので最後尾インデックス番号を返却
        return (shapes.length - 1);
    };

    /**
     * 図形の描画順が変更された場合の画像の描画順も変更する
     * @param selectIdx 指定インデックス
     * @param images    図形データ
     * @return {number} 最後尾インデックス
     */
    ShapeService.prototype.resortImagesForSelect = function (selectIdx, images) {
        // 選択図形データをコピー
        let temp = images[selectIdx];
        images.splice(selectIdx,1);
        images.push(temp);

        // 最後尾が選択図形なので最後尾インデックス番号を返却
        return images;
    };

    /**
     * 指定座標を指定した点を中心に指定角度、回転させた後の座標を取得
     * @param angle
     * @param centerPoint
     * @param coordinate
     * @return {[]}
     */
    ShapeService.prototype.getRotateCoordinate = function (angle, centerPoint, coordinate) {
        let radian = angle / (180 / Math.PI);
        let sin = Math.sin(radian);
        let cos = Math.cos(radian);

        // 回転後座標を計算
        let resultCoordinate = [];
        resultCoordinate[0] = cos * (coordinate[0] - centerPoint[0]) - sin * (coordinate[1] - centerPoint[1]) + centerPoint[0];
        resultCoordinate[1] = sin * (coordinate[0] - centerPoint[0]) + cos * (coordinate[1] - centerPoint[1]) + centerPoint[1];

        return resultCoordinate;
    };

    /**
     * 指定図形に最も近い図形へ補正移動する
     * @param targetShapeIdx
     * @param shapes
     */
    ShapeService.prototype.moveNearestShape = function (targetShapeIdx, shapes, targetShapes) {
        let nearestShapeDistance = null;
        let nearestShapeIdx = null;
        let nearestSideP = null;
        let nearestSidePnext = null;
        let targetSideP = null;
        let targetSidePnext = null;

        for (let k = 0; k < shapes.length; k++) {
            if (k !== targetShapeIdx) {
                for (let s = shapes[targetShapeIdx]['matrix'].length - 1; s >= 0; s--) {
                    let sNextIdx = s - 1;
                    if (s === 0) {
                        sNextIdx = shapes[targetShapeIdx]['matrix'].length - 1;
                    }

                    // 他の図形と辺の距離を比較する
                    for (let i = 0; i < shapes[k]['matrix'].length; i++) {
                        let iNextIdx = i + 1;
                        if (i === shapes[k]['matrix'].length - 1) {
                            iNextIdx = 0;
                        }

                        // 2点が交わらない場合のみ判定
                        let intersectPoint = this.getIntersectPoint(shapes[targetShapeIdx]['matrix'][s], shapes[targetShapeIdx]['matrix'][sNextIdx], shapes[k]['matrix'][i], shapes[k]['matrix'][iNextIdx]);
                        if (null === intersectPoint) {
                            let targetShapeSideLength = Math.pow((shapes[targetShapeIdx]['matrix'][s][0] - shapes[targetShapeIdx]['matrix'][sNextIdx][0]), 2) + Math.pow((shapes[targetShapeIdx]['matrix'][s][1] - shapes[targetShapeIdx]['matrix'][sNextIdx][1]), 2);
                            let shapeSideLength = Math.pow((shapes[k]['matrix'][i][0] - shapes[k]['matrix'][iNextIdx][0]), 2) + Math.pow((shapes[k]['matrix'][i][1] - shapes[k]['matrix'][iNextIdx][1]), 2);

                            let p1Data = {};
                            let p2Data = {};
                            if (targetShapeSideLength <= shapeSideLength) {
                                p1Data = this.getP2LineDistance(shapes[targetShapeIdx]['matrix'][s], shapes[k]['matrix'][i], shapes[k]['matrix'][iNextIdx]);
                                p2Data = this.getP2LineDistance(shapes[targetShapeIdx]['matrix'][sNextIdx], shapes[k]['matrix'][i], shapes[k]['matrix'][iNextIdx]);
                            } else {
                                p1Data = this.getP2LineDistance(shapes[k]['matrix'][i], shapes[targetShapeIdx]['matrix'][s], shapes[targetShapeIdx]['matrix'][sNextIdx]);
                                p2Data = this.getP2LineDistance(shapes[k]['matrix'][iNextIdx], shapes[targetShapeIdx]['matrix'][s], shapes[targetShapeIdx]['matrix'][sNextIdx]);
                            }

                            if ((p1Data['onLine'] || p2Data['onLine'])
                                && (5 < p1Data['distance'] && p1Data['distance'] < this.correctionDistance)
                                && (5 < p2Data['distance'] && p2Data['distance'] < this.correctionDistance)) {
                                if (nearestShapeDistance === null || p1Data['distance'] + p2Data['distance'] < nearestShapeDistance) {
                                    // 一番近い図形のインデックス番号と頂点インデックス番号を保存
                                    nearestShapeDistance = p1Data['distance'] + p2Data['distance'];
                                    nearestShapeIdx = k;
                                    nearestSideP = i;
                                    nearestSidePnext = iNextIdx;
                                    // 図形に最も近い移動中の図形の辺
                                    targetSideP = s;
                                    targetSidePnext = sNextIdx;
                                }
                            }
                        }
                    }
                }
            }
        }

        if (nearestShapeIdx !== null) {
            // 最も近い図形がある場合、その図形の近くへ対象図形を回転、移動させる
            // 対象図形の重心から補正する辺への垂線の足点を求める
            let targetSideData = this.getP2LineDistance(shapes[targetShapeIdx]['center'], shapes[targetShapeIdx]['matrix'][targetSideP], shapes[targetShapeIdx]['matrix'][targetSidePnext]);
            let targetSideFood = targetSideData['food'];
            // 対象図形の重心から最も近い図形の辺への垂線の足点を求める
            let nearestShapeSideData = this.getP2LineDistance(shapes[targetShapeIdx]['center'], shapes[nearestShapeIdx]['matrix'][nearestSideP], shapes[nearestShapeIdx]['matrix'][nearestSidePnext]);
            let nearestShapeSideFood = nearestShapeSideData['food'];

            // 対象図形を回転させる
            this.rotateShapeByStartEnd(targetSideFood, nearestShapeSideFood, shapes[targetShapeIdx]);

            // 頂点同士でお互いが近い方の頂点のペアを求める
            let pear = [];
            pear[0] = Math.pow((shapes[targetShapeIdx]['matrix'][targetSideP][0] - shapes[nearestShapeIdx]['matrix'][nearestSideP][0]), 2) + Math.pow((shapes[targetShapeIdx]['matrix'][targetSideP][1] - shapes[nearestShapeIdx]['matrix'][nearestSideP][1]), 2);
            pear[1] = Math.pow((shapes[targetShapeIdx]['matrix'][targetSidePnext][0] - shapes[nearestShapeIdx]['matrix'][nearestSidePnext][0]), 2) + Math.pow((shapes[targetShapeIdx]['matrix'][targetSidePnext][1] - shapes[nearestShapeIdx]['matrix'][nearestSidePnext][1]), 2);
            pear[2] = Math.pow((shapes[targetShapeIdx]['matrix'][targetSideP][0] - shapes[nearestShapeIdx]['matrix'][nearestSidePnext][0]), 2) + Math.pow((shapes[targetShapeIdx]['matrix'][targetSideP][1] - shapes[nearestShapeIdx]['matrix'][nearestSidePnext][1]), 2);
            pear[3] = Math.pow((shapes[targetShapeIdx]['matrix'][targetSidePnext][0] - shapes[nearestShapeIdx]['matrix'][nearestSideP][0]), 2) + Math.pow((shapes[targetShapeIdx]['matrix'][targetSidePnext][1] - shapes[nearestShapeIdx]['matrix'][nearestSideP][1]), 2);
            let minPear = pear[0];
            let pearIdx = 0;
            for (let x = 1; x < 4; x++) {
                if (minPear > pear[x]) {
                    minPear = pear[x];
                    pearIdx = x;
                }
            }

            let dx = 0;
            let dy = 0;
            if (0 === pearIdx) {
                dx = shapes[nearestShapeIdx]['matrix'][nearestSideP][0] - shapes[targetShapeIdx]['matrix'][targetSideP][0];
                dy = shapes[nearestShapeIdx]['matrix'][nearestSideP][1] - shapes[targetShapeIdx]['matrix'][targetSideP][1];
            } else if (1 === pearIdx) {
                dx = shapes[nearestShapeIdx]['matrix'][nearestSidePnext][0] - shapes[targetShapeIdx]['matrix'][targetSidePnext][0];
                dy = shapes[nearestShapeIdx]['matrix'][nearestSidePnext][1] - shapes[targetShapeIdx]['matrix'][targetSidePnext][1];
            } else if (2 === pearIdx) {
                dx = shapes[nearestShapeIdx]['matrix'][nearestSidePnext][0] - shapes[targetShapeIdx]['matrix'][targetSideP][0];
                dy = shapes[nearestShapeIdx]['matrix'][nearestSidePnext][1] - shapes[targetShapeIdx]['matrix'][targetSideP][1];
            } else {
                dx = shapes[nearestShapeIdx]['matrix'][nearestSideP][0] - shapes[targetShapeIdx]['matrix'][targetSidePnext][0];
                dy = shapes[nearestShapeIdx]['matrix'][nearestSideP][1] - shapes[targetShapeIdx]['matrix'][targetSidePnext][1];
            }
            this.moveShape(targetShapes[targetShapeIdx], dx, dy);
        }
    };

    /**
     * 点Pから線分ABまでの垂線の足点と足点が線分AB上にあるかの判定、線分ABまでの距離を取得
     * @param pointP
     * @param pointA
     * @param pointB
     * @return {{distance: *, food: *, onLine: *}}
     */
    ShapeService.prototype.getP2LineDistance = function (pointP, pointA, pointB) {
        // 点Pから線分ABまでの垂線の足点をIとする
        // |AI| = |AP|cosα
        // AP・AB = |AP||AB|cosα
        // 以上より、|AI| = (AP・AB) / |AB|
        // よって 点I = A + ( |AI|/|AB| ) AB = A + ( (AP・AB) / |AB||AB| ) AB
        // ※ 垂線の足点Iが線分AB上にあるかどうかを、( (AP・AB) / |AB||AB| ) の値が、0～1かどうかで判定することができる

        let vectorAP = [pointP[0] - pointA[0], pointP[1] - pointA[1]];
        let vectorAB = [pointB[0] - pointA[0], pointB[1] - pointA[1]];
        // 2次元ベクトルA(ax, ay)とB(bx, by)の内積A・B : A・B = ax*bx + ay*by
        let dotProductAP2AB = vectorAP[0] * vectorAB[0] + vectorAP[1] * vectorAB[1];    // AP,ABの内積
        let tmp = dotProductAP2AB / (Math.pow(vectorAB[0], 2) + Math.pow(vectorAB[1], 2));
        let pointI = [0, 0];
        pointI[0] = pointA[0] + tmp * vectorAB[0];
        pointI[1] = pointA[1] + tmp * vectorAB[1];

        let vectorIP = [pointP[0] - pointI[0], pointP[1] - pointI[1]];
        let lengthIP = Math.sqrt(Math.pow(vectorIP[0], 2) + Math.pow(vectorIP[1], 2));

        let onLine = false;
        if (0 <= tmp && tmp <= 1) {
            onLine = true;
        }

        let result = {
            'food': pointI,
            'distance': lengthIP,
            'onLine': onLine,
        };

        return result;
    };

}());
