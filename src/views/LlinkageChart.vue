<template>
  <div class="about">
    <div id="c1"></div>
    <div id="c2"></div>
  </div>
</template>
<script>
export default {
  name:"Chart2",
  mounted(){
    this.chart1();
  },
  methods:{

    chart1(){

      // step1:创建数据集 DataSet 实例，管理 state 状态量
      const ds = new DataSet({
        state:{
          currentState:"WY"
        }
      });

      let promise = Promise.resolve();
      
      // setp2:为层叠柱状图创建数据视图View实例，装在数据
      promise.then( res=>{
        return axios.get("/static/population-by-age2.csv");
      }).then( res=> {
        let data = res.data;
        return ds.createView("populationByAge",{
            watchingStates:[],//用空数组，使得这个实例不监听 state变化
          })// 在 DataSet 实例下创建名为 populationByAge 的数据视图
          .source(data,{
            type:"csv" // 使用 CSV 类型的 Connector 装载 data
          });

      // setp3:合并人口数量列（新增“年龄段”和“人口”字段，把各个年龄段的人口数量列数据合并到这两列上）
      }).then( res=>{
       return res.transform({ //如：one:213,转换之后会是 age:'one',population:123
            type:"fold",
            // fields:["小于5岁","5至13岁","14至17岁","18至24岁","25至44岁","45至64岁","65岁以上"],
            fields:["one","two","three","four","five","six","seven"],
            key:"age",
            value:"population"
          }).transform({ //将population的值处理成数值类型（避免字符串）
            type:'map', //数据加工
            callback(row){
              row.population = parseInt(row.population);
              return row;
            }
          });

      // step4:为饼图创建数据视图实例，继承上一个数据视图的数据，通过状态量currentState过滤数据、统计不同年龄段人口占比
      // step5:使用G2绘图、绑定事件
      }).then( res=>{
         
         // 饼图数据处理
          const dvForOneState = ds.createView("populationOfOneState").source(res);
          dvForOneState.transform({
            type:"filter",
            callback(row){
              return row.state === ds.state.currentState;
            }
          }).transform({
            type:"percent",
            field:"population",
            dimension:"age",
            as:"percent"
          });

          // 柱状图
          let c1 = new G2.Chart({
            id:"c1",
            forceFit:true,
            height:500
          });

          // 载入数据
          c1.source(res);

          // 图列位置
          c1.legend({
            position:'top'
          });

          // 坐标轴设置
          c1.axis('population',{
            label:{
              formatter:val => {
                return Math.round(val/10000) + 'M';
              }
            },
          });

          // 绘制
          c1.intervalStack().position('state*population')
          .color('age')
          .select(true,{ //选中交互
            mode:'single', //模式：单选
            // style:{
            //   stroke:'red',
            //   strokeWidth:1
            // }
          });

          // 绑定事件
          c1.on('tooltip:change',function(evt){
            const items = evt.items || [];
            if(items[0]){
              ds.setState('currentState',items[0].title);
            }
          });

          // 饼图
          const c2 = new G2.Chart({
            id:"c2",
            forceFit:true,
            height:300,
            padding:0
          });
          c2.source(dvForOneState);
          // 坐标系设置
          c2.coord('theta',{
            radius:0.8
          });
          c2.legend(false);//隐藏图列
          c2.intervalStack()
          .position("percent")
          .color("age")
          .label('age*percent',function(age,percent){ //文字描述
            percent = (percent * 100).toFixed(2) + '%';
            return age + ' ' + percent ;
          });

          // 渲染
          c1.render();
          c2.render();
      });

    }
  }
}
</script>

