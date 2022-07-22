const POINT_STYLE = {
    Angle: 0,
    Color: 11,
    Space: 0,
    SymHeight: 6,
    SymID: 31,
    SymWidth: 6,
  }
  class Point {
    static add({position, attr, service, layer }) {
      /* 1、几何信息 */
      //创建一个点形状，描述点形状的几何信息
      var gpoint = new Zondy.Object.GPoint(position[0], position[1]) //createPoint();
      //设置当前点要素的几何信息
      var fGeom = new Zondy.Object.FeatureGeometry({
        PntGeom: [gpoint],
      })
      /* 2、图形参数 */
      //描述点要素的符号参数信息
      var pointInfo = new Zondy.Object.CPointInfo(POINT_STYLE)
      //设置当前点要素的图形参数信息
      var webGraphicInfo = new Zondy.Object.WebGraphicsInfo({
        InfoType: 1,
        PntInfo: pointInfo,
      })
      /* 3、属性 */
      //设置添加点要素的属性信息
      var attValue = attr.map((item) => item.value)
      /* 4、几何+图形+属性 构建要素*/
      //创建一个要素
      var feature = new Zondy.Object.Feature({
        fGeom: fGeom,
        GraphicInfo: webGraphicInfo,
        AttValue: attValue,
      })
      //设置要素为点要素
      feature.setFType(1)
      //创建一个要素数据集
      /* 5、创建要素集添加要素 */
      var featureSet = new Zondy.Object.FeatureSet()
      //设置属性结构
      var cAttStruct = new Zondy.Object.CAttStruct({
        FldName: attr.map((item) => item.key),
        FldNumber: attr.length,
        FldType: attr.map((item) => item.type),
      })
      featureSet.AttStruct = cAttStruct
      //添加要素到要素数据集
      featureSet.addFeature(feature)
      /* 6、调用中地服务,添加要素 */
      //创建一个编辑服务类
      var editService = new Zondy.Service.EditDocFeature(
        service.name,
        service.layerId,
        {
          ip: 'localhost',
          port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
        }
      )
      //执行添加点要素功能
      editService.add(featureSet, this.onPntSuccess(layer))
    }
    static onPntSuccess(layer) {
      return function (data) {
        if (data.succeed) {
          alert('添加点要素成功！')
          layer.refresh()
        } else {
          alert('添加点要素失败！')
        }
      }
    }
    static query({ position, service, successCallback }) {
      //1、创建一个用于查询的点形状
      let pointObj = new Zondy.Object.Point2D(position[0], position[1])
      //设置查询点的搜索半径
      pointObj.nearDis = 1
      //2、初始化查询结构对象，设置查询结构包含几何信息
      var queryStruct = new Zondy.Service.QueryFeatureStruct()
      //是否包含几何图形信息
      queryStruct.IncludeGeometry = true
      //是否包含图形显示参数
      queryStruct.IncludeWebGraphic = true
      //3、指定查询规则
      var rule = new Zondy.Service.QueryFeatureRule({
        //是否将要素的可见性计算在内
        EnableDisplayCondition: false,
        //是否完全包含
        MustInside: false,
        //是否仅比较要素的外包矩形
        CompareRectOnly: false,
        //是否相交
        Intersect: true,
      })
      //4、实例化查询参数对象
      var queryParam = new Zondy.Service.QueryParameter({
        geometry: pointObj,
        resultFormat: 'json',
        struct: queryStruct,
        rule: rule,
        cursorType: null,//显示查询到的要素数量
      })
      //5、实例化地图文档查询服务对象
      var queryService = new Zondy.Service.QueryDocFeature(
        queryParam,
        service.name,
        service.layerId,
        {
          ip: 'localhost',
          port: '6163', //访问IGServer的端口号，.net版为6163，Java版为8089
        }
      )
      //执行查询操作，querySuccess为查询回调函数
      queryService.query(successCallback)
    }
  }