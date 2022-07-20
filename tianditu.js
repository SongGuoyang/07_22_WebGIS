const Key = '06b6b0a414b9f91bba4a497337126c2a'
        var TiandiMap_img = new ol.layer.Tile({
            name: "天地图影像图层",
            source: new ol.source.XYZ({
                url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=06b6b0a414b9f91bba4a497337126c2a",//parent.TiandituKey()为天地图密钥,
                wrapX: false,
                crossOrigin: "Anonymous"
            })
        });
        var TiandiMap_vec = new ol.layer.Tile({
            name: "天地图矢量图层",
            source: new ol.source.XYZ({
                url: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=06b6b0a414b9f91bba4a497337126c2a",//parent.TiandituKey()为天地图密钥,
                wrapX: false,
                crossOrigin: "Anonymous"
            })
        });
        var TiandiMap_cva = new ol.layer.Tile({
            name: "天地图矢量注记图层",
            source: new ol.source.XYZ({
                url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=06b6b0a414b9f91bba4a497337126c2a",//parent.TiandituKey()为天地图密钥
                wrapX: false,
                crossOrigin: "Anonymous"
            })
        });