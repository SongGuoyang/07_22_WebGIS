const POINT_STYLE = {
    Angle: 0,
    Color: 11,
    Space: 0,
    SymHeight: 10,
    SymID: 31,
    SymWidth: 10
}
/**
 * 
 * @param {array} position 坐标
 * @param {string} layer  图层的名称
 * @param {array} attr [{name:"name",value:"武汉",type:"string"}] 
 * @param {object} service {name,layerId)
 */
function addPoint({
    position,
    layer,
    attr,
    service
}) {
    //1-1、设置几何信息
    var gpoint = new Zondy.Object.GPoint(position[0], position[1]);
    var fGeom = new Zondy.Object.FeatureGeometry({
        PntGeom: [gpoint]
    });
    //1-2、设置样式信息
    //描述点要素的符号参数信息
    var pointInfo = new Zondy.Object.CPointInfo(POINT_STYLE);
    //设置当前点要素的图形参数信息
    var webGraphicInfo = new Zondy.Object.WebGraphicsInfo({
        InfoType: 1,
        PntInfo: pointInfo
    });
    //1-3、属性信息
    //设置添加点要素的属性信息
    var attValue = attr.map(item => item.value);
    /* 2、构建点要素 */
    //创建一个要素
    var feature = new Zondy.Object.Feature({
        fGeom: fGeom,
        GraphicInfo: webGraphicInfo,
        AttValue: attValue
    });
    //设置要素为点要素
    feature.setFType(1);
    /* 3、创建要素集 */
    //创建一个要素数据集
    var featureSet = new Zondy.Object.FeatureSet();
    //设置属性结构
    var cAttStruct = new Zondy.Object.CAttStruct({
        FldName: attr.map(item => item.name),
        FldNumber: 1,
        FldType: attr.map(item => item.type)
    });
    featureSet.AttStruct = cAttStruct;
    //添加要素到要素数据集
    featureSet.addFeature(feature);
    /* 4、调用服务 */
    //创建一个编辑服务类
    var editService = new Zondy.Service.EditDocFeature(service.name, service.layerId, {
        ip: "localhost",
        port: 6163
    });
    editService.add(featureSet, onPntSuccess(layer));

}
//添加点要素回调函数
function onPntSuccess(layer) {
    return function (result) {
        if (result) {
            alert("添加点要素成功！");
            layer.refresh();
        } else {
            alert("添加点要素失败！");
        }
    }
}