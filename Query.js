class Query {
    /* 基于几何图形的查询 */
    static queryByGeom({ geometry, service, callback }) {
      //1、创建一个用于查询的区
      var geomObj = new Zondy.Object.Polygon()
      geomObj.setByOL(geometry)

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
        geometry: geomObj,
        resultFormat: 'json',
        struct: queryStruct,
        rule: rule,
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
      queryService.query(callback)
    }
    
    /* 基于属性的查询 */
    static queryByAttr({ where, service, callback }) {
      //2-1、初始化查询结构对象，设置查询结构包含几何信息
      var queryStruct = new Zondy.Service.QueryFeatureStruct()
      //是否包含几何图形信息
      queryStruct.IncludeGeometry = true
      //是否包含图形显示参数
      queryStruct.IncludeWebGraphic = true
      //2、实例化查询参数对象
      var queryParam = new Zondy.Service.QueryParameter({
        resultFormat: 'json',
        struct: queryStruct,
      })
      //3、设置属性条件
      queryParam.where = where
      //4、实例化地图文档查询服务对象
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
      queryService.query(callback)
    }

    /* 基于FID的查询 */
    static queryByFID({ fid, service, callback }) {
      //1、初始化查询结构对象，设置查询结构包含几何信息
      var queryStruct = new Zondy.Service.QueryFeatureStruct()
      //是否包含几何图形信息
      queryStruct.IncludeGeometry = true
      //是否包含属性信息
      //是否包含图形显示参数
      queryStruct.IncludeWebGraphic = true
      //2、实例化查询参数对象
      var queryParam = new Zondy.Service.QueryParameter({
        objectIds: fid,
        resultFormat: 'json',
        struct: queryStruct,
      })
      //3、实例化地图文档查询服务对象
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
      queryService.query(callback)
    }
  }
  