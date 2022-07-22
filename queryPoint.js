/**
 *
 * @param {array} position  查询的点的位置
 * @param {object} service {name,layerId} name是IG Server服务的名称,layerId是要素所在的图层
 * @param {callback} successCallback 成功之后的回调
 */
 function queryPoint({ position, service, successCallback }) {
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
  