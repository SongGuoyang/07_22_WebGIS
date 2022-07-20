function createDraw(source,type) {
    let geometryFunction = null
    let maxPoints = 0

    //判断，根据不同的类型给参数赋不同的值
    if (type === 'Square') {
        type = 'Circle'
        geometryFunction = ol.interaction.Draw.createRegularPolygon(4)
    } else if(type === 'Box'){
        type = 'LineString';
        maxPoints = 2;
        geometryFunction = function (coordinates, geometry) {
            if (!geometry) {
                //多边形
                geometry = new ol.geom.Polygon(null);
            }
            var start = coordinates[0];
            var end = coordinates[1];
            geometry.setCoordinates([
                [start, [start[0], end[1]], end, [end[0], start[1]], start]
            ]);
            return geometry;
        }
    }

    // 添加画笔
    draw = new ol.interaction.Draw({
        // 绘制层数据源
        source: source,
        // 几何图形类型
        type: type,
        // 绘制正方形和矩形要用到参数
        geometryFunction: geometryFunction,
        maxPoints: maxPoints
    })
    return draw
}