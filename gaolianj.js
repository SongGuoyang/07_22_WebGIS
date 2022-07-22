function querySuccess(params) {
    alert('查询成功')
    console.log(params);
    //初始化Zondy.Format.PolygonJSON类
    var format = new Zondy.Format.PolygonJSON();
    //将MapGIS要素JSON反序列化为ol.Feature类型数组
    var features = format.read(params);

    //实例化一个矢量图层drawLayerr用于高亮显示结果
    var drawSource = new ol.source.Vector({
        wrapX: false
    });
    drawSource.addFeatures(features);
    drawLayer = new ol.layer.Vector({
        source: drawSource,
        style: new ol.style.Style({
            //填充色
            fill: new ol.style.Fill({
                color: 'rgba(255, 204, 51, 0.5)'
            }),
            //边线样式
            stroke: new ol.style.Stroke({
                color: 'rgba(255,204, 51, 1)',
                width: 1
            })
        })
    });

    map.addLayer(drawLayer);
    map.setView(new ol.View({
        projection: 'EPSG:4326',
        center: [-53,50],
        zoom: 4
    }));
}